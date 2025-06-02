import MapTile from "@/tiles/MapTile";
import OrdersTile from "@/tiles/OrdersTile";
import { IconName } from "lucide-react/dynamic";

type TileRepositoryElementType = "map" | "trucks";

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

const TILE_METADATA_MAPPING = new Map<
  TileRepositoryElementType,
  [
    React.ComponentType<TileRepositoryElementComponentProps>, // component
    string, // title
    IconName // icon name (lucide)
  ]
>([
  ["map", [MapTile, "Map", "map"]],
  ["trucks", [OrdersTile, "Trucks", "truck"]],
]);

export type {
  TileRepositoryElementType,
  TileRepositoryElementComponentProps,
  TileRepositoryElement,
};

export { TILE_METADATA_MAPPING };
