import TileContainer from "@/components/TileContainer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <DndProvider backend={HTML5Backend}>
      <QueryClientProvider client={queryClient}>
        <div className="flex items-center justify-center h-screen">
          <TileContainer />
        </div>
      </QueryClientProvider>
    </DndProvider>
  );
}

export default App;
