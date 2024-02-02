import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { ListDocuments } from "./routes/listDocuments.tsx";
import { CreateDocument } from "./routes/createDocument.tsx";
import { DocumentDetails } from "./routes/documentDetails.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListDocuments />,
  },
  {
    path: "/create",
    element: <CreateDocument />,
  },
  {
    path: "/:id",
    element: <DocumentDetails />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
