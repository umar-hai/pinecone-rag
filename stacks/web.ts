import { StackContext, use } from "sst/constructs";
import { API } from "./api";
import { StaticSite } from "sst/constructs";

export function WEB({ stack }: StackContext) {
  const { api } = use(API);

  const web = new StaticSite(stack, "web", {
    path: "packages/web",
    buildOutput: "dist",
    buildCommand: "npm run build",
    environment: {
      VITE_APP_API_URL: api.url,
    },
  });

  stack.addOutputs({
    siteUrl: web.url,
  });
}
