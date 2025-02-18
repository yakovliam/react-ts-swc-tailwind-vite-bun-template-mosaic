import MapTile from "@/tiles/MapTile";
import OrdersTile from "@/tiles/OrdersTile";

type TileRepositoryElementType = "map" | "orders";

type TileRepositoryElementComponentProps = {
  id: string;
};

type TileRepositoryElement = {
  id: string;
  type: TileRepositoryElementType;
  component:
    | React.ComponentType<TileRepositoryElementComponentProps>
    | React.FC<TileRepositoryElementComponentProps>;
  title: string;
};

const TILE_REPOSITORY_COMPONENT_MAPPING = new Map<
  TileRepositoryElementType,
  React.ComponentType<TileRepositoryElementComponentProps>
>([
  ["map", MapTile],
  ["orders", OrdersTile],
]);

const TILE_REPOSITORY_TITLE_MAPPING = new Map<
  TileRepositoryElementType,
  string
>([
  ["map", "Map"],
  ["orders", "Orders"],
]);

export type {
  TileRepositoryElementType,
  TileRepositoryElementComponentProps,
  TileRepositoryElement,
};

export { TILE_REPOSITORY_COMPONENT_MAPPING, TILE_REPOSITORY_TITLE_MAPPING };
