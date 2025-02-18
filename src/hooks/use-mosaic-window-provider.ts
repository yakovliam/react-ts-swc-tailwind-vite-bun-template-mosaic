import { MosaicBranch } from "react-mosaic-component";
import { useTileRepositoryStore } from "@/state/tile-repository-store";
import { TileRepositoryElementComponentProps } from "@/types/tile-repository";

type MosaicWindowProviderProps = {
  path: MosaicBranch[];
  id: string;
};

type MosaicWindowProvider = {
  provider: (props: MosaicWindowProviderProps) => {
    toolbarControls: JSX.Element[];
    path: MosaicBranch[];
    title: string;
    component:
      | React.ComponentType<TileRepositoryElementComponentProps>
      | React.FC<TileRepositoryElementComponentProps>;
  };
};

export const useMosaicWindowProvider = (): MosaicWindowProvider => {
  const tileRepositoryStore = useTileRepositoryStore();

  return {
    provider: ({ path, id }: MosaicWindowProviderProps) => {
      const tile = tileRepositoryStore.repository.find(
        (tile) => tile.id === id
      );

      if (!tile) {
        throw new Error("Tile not found");
      }

      return {
        toolbarControls: [],
        path: path,
        title: tile.title,
        component: tile.component,
      };
    },
  };
};
