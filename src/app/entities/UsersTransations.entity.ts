import { Column, CreateDateColumn, Entity, Generated, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import ExtendedBaseEntity from "./ExtendedBaseEntity";
import UsersAccounts from "./UsersAccounts.entity";

@Entity()
export default class UsersTransations extends ExtendedBaseEntity<UsersTransations> {
    @PrimaryGeneratedColumn('uuid')
    @Generated("uuid")
    @Index({ unique: true })
    uuid!: string

    @Column("int", { width: 11, unsigned: true, nullable: false })
    balance!: number;

    @Column("int", { width: 11, unsigned: true, nullable: true })
    payerAccountId?: number

    @Column("int", { width: 11, unsigned: true, nullable: true })
    receiverAccountId?: number

    @ManyToOne(() => UsersAccounts, (au) => au.payersUserTransitions, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "payerAccountId", referencedColumnName: "id" })
    payerAccount?: UsersAccounts

    @ManyToOne(() => UsersAccounts, (au) => au.receiversUserTransitions, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "receiverAccountId", referencedColumnName: "id" })
    receiverAccount?: UsersAccounts

    @CreateDateColumn({
        type: "datetime",
        name: "created_at"
    })
    readonly createdAt?: Date;
}