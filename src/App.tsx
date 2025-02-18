import TileContainer from "@/components/TileContainer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex items-center justify-center h-screen">
        <TileContainer />
      </div>
    </DndProvider>
  );
}

export default App;
