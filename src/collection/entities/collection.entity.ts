import { SavedItem } from "src/saved-items/entities/saved-item.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Collections {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title:string

    @ManyToOne(()=> User, (user) => user.collections, {
        onDelete: "CASCADE"
    })
    user:User

    @OneToMany(() => SavedItem, (savedItem) => savedItem.collection, { nullable: true })
    savedItem?: SavedItem[]


    @CreateDateColumn()
    createdAt:Date
}
