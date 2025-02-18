import { TileRepositoryElement } from "@/types/tile-repository";
import { create } from "zustand";

interface TileRepositoryState {
  repository: TileRepositoryElement[];
  add: (element: TileRepositoryElement) => void;
  remove: (id: string) => void;
}

interface TileRepositoryProps {
  repository: TileRepositoryElement[];
}

type TileRepositoryStore = ReturnType<typeof useTileRepositoryStore>;

const DEFAULT_REPOSITORY: TileRepositoryProps = {
  repository: [],
};

export const useTileRepositoryStore = create<TileRepositoryState>((set) => ({
  ...DEFAULT_REPOSITORY,
  add: (element) =>
    set((state) => {
      return {
        repository: [...state.repository, element],
      };
    }),
  remove: (id) =>
    set((state) => {
      return {
        repository: state.repository.filter((element) => element.id !== id),
      };
    }),
}));

export type { TileRepositoryStore };
