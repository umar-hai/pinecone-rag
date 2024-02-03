import { initTRPC } from "@trpc/server";
import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";
import { createDocument, listDocuments } from "@pincone-rag/core/document";
import { z } from "zod";

const t = initTRPC.create();

export const appRouter = t.router({
  listDocuments: t.procedure.query(listDocuments),
  createDocument: t.procedure
    .input(z.string())
    .mutation(async ({ input }) => await createDocument(input)),
});

export const handler = awsLambdaRequestHandler({
  router: appRouter,
});

export type AppRouter = typeof appRouter;
