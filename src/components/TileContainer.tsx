import "react-mosaic-component/react-mosaic-component.css";
import {
  MosaicNode,
  MosaicWindow,
  MosaicWithoutDragDropContext,
} from "react-mosaic-component";
import { useMosaicWindowProvider } from "@/hooks/use-mosaic-window-provider";
import useMosaicStateManager from "@/hooks/use-mosaic-state-manager";
import NoWindowsScreen from "./NoWindowsScreen";
import MosaicWindowToolbarControlButton from "./MosaicWindowToolbarControlButton";
import { PanelLeftOpen, Trash2 } from "lucide-react";

const TileContainer = () => {
  const { provider } = useMosaicWindowProvider();
  const {
    node,
    onNodeChange,
    addTileToTopRight,
    removeTile,
    repositoryAndNodeAreEmpty,
    addTileAtPath,
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
              <MosaicWindowToolbarControlButton
                icon={<PanelLeftOpen size={18} />}
                onClick={() => {
                  addTileAtPath(path, "map");
                }}
              />,
              <MosaicWindowToolbarControlButton
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
