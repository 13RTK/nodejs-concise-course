import { Toast } from "primereact/toast";
import { DevTools } from "jotai-devtools";
import "jotai-devtools/styles.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import MenuBar from "./components/MenuBar";

import { useToast } from "./hooks/toast";
import TodoView from "./components/TodoView.tsx";

function App() {
  const { toast, showToast } = useToast();

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {/* <DevTools /> */}

      <MenuBar />

      <Toast ref={toast} />

      <TodoView showToast={showToast} />
    </QueryClientProvider>
  );
}

export default App;
