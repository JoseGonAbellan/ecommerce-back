import { Injectable } from '@nestjs/common';
import { Connection, createConnection } from 'mysql2/promise';

export const databaseConfig = {
  host: 'localhost',
  user: 'root',
  password: 'MerryPippin96',
  database: 'ecommerce',
};

@Injectable()
export class DatabaseService {
  connection: Connection;

  constructor() {
    this.connect();
  }

  async connect() {
    this.connection = await createConnection(databaseConfig);
    console.log('Connected to MySQL database');
  }

  async query(sql: string, values?: any[]) {
    return await this.connection.query(sql, values);
  }

  async close() {
    await this.connection.end();
    console.log('Connection to MySQL database closed');
  }
}