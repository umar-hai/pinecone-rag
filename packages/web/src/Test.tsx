import { trpc } from "./utils/trpc";

export function Test() {
  const { data } = trpc.listDocuments.useQuery();

  return <div>{data}</div>;
}
