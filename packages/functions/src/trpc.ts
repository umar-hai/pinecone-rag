import { initTRPC } from "@trpc/server";
import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";
import { listDocuments } from "@pincone-rag/core/document";

const t = initTRPC.create();

export const appRouter = t.router({
  listDocuments: t.procedure.query(listDocuments),
});

export const handler = awsLambdaRequestHandler({
  router: appRouter,
});

export type AppRouter = typeof appRouter;
