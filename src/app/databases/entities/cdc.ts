import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('cdc')
export class CDC {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    table_name!: string;

    @Column()
    row_id!: number;

    @Column()
    operation_type!: string;

    @CreateDateColumn({ type: 'datetime' })
    operation_timestamp!: Date;

    @Column('text')
    changed_data!: string;

    @Column('text', { nullable: true })
    metadata!: string;
}
