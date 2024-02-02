import { Button } from "./components/ui/button";
import { trpc } from "./utils/trpc";

export function Test() {
  const { data } = trpc.listDocuments.useQuery();

  return (
    <div>
      <Button> {data}</Button>
    </div>
  );
}
