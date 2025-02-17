import { Button } from "@/components/ui/button";
import { trpc } from "@/utils/trpc";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

const FormSchema = z.object({
  videoUrl: z.string().min(1, {
    message: "Video url is required",
  }),
});

export function CreateDocument() {
  const documentCreator = trpc.createDocument.useMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      videoUrl: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    documentCreator.mutate(data.videoUrl, {
      onSuccess: (data) => navigate(`/${data}`),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video Url</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://www.youtube.com/watch?v=seU46c6Jz7E"
                  type="url"
                  {...field}
                  disabled={documentCreator.isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={documentCreator.isPending} type="submit">
          {documentCreator.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Add video
        </Button>
      </form>
    </Form>
  );
}
