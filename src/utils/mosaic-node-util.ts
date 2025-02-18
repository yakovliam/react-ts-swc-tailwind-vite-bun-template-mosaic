import { MosaicNode } from "react-mosaic-component";
import { MosaicKey } from "react-mosaic-component/lib/types";
import { v4 } from "uuid";

const createRootMosaicNode = (existingId: string): MosaicNode<MosaicKey> => {
  return existingId as MosaicNode<MosaicKey>;
};

const generateNodeId = (): string => {
  return v4();
};

export { createRootMosaicNode, generateNodeId };
