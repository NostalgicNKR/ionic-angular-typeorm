import { DataSource , type DataSourceOptions} from 'typeorm';
import * as entities from '../entities/';
import * as migrations from '../migrations/';
import sqliteParams from '../sqliteParams';

const dbName = "TODO";

const dataSourceConfig: DataSourceOptions = {
  name: 'todoConnection',
  type: 'capacitor',
  driver: sqliteParams.connection,
  database: dbName,
  mode: 'no-encryption',
  entities: entities,
  migrations: migrations, //["../migrations/author/*{.ts,.js}"]
  subscribers: [],
  logging: [/*'query',*/ 'error','schema'],
  synchronize: false,     // !!!You will lose all data in database if set to `true`
  migrationsRun: false  // Required with capacitor type
};
export const dataSourceAuthor = new DataSource(dataSourceConfig);
const todoDataSource = {
  dataSource: dataSourceAuthor,
  dbName: dbName
};

export default todoDataSource;