import { useEffect, useLayoutEffect, useRef, useState } from "react";
import useResizeObserver from "@react-hook/resize-observer";
import Map, { MapRef } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

const useSize = (target: React.RefObject<HTMLElement>) => {
  const [size, setSize] = useState<DOMRectReadOnly | null>();

  useLayoutEffect(() => {
    if (target.current) {
      setSize(target.current.getBoundingClientRect());
    }
  }, [target]);

  // Where the magic happens
  useResizeObserver(target, (entry) => setSize(entry.contentRect));
  return size;
};

type MapTileProps = {
  id: string;
};

const MapTile = ({ id }: MapTileProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapRef>(null);
  const size = useSize(containerRef);

  const [viewState] = useState({
    //39.1031° N, 84.5120° W
    longitude: -84.512,
    latitude: 39.1031,
    zoom: 13,
  });

  /**
   * Adjust map component style (size)
   */
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.resize();
    }
  }, [size]);

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      key={id}
      ref={containerRef}
    >
      <Map
        attributionControl={false}
        initialViewState={viewState}
        ref={mapRef}
        style={{ width: "100%", height: "100%" }}
        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
        // mapStyle={"https://geoserveis.icgc.cat/contextmaps/icgc.json"}
      />
    </div>
  );
};

export default MapTile;
