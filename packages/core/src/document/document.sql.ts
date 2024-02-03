import { varchar } from "drizzle-orm/mysql-core";
import { mysqlTable } from "../drizzle/utils";
import { sql } from "drizzle-orm";
import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";

export const document = mysqlTable("document", {
  id: varchar("id", { length: 191 })
    .default(sql`(uuid())`)
    .primaryKey()
    .notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  source: varchar("source", { length: 256 }).notNull(),
  thumbnail: varchar("thumbnail", { length: 128 }).notNull(),
});

export const createDocumentSchema = createInsertSchema(document);

export type NewDocument = z.infer<typeof createDocumentSchema>;
