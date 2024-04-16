import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import { Map as OLMap, View } from 'ol';
import { Tile as TileLayer } from 'ol/layer';
import { OSM } from 'ol/source';
import { Overlay } from 'ol';
import { fromLonLat } from 'ol/proj';


const OpenLayersMap = ({ coords, places, weatherData, setChildClicked }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    
    const latitude = coords?.lat ?? 0;
    const longitude = coords?.lng ?? 0;

    const map = new OLMap({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([longitude, latitude]),
        zoom: 14,
      }),
    });

    // Function to create a marker overlay
    const createMarker = (coord, iconUrl, label, data) => {
      const element = document.createElement('div');
      element.className = 'marker';
      const img = document.createElement('img');
      img.src = iconUrl;
      element.appendChild(img);

      // Create overlay
      const overlay = new Overlay({
        position: fromLonLat(coord),
        element: element,
        positioning: 'center-center',
        stopEvent: false,
      });

      // Add overlay to the map
      map.addOverlay(overlay);

      // Optional: handle click events
      element.addEventListener('click', () => {
        if (setChildClicked) {
          setChildClicked(data);
        }
      });
    };

    // Add markers for places
    if (places && places.length) {
      places.forEach((place) => {
        createMarker(
          [place.longitude, place.latitude],
          place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg',
          place.name,
          place
        );
      });
    }

    // Add markers for weather data
    if (weatherData && weatherData.list && weatherData.list.length) {
      weatherData.list.forEach((data) => {
        createMarker(
          [data.coord.lon, data.coord.lat],
          `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
          `${data.weather[0].description}`,
          data
        );
      });
    }

    // Clean up function to remove the target from the map
    return () => {
      map.setTarget(undefined);
    };
  }, [coords, places, weatherData, setChildClicked]);

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
