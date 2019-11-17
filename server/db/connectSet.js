import mysql from 'mysql'
import { mysqlConfig } from './config'

// 단일 커넥션은 시간이 지나면 protocol_connection_lost 문제 발생
// pool을 사용하면 사용에 있어서 장점이 더 많음.
export const setDBConnect = mysql.createPool(mysqlConfig);
