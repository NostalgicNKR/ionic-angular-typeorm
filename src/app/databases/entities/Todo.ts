import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('todo')
export class Todo {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    title!: string;

    @Column() 
    completed!: boolean;
}