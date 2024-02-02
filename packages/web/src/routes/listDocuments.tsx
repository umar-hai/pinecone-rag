import { trpc } from "@/utils/trpc";

export function ListDocuments() {
  const { data } = trpc.listDocuments.useQuery();

  return <div>{JSON.stringify(data)}</div>;
}
