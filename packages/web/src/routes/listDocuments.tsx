import { trpc } from "@/utils/trpc";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

export function ListDocuments() {
  const { data } = trpc.listDocuments.useQuery();

  if (!data) {
    return null;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {data.map((doc) => (
        <Card className="shadow-lg" key={doc.id}>
          <img
            alt="Video Thumbnail"
            className="aspect-[16/9] object-cover w-full rounded-t-lg overflow-hidden"
            height={180}
            src={doc.thumbnail}
            width={320}
          />
          <CardContent className="flex justify-between items-center p-4">
            <Link
              className="text-blue-500 underline text-lg font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap"
              to={doc.id}
            >
              {doc.name}
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
