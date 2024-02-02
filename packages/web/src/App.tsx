import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "./utils/trpc";
import { httpBatchLink } from "@trpc/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ListDocuments } from "./routes/listDocuments";
import { CreateDocument } from "./routes/createDocument";
import { DocumentDetails } from "./routes/documentDetails";
import { Layout } from "./routes/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ListDocuments />,
        index: true,
      },
      {
        path: "/create",
        element: <CreateDocument />,
      },
      {
        path: "/:id",
        element: <DocumentDetails />,
      },
    ],
  },
]);

function App() {
  const [queryClient] = useState(() => new QueryClient());

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${import.meta.env.VITE_APP_API_URL}/trpc`,
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
