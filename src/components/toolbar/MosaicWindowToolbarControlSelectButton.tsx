import { PanelLeftOpen } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DynamicIcon } from "lucide-react/dynamic";

import Button from "@/components/ui/button";
import {
  TILE_METADATA_MAPPING,
  TileRepositoryElementType,
} from "@/types/tile-repository";

const variant = "secondary";
const text = "Split";
const icon = <PanelLeftOpen size={18} />;

type MosaicWindowToolbarControlSplitWindowButtonProps = {
  splitWindow: (type: TileRepositoryElementType) => void;
};

const MosaicWindowToolbarControlSplitWindowButton = ({
  splitWindow,
}: MosaicWindowToolbarControlSplitWindowButtonProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} className="h-[30px]">
          {text}
          {icon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Available Windows</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {Array.from(TILE_METADATA_MAPPING.entries()).map(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            ([key, [_, title, icon]]) => (
              <DropdownMenuItem
                key={key}
                onClick={() => {
                  splitWindow(key);
                }}
              >
                {title} <DynamicIcon name={icon} />
              </DropdownMenuItem>
            )
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MosaicWindowToolbarControlSplitWindowButton;
