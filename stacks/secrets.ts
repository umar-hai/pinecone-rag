import { Config, StackContext } from "sst/constructs";

export function SECRETS({ stack }: StackContext) {
  return {
    database: Config.Secret.create(
      stack,
      "DATABASE_USERNAME",
      "DATABASE_PASSWORD"
    ),
    openai: Config.Secret.create(stack, "OPENAI_API_KEY"),
    pinecone: Config.Secret.create(stack, "PINECONE_API_KEY"),
  };
}
