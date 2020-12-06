import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Administrator{
    @PrimaryGeneratedColumn({name:'administrator_id', type:'int' ,unsigned:true})
    administratorId:number;

    @Column({name:'username' ,type:'varchar', unique:true})
    username:string

    @Column({name:'password_hash' ,type:'varchar', length:128})
    password:string
}