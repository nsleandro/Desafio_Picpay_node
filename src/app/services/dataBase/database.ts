import { DataSource } from 'typeorm';
import dataSource from '../../../../ormconfig';

export default abstract class Database {
    static connection: DataSource;

    static async Init() {
        const connection = dataSource
        try {
            await connection.initialize()
            this.connection = connection
            await connection.runMigrations()
            return connection;
        }
        catch (e) {
            throw e;
        }
    }

}