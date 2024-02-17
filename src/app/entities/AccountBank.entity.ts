import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import ExtendedBaseEntity from "./ExtendedBaseEntity";
import Users from "./Users.entity";

@Entity()
export default class AccountBank extends ExtendedBaseEntity<AccountBank> {
    @PrimaryGeneratedColumn({ type: "int", unsigned: true })
    @PrimaryColumn("int", { unsigned: true })
    id?: number

    @Column("int", { width: 11, unsigned: true, nullable: false })
    balance!: number;

    @Column("int", { width: 11, unsigned: true, nullable: true })
    userId?: number
    @ManyToOne(() => Users, (au) => au.accountsBank, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "userId", referencedColumnName: "id" })
    user?: Users

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