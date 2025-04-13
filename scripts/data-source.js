"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
// data-source.ts
var typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'appdb',
    entities: ['../src/entity/**/*.ts'],
    migrations: ['../src/migration/**/*.ts'],
    synchronize: false,
    logging: false,
});
