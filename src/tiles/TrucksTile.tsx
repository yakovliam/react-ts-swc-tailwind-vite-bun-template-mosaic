/**
 * This is a placeholder tile. You can replace this with your own content.
 * The JSX (tsx, since we're using TypeScript) will be rendered in the content
 * box of the applicable node in the mosaic tree.
 */

type TrucksTileProps = {
  id: string;
};

const TrucksTile = ({ id }: TrucksTileProps) => {
  return (
    <div className="flex flex-col items-start justify-start m-8 p-4 gap-4 border-red-500 border-dashed border-4">
      <span>
        This is a placeholder tile. You can replace this with your own content.
      </span>
      <span className="grow display-block">
        The ID of this tile is: &nbsp;<pre>{id}</pre>
      </span>
    </div>
  );
};

export default TrucksTile;
