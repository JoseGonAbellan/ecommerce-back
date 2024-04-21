import { Injectable } from '@nestjs/common';
import { Connection, createConnection } from 'mysql2/promise';



@Injectable()
export class DatabaseService {
  private dataBasePassword = process.env.DB_PASSWORD
  connection: Connection;

  constructor() {
    this.connect();
  }

  async connect() {
    this.connection = await createConnection({
    host: 'localhost',
    user: 'root',
    password: this.dataBasePassword,
    database: 'ecommerce',
});
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