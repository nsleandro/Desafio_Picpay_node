import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import ExtendedBaseEntity from "./ExtendedBaseEntity";
import Users from "./Users.entity";
import UsersTransations from "./UsersTransations.entity";

@Entity()
export default class UsersAccounts extends ExtendedBaseEntity<UsersAccounts> {
    @PrimaryGeneratedColumn({ type: "int", unsigned: true })
    @PrimaryColumn("int", { unsigned: true })
    id?: number

    @Column("int", { width: 11, unsigned: true, nullable: false })
    balance!: number;

    @Column("int", { width: 11, unsigned: true, nullable: true })
    userId?: number
    @ManyToOne(() => Users, (au) => au.usersAccounts, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
    user?: Users

    @OneToMany(() => UsersTransations, (ut) => ut.payerAccount)
    payersUserTransitions?: UsersTransations[]

    @OneToMany(() => UsersTransations, (ut) => ut.receiverAccount)
    receiversUserTransitions?: UsersTransations[]

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