import { mysqlTableCreator } from "drizzle-orm/mysql-core";

export const mysqlTable = mysqlTableCreator((name) => `pcr_${name}`);
