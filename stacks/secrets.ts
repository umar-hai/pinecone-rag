import { Config, StackContext } from "sst/constructs";

export function SECRETS({ stack }: StackContext) {
  return {
    database: Config.Secret.create(
      stack,
      "DATABASE_USERNAME",
      "DATABASE_PASSWORD"
    ),
  };
}
