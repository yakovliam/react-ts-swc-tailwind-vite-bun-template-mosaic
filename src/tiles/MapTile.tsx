import Map, { MapRef } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import useResizeObserver from "@react-hook/resize-observer";

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

const accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

type MapTileProps = {
  id: string;
};

const MapTile = ({ id }: MapTileProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapRef>(null);
  const size = useSize(containerRef);

  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 3.5,
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
        key={id}
        ref={mapRef}
        mapboxAccessToken={accessToken}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        projection={"globe"}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/yakovliam/cm79dhzn4001001s0gnhd94wx/draft"
      />
    </div>
  );
};

export default MapTile;
