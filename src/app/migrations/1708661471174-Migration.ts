import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1708661471174 implements MigrationInterface {
    name = 'Migration1708661471174'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`password\` varchar(64) NULL, \`email\` varchar(255) NOT NULL, \`document\` varchar(14) NOT NULL, \`typeDocument\` varchar(14) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_951b8f1dfc94ac1d0301a14b7e\` (\`uuid\`), FULLTEXT INDEX \`IDX_51b8b26ac168fbe7d6f5653e6c\` (\`name\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_c1b20b2a1883ed106c3e746c25\` (\`document\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_transations\` (\`uuid\` varchar(36) NOT NULL, \`balance\` int(11) UNSIGNED NOT NULL, \`payerAccountId\` int(11) UNSIGNED NULL, \`receiverAccountId\` int(11) UNSIGNED NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_c38b44f45132255a11cdd08fc8\` (\`uuid\`), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_accounts\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`balance\` int(11) UNSIGNED NOT NULL, \`userId\` int(11) UNSIGNED NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users_transations\` ADD CONSTRAINT \`FK_b1039e139049a0826ec1d810a5d\` FOREIGN KEY (\`payerAccountId\`) REFERENCES \`users_accounts\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_transations\` ADD CONSTRAINT \`FK_5b3de0c6bf2411e564afbdd02a5\` FOREIGN KEY (\`receiverAccountId\`) REFERENCES \`users_accounts\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_accounts\` ADD CONSTRAINT \`FK_20577a7d9918c21ad800d71a8a1\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_accounts\` DROP FOREIGN KEY \`FK_20577a7d9918c21ad800d71a8a1\``);
        await queryRunner.query(`ALTER TABLE \`users_transations\` DROP FOREIGN KEY \`FK_5b3de0c6bf2411e564afbdd02a5\``);
        await queryRunner.query(`ALTER TABLE \`users_transations\` DROP FOREIGN KEY \`FK_b1039e139049a0826ec1d810a5d\``);
        await queryRunner.query(`DROP TABLE \`users_accounts\``);
        await queryRunner.query(`DROP INDEX \`IDX_c38b44f45132255a11cdd08fc8\` ON \`users_transations\``);
        await queryRunner.query(`DROP TABLE \`users_transations\``);
        await queryRunner.query(`DROP INDEX \`IDX_c1b20b2a1883ed106c3e746c25\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_51b8b26ac168fbe7d6f5653e6c\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_951b8f1dfc94ac1d0301a14b7e\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
