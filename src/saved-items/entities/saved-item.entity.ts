import { Collections } from "src/collection/entities/collection.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SavedItem {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    externalId: string

    @Column()
    type: "photo" | "video" | "gif"

    @Column()
    src: string

    @Column()
    thumbnail:string

    @Column()
    title: string

    @Column()
    url:string

    @ManyToOne(()=> Collections, (collection)=> collection.savedItem, {
        onDelete: "CASCADE"
    })
    collection:Collections

    @ManyToOne(()=> User, (user)=> user.savedItem, {
        onDelete: "CASCADE"
    })
    user:User

    @CreateDateColumn()
    createdAt:Date
}
