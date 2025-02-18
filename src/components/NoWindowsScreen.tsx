import { TileRepositoryElementType } from "@/types/tile-repository";
import { PlusCircle } from "lucide-react";

type NoWindowsScreenProps = {
  addTileToTopRight: (type: TileRepositoryElementType) => void;
};

const NoWindowsScreen = ({ addTileToTopRight }: NoWindowsScreenProps) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <div>No windows.</div>
      <div className="w-full flex flex-col items-center justify-center gap-4">
        <button
          onClick={() => addTileToTopRight("map")}
          className="px-3 bg-blue-500 text-white rounded active:bg-blue-600 flex items-center gap-2"
        >
          Add <PlusCircle size={15} />
        </button>
      </div>
    </div>
  );
};

export default NoWindowsScreen;
