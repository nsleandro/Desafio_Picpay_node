import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1708125218357 implements MigrationInterface {
    name = 'Migration1708125218357'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`password\` varchar(64) NULL, \`email\` varchar(255) NOT NULL, \`document\` varchar(14) NOT NULL, \`typeDocument\` varchar(14) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), FULLTEXT INDEX \`IDX_51b8b26ac168fbe7d6f5653e6c\` (\`name\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_c1b20b2a1883ed106c3e746c25\` (\`document\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`account_bank\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`balance\` int(11) UNSIGNED NOT NULL, \`userId\` int(11) UNSIGNED NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`account_bank\` ADD CONSTRAINT \`FK_15b9a1a31a367cda1271f800de1\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account_bank\` DROP FOREIGN KEY \`FK_15b9a1a31a367cda1271f800de1\``);
        await queryRunner.query(`DROP TABLE \`account_bank\``);
        await queryRunner.query(`DROP INDEX \`IDX_c1b20b2a1883ed106c3e746c25\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_51b8b26ac168fbe7d6f5653e6c\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
