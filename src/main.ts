import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { defineCustomElements as pwaElements } from '@ionic/pwa-elements/loader';
import { defineCustomElements as jeepSqlite } from 'jeep-sqlite/loader';
import { JeepSqlite } from 'jeep-sqlite/dist/components/jeep-sqlite';
import { Capacitor } from '@capacitor/core';
import todoDataSource from './app/databases/datasources/TodoDataSource';
import sqliteParams from './app/databases/sqliteParams';


if (environment.production) {
  enableProdMode();
}

customElements.define('jeep-sqlite', JeepSqlite);

const initializeDataSources = async () => {
  //check sqlite connections consistency
  await sqliteParams.connection.checkConnectionsConsistency()
    .catch((e) => {
      console.log(e);
      return {};
    });

  // Loop through the DataSources
  for (const mDataSource of [todoDataSource]) { //Add dataSources in array
    // initialize
    await mDataSource.dataSource.initialize();
    if (mDataSource.dataSource.isInitialized) {
      // run the migrations
      await mDataSource.dataSource.runMigrations();
    }
    if (sqliteParams.platform === 'web') {
      await sqliteParams.connection.saveToStore(mDataSource.dbName);
    }
  }
}

if (sqliteParams.platform !== 'web') {
  initializeDataSources();
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.log(err));
} else {
  // Web platform
  // required for toast component in Browser
  pwaElements(window);
  window.addEventListener('DOMContentLoaded', async () => {
    const jeepEl = document.createElement('jeep-sqlite');
    // jeepEl.autoSave = true;
    document.body.appendChild(jeepEl);
    customElements
      .whenDefined('jeep-sqlite')
      .then(async () => {
        await sqliteParams.connection.initWebStore();
        await initializeDataSources();
        platformBrowserDynamic()
          .bootstrapModule(AppModule)
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
        throw new Error(`Error: ${err}`);
      });
  });
}
