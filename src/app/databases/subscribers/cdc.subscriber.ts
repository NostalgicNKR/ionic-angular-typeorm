import { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent, RemoveEvent } from 'typeorm';
import { CDC, Todo } from '../entities';

@EventSubscriber()
export class CdcSubscriber implements EntitySubscriberInterface {
    /**
     * Indicates that this subscriber only listens to some specific entity events.
     */
    listenTo() {
        return Todo;
    }

    /**
     * Called before entity insertion.
     */
    async afterInsert(event: InsertEvent<any>) {
        const cdcRepository = event.manager.getRepository(CDC);
        const res = await cdcRepository.save({
            table_name: event.metadata.tableName,
            row_id: event.entity.id,
            operation_type: 'INSERT',
            changed_data: JSON.stringify(event.entity),
            metadata: JSON.stringify({ user: 'exampleUser', device: 'exampleDevice' }),
        });
        console.log("Res from subscriber ", res);
        
    }

     /**
     * Called after entity update.
     */
     async afterUpdate(event: UpdateEvent<any>) {
        const cdcRepository = event.manager.getRepository(CDC);
        await cdcRepository.save({
            table_name: event.metadata.tableName,
            row_id: event.entity?.['id'],
            operation_type: 'UPDATE',
            changed_data: JSON.stringify(event.entity),
            metadata: JSON.stringify({ user: 'exampleUser', device: 'exampleDevice' }), 
        });
    }

    /**
     * Called after entity removal.
     */
    async afterRemove(event: RemoveEvent<any>) {
        const cdcRepository = event.manager.getRepository(CDC);
        await cdcRepository.save({
            table_name: event.metadata.tableName,
            row_id: event.entity.id,
            operation_type: 'DELETE',
            changed_data: JSON.stringify(event.databaseEntity),
            metadata: JSON.stringify({ user: 'exampleUser', device: 'exampleDevice' }),
        });
    }

}
