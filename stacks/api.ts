import { StackContext } from "sst/constructs/FunctionalStack";
import { Api } from "sst/constructs";

export function API({ stack }: StackContext) {
  const api = new Api(stack, "Api", {
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
