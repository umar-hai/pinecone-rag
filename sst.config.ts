import { SSTConfig } from "sst";
import { API } from "./stacks/api";
import { WEB } from "./stacks/web";
import { SECRETS } from "./stacks/secrets";

export default {
  config(_input) {
    return {
      name: "pincone-rag",
      region: "eu-west-2",
    };
  },
  stacks(app) {
    app.stack(SECRETS).stack(API).stack(WEB);
  },
} satisfies SSTConfig;
