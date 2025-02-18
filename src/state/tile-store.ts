import { MosaicNode } from "react-mosaic-component";
import { MosaicKey } from "react-mosaic-component/lib/types";
import { create } from "zustand";

interface TileState<T extends MosaicKey> {
  node: MosaicNode<T> | null;
  setNode: (node: MosaicNode<T>) => void;
  updateNode: (node: MosaicNode<T>) => void;
}

interface TileProps<T extends MosaicKey> {
  node: MosaicNode<T> | null;
}

type TileStore = ReturnType<typeof useTileStore>;

const DEFAULT_NODE: TileProps<MosaicKey> | null = {
  node: null,
};

export const useTileStore = create<TileState<MosaicKey>>((set) => ({
  ...DEFAULT_NODE,
  setNode: (node) => set({ node }),
  updateNode: (node) => set({ node }),
}));

export type { TileStore };
