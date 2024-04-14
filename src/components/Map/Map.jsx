import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import { Map as OLMap, View } from 'ol';
import { Tile as TileLayer } from 'ol/layer';
import { OSM } from 'ol/source';

const OpenLayersMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
   
    const map = new OLMap({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0], 
        zoom: 2, 
      }),
    });

   
    return () => {
      map.setTarget(undefined);
    };
  }, []);

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',  
        height: '100vh', 
      }}
    />
  );
};

export default OpenLayersMap;
