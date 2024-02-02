import { NewDocument, document } from "./document.sql";
import { db } from "../drizzle";

export async function createDocument(newDocument: NewDocument) {
  await db.insert(document).values(newDocument);
}

export async function listDocuments() {
  return await db.select().from(document);
}
