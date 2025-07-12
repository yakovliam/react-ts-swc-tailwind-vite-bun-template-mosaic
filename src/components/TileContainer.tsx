import "react-mosaic-component/react-mosaic-component.css";
import {
  MosaicNode,
  MosaicWindow,
  MosaicWithoutDragDropContext,
} from "react-mosaic-component";
import { useMosaicWindowProvider } from "@/hooks/use-mosaic-window-provider";
import useMosaicStateManager from "@/hooks/use-mosaic-state-manager";
import NoWindowsScreen from "./NoWindowsScreen";
import { Trash2 } from "lucide-react";
import MosaicWindowToolbarControlSplitWindowButton from "./toolbar/MosaicWindowToolbarControlSelectButton";
import MosaicWindowToolbarControlButton from "./toolbar/MosaicWindowToolbarControlButton";
import { TileRepositoryElementType } from "@/types/tile-repository";

const TileContainer = () => {
  const { provider } = useMosaicWindowProvider();
  const {
    node,
    onNodeChange,
    addTileToTopRight,
    removeTile,
    addTileAtPath,
    repositoryAndNodeAreEmpty,
  } = useMosaicStateManager();

  if (repositoryAndNodeAreEmpty) {
    return <NoWindowsScreen addTileToTopRight={addTileToTopRight} />;
  }

  return (
    <MosaicWithoutDragDropContext<string>
      onChange={onNodeChange}
      renderTile={(id, _path) => {
        const {
          toolbarControls,
          path,
          title,
          component: TileComponent,
        } = provider({
          path: _path,
          id,
        });
        return (
          <MosaicWindow
            toolbarControls={[
              ...toolbarControls,
              <MosaicWindowToolbarControlSplitWindowButton
                key="mosaic-window-toolbar-control-split-window-button"
                splitWindow={(type: TileRepositoryElementType) => {
                  addTileAtPath(_path, type);
                }}
              />,
              <MosaicWindowToolbarControlButton
                key="mosaic-window-toolbar-control-delete-button"
                variant="destructive"
                icon={<Trash2 size={18} />}
                onClick={() => {
                  removeTile(path);
                }}
              />,
            ]}
            path={path}
            title={title}
            key={id}
            createNode={() => {
              throw new Error("Not implemented");
            }}
          >
            <TileComponent id={id} key={id} />
          </MosaicWindow>
        );
      }}
      initialValue={node as MosaicNode<string>}
    />
  );
};

export default TileContainer;
