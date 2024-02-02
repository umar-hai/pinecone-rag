import { defineConfig } from "drizzle-kit";

const connection = {
  user: process.env["DATABASE_USERNAME"],
  password: process.env["DATABASE_PASSWORD"],
  host: "aws.connect.psdb.cloud",
};

export default defineConfig({
  out: "./src/drizzle/migrations/",
  strict: true,
  schema: "./src/**/*.sql.ts",
  verbose: true,
  driver: "mysql2",
  dbCredentials: {
    uri: `mysql://${connection.user}:${connection.password}@${connection.host}:3306/global-poc?ssl={"rejectUnauthorized":true}`,
  },
  tablesFilter: ["pcr_*"],
});
