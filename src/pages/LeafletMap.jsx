import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';

const LeafletMap = () => {
  const mapRef = useRef(null);
  const drawnItemsRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map('map').setView([40.7128, -74.0060], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      mapRef.current = map;

      // Initialize FeatureGroup for drawn items
      drawnItemsRef.current = new L.FeatureGroup();
      map.addLayer(drawnItemsRef.current);

      // Initialize draw control
      const drawControl = new L.Control.Draw({
        edit: {
          featureGroup: drawnItemsRef.current,
          poly: {
            allowIntersection: false
          }
        },
        draw: {
          polygon: {
            allowIntersection: false,
            showArea: true
          },
          polyline: false,
          circle: true,
          rectangle: true,
          marker: true,
          circlemarker: false
        }
      });
      map.addControl(drawControl);

      // Event handler for created items
      map.on(L.Draw.Event.CREATED, (event) => {
        const layer = event.layer;
        drawnItemsRef.current.addLayer(layer);
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div id="map" style={{ height: '100vh', width: '100%' }} />;
};

export default LeafletMap;