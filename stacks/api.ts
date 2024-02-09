import { StackContext, use } from "sst/constructs";
import { Api } from "sst/constructs";
import { SECRETS } from "./secrets";

export function API({ stack }: StackContext) {
  const { database, pinecone, openai } = use(SECRETS);

  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        bind: [
          database.DATABASE_PASSWORD,
          database.DATABASE_USERNAME,
          pinecone.PINECONE_API_KEY,
          openai.OPENAI_API_KEY,
        ],
        timeout: "1 minute",
      },
    },
    routes: {
      "GET /trpc/{proxy+}": "packages/functions/src/trpc.handler",
      "POST /trpc/{proxy+}": "packages/functions/src/trpc.handler",
    },
  });

  stack.addOutputs({
    apiUrl: api.url,
  });

  return { api };
}
