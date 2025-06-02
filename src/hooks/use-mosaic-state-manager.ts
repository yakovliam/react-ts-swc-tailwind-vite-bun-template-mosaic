import { useTileRepositoryStore } from "@/state/tile-repository-store";
import { useTileStore } from "@/state/tile-store";
import {
  TILE_METADATA_MAPPING,
  TileRepositoryElementType,
} from "@/types/tile-repository";
import { createRootMosaicNode, generateNodeId } from "@/utils/mosaic-node-util";
import { dropRight } from "lodash";
import { useEffect, useState } from "react";
import {
  Corner,
  createRemoveUpdate,
  getNodeAtPath,
  getOtherDirection,
  getPathToCorner,
  MosaicNode,
  updateTree,
} from "react-mosaic-component";
import {
  MosaicDirection,
  MosaicKey,
  MosaicParent,
  MosaicPath,
  MosaicUpdate,
} from "react-mosaic-component/lib/types";

type MosaicStateManager = {
  node: MosaicNode<MosaicKey> | null;
  onNodeChange: (node: MosaicNode<MosaicKey> | null) => void;
  addTileToTopRight: (type: TileRepositoryElementType) => void;
  removeTile: (path: MosaicPath) => void;
  addTileAtPath: (path: MosaicPath, type: TileRepositoryElementType) => void;
  repositoryAndNodeAreEmpty: boolean;
};

const useMosaicStateManager = (): MosaicStateManager => {
  const node = useTileStore((state) => state.node);
  const setNode = useTileStore((state) => state.setNode);
  const addRepositoryElement = useTileRepositoryStore((state) => state.add);
  const repository = useTileRepositoryStore((state) => state.repository);
  const [repositoryAndNodeAreEmpty, setRepositoryAndNodeAreEmpty] =
    useState<boolean>(false);

  const addTileElementToRepository = (
    tileId: string,
    type: TileRepositoryElementType
  ) => {
    const tileMapping = TILE_METADATA_MAPPING.get(type);
    // select the component by the type
    const component = tileMapping?.[0];
    const title = tileMapping?.[1];

    if (!component) {
      throw new Error("Component not found");
    }

    if (!title) {
      throw new Error("Title not found");
    }

    addRepositoryElement({
      id: tileId,
      type,
      component,
      title,
    });
  };

  const addTileToTopRight = (type: TileRepositoryElementType) => {
    const tileId = generateNodeId();

    // if there's no initial node, create it
    if (!node) {
      addTileElementToRepository(tileId, type);
      setNode(createRootMosaicNode(tileId));
      return;
    }

    const path = getPathToCorner(node, Corner.TOP_RIGHT);
    const parent = getNodeAtPath(
      node,
      dropRight(path)
    ) as MosaicParent<MosaicKey>;

    // get the destination node
    const destination = getNodeAtPath(node, path) as MosaicNode<MosaicKey>;

    const direction: MosaicDirection = parent
      ? getOtherDirection(parent.direction)
      : "row";

    let first: MosaicNode<MosaicKey>;
    let second: MosaicNode<MosaicKey>;

    // create first/second nodes based on previous parent
    if (direction === "row") {
      first = destination;
      second = tileId;
    } else {
      first = tileId;
      second = destination;
    }

    // update the tree
    const updatedNode = updateTree(node, [
      {
        path,
        spec: {
          $set: {
            direction,
            first,
            second,
          },
        },
      },
    ]);

    addTileElementToRepository(tileId, type);
    setNode(updatedNode);
  };

  const removeTile = (path: MosaicPath) => {
    if (!node) {
      throw new Error("Node is null. This shouldn't happen.");
    }

    const update: MosaicUpdate<string | number> = createRemoveUpdate(
      node,
      path
    );
    const updatedNode = updateTree(node, [update]);

    setNode(updatedNode);
  };

  const onNodeChange = (node: MosaicNode<MosaicKey> | null) => {
    if (!node) {
      throw new Error(
        "Node is null. This shouldn't happen. Or it might, if the developer forgot to implement a case for when the user removes all the windows."
      );
    }

    setNode(node);
  };

  const addTileAtPath = (path: MosaicPath, type: TileRepositoryElementType) => {
    if (!node) {
      throw new Error("Node is null. This shouldn't happen.");
    }

    // get the node at the selected path
    const nodeAtPath = getNodeAtPath(node, path) as MosaicNode<MosaicKey>;

    if (!nodeAtPath) {
      throw new Error("Node at path is null. This shouldn't happen.");
    }

    const tileId = generateNodeId();
    addTileElementToRepository(tileId, type);

    // create a new node to replace the old one, with a first/second
    const updatedNode = updateTree(node, [
      {
        path,
        spec: {
          $set: {
            direction: "row",
            first: nodeAtPath,
            second: tileId,
          },
        },
      },
    ]);

    setNode(updatedNode);
  };
  /**
   * TODO this hasn't been tested or explored at all, the whole logic
   * might be completely faulty
   */
  useEffect(() => {
    if (
      node === null &&
      repository.length === 0 &&
      !repositoryAndNodeAreEmpty
    ) {
      setRepositoryAndNodeAreEmpty(true);
    }

    if (node !== null && repository.length > 0 && repositoryAndNodeAreEmpty) {
      setRepositoryAndNodeAreEmpty(false);
    }

    // if one or the other is null/empty but not both, warn
    if (
      (node === null && repository.length > 0) ||
      (repository.length === 0 && node !== null)
    ) {
      // something isn't quite right. they should both be empty
      console.warn(
        "either the repository or the node is not empty. something is wrong here, explore."
      );
      console.warn("node", node);
      console.warn("repository", repository);
      setRepositoryAndNodeAreEmpty(false);
    }
  }, [
    node,
    repository,
    setRepositoryAndNodeAreEmpty,
    repositoryAndNodeAreEmpty,
  ]);

  return {
    node,
    onNodeChange,
    addTileToTopRight,
    repositoryAndNodeAreEmpty,
    removeTile,
    addTileAtPath,
  };
};

export default useMosaicStateManager;
