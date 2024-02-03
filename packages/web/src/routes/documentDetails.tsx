import { trpc } from "@/utils/trpc";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
  question: z.string().min(1, {
    message: "required",
  }),
});

export function DocumentDetails() {
  const { id } = useParams();

  const { data: docs } = trpc.listDocuments.useQuery();

  const doc = docs?.find((x) => x.id === id);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      question: "",
    },
  });

  if (!doc) {
    return null;
  }

  function onSubmit() {}

  return (
    <div className="w-full px-4 mx-auto grid grid-rows-[auto_1fr_auto] gap-4 md:gap-6 pb-10">
      <header>
        <div className="mx-auto h-14 flex items-center gap-4">
          <h1 className="text-3xl font-semibold">{doc.name}</h1>
        </div>
      </header>
      <main className="grid md:grid-cols-6 gap-10 items-start">
        <div className="col-span-4 grid gap-4">
          <div className="grid gap-2">
            <div className="rounded-xl overflow-hidden">
              <img
                alt="Thumbnail"
                className="aspect-video rounded-lg object-cover"
                height="180"
                src={doc.thumbnail}
                width="320"
              />
            </div>
            <div className="py-2 grid gap-2">
              <div className="flex gap-2 items-center">
                <div className="flex gap-2 items-center">
                  <img
                    alt="Thumbnail"
                    className="rounded-full object-cover aspect-square"
                    height={40}
                    src="src/assets/chatgpt-icon.svg"
                    width={40}
                  />
                  <div className="text-sm">
                    <div className="font-semibold">ChatGPT</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      AI Assistant
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 rounded-xl p-4 text-sm dark:bg-gray-800 overflow-y-auto max-h-[300px]">
              <p>
                Ask me anything about the video. I'm here to help you understand
                the content better.
              </p>
              <div className="mt-4 bg-white rounded-md p-2">
                <p className="font-semibold">User:</p>
                <p>What is the frontend cloud?</p>
              </div>
              <div className="mt-4 bg-gray-200 rounded-md p-2">
                <p className="font-semibold">ChatGPT:</p>
                <p>
                  The frontend cloud is a concept introduced by Vercel. It's
                  about moving more and more logic to the edge, closer to the
                  user. This includes things like rendering, routing, and data
                  fetching. The goal is to provide a faster, more reliable
                  experience for the end user.
                </p>
              </div>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="bg-gray-100 rounded-xl p-4 text-sm dark:bg-gray-800 mt-4"
              >
                <FormField
                  control={form.control}
                  name="question"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Type your message here..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="bg-black text-white rounded-md p-2 mt-2 w-full"
                  type="submit"
                >
                  Send
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </main>
    </div>
  );
}
