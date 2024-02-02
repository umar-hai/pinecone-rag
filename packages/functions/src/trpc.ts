import { initTRPC } from "@trpc/server";
import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";

const t = initTRPC.create();

export const appRouter = t.router({
  listDocuments: t.procedure.query(() => "foo"),
});

export const handler = awsLambdaRequestHandler({
  router: appRouter,
});

export type AppRouter = typeof appRouter;
