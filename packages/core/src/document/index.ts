import { NewDocument, document } from "./document.sql";
import { db } from "../drizzle";

export async function createDocument(source: string) {
  await db.insert(document).values({
    name: "foo",
    source: "foo",
    thumbnail: "foo",
  });
}

export async function listDocuments() {
  return await db.select().from(document);
}
