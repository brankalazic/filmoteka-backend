import { type } from "os";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Administrator{
    @PrimaryGeneratedColumn({name:'administrator_id' ,type:'int' ,unsigned:true})
    administor_id:number;

    @Column({name:'username' ,type:'varchar' ,unique:true})
    username:string

    @Column({name:'password' ,type:'varchar' ,unique:true,length:128})
    password:string

}