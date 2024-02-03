import { Button } from "@/components/ui/button";
import { trpc } from "@/utils/trpc";
import { useNavigate } from "react-router-dom";

export function CreateDocument() {
  const documentCreator = trpc.createDocument.useMutation();
  const navigate = useNavigate();

  function onSubmit() {
    documentCreator.mutate("foo", {
      onSuccess: () => navigate("../"),
    });
  }

  return (
    <div>
      <Button onClick={onSubmit}>Create</Button>
    </div>
  );
}
