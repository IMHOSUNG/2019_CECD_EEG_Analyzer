import mysql from 'mysql'
import { mysqlConfig } from './config'

export const setDBConnect = mysql.createConnection(mysqlConfig);
