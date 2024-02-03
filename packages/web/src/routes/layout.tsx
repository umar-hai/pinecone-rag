import { buttonVariants } from "@/components/ui/button";
import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="flex-col md:flex">
      <header className="border-b flex h-16 justify-between items-center px-4">
        <div className="container mx-auto flex gap-2 items-center justify-between">
          <div className="flex items-baseline">
            <h1 className="text-2xl font-bold tracking-tight mr-6">
              <Link to="/">pinecone rag</Link>
            </h1>
          </div>
          <div className="flex gap-2">
            <Link
              className={buttonVariants({ variant: "outline" })}
              to="create"
            >
              Add video
            </Link>
          </div>
        </div>
      </header>
      <main className="container mx-auto flex-1 pt-6 px-4">
        <Outlet />
      </main>
    </div>
  );
}
