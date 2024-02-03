import { trpc } from "@/utils/trpc";
import { Link } from "react-router-dom";

export function ListDocuments() {
  const { data } = trpc.listDocuments.useQuery();

  return (
    <div className="flex flex-col">
      <Link className="hover:underline" to="create">
        Add{" "}
      </Link>
      {JSON.stringify(data)}
    </div>
  );
}
