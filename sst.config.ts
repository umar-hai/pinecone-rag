import { SSTConfig } from "sst";
import { API } from "./stacks/api";
import { WEB } from "./stacks/web";

export default {
  config(_input) {
    return {
      name: "pincone-rag",
      region: "eu-west-2",
    };
  },
  stacks(app) {
    app.stack(API).stack(WEB);
  },
} satisfies SSTConfig;
