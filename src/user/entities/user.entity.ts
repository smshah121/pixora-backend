import { Collections } from "src/collection/entities/collection.entity";
import { SavedItem } from "src/saved-items/entities/saved-item.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({unique: true})
    email: string

    @Column({nullable: true})
    password:string

    @OneToMany(()=> Collections, (collections) => collections.user)
    collections: Collections[]

    @OneToMany(()=> SavedItem, (savedItem)=> savedItem.user)
    savedItem: SavedItem[]

}
