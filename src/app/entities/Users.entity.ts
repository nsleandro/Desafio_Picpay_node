import { Column, CreateDateColumn, Entity, Generated, Index, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UsersTypeDocumentEnum } from "../services/enum/users.enum";
import ExtendedBaseEntity from "./ExtendedBaseEntity";
import UsersAccounts from "./UsersAccounts.entity";

@Entity()
export default class Users extends ExtendedBaseEntity<Users> {
    @PrimaryGeneratedColumn({ type: "int", unsigned: true })
    @PrimaryColumn("int", { unsigned: true })
    id!: number

    @Column('uuid')
    @Generated("uuid")
    @Index({ unique: true })
    uuid!: string

    @Column("varchar", { length: 255, nullable: false })
    @Index({ fulltext: true })
    name!: string

    @Column("varchar", { length: 64, nullable: true, select: false })
    password!: string;

    @Column("varchar", { length: 255, nullable: false })
    @Index({ unique: true })
    email!: string

    @Column("varchar", { length: 14, nullable: false })
    @Index({ unique: true })
    document!: string

    @Column("varchar", { length: 14, nullable: false })
    typeDocument!: UsersTypeDocumentEnum

    @OneToMany(() => UsersAccounts, (ab) => ab.user)
    usersAccounts?: UsersAccounts[]

    @CreateDateColumn({
        type: "datetime",
        name: "created_at"
    })
    readonly createdAt?: Date;

    @UpdateDateColumn({
        type: "datetime",
        name: "updated_at"
    })
    readonly updatedAt?: Date;
}