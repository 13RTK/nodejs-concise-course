import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DevTools } from "jotai-devtools";
import "jotai-devtools/styles.css";

import ProductTable from "./components/ProductTable";
import ThemeToggle from "./components/ThemeToggle";
import AddProductModal from "./components/AddProductModal";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <DevTools />
      <QueryClientProvider client={queryClient}>
        <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-24 dark:bg-gray-900">
          <ThemeToggle />

          <div className="relative flex w-full max-w-5xl flex-col items-center justify-center gap-12">
            <ProductTable />
          </div>

          <AddProductModal />
        </main>

        <Toaster />
      </QueryClientProvider>
    </>
  );
}
