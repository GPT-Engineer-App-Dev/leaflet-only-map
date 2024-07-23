import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';

const LeafletMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map('map').setView([40.7128, -74.0060], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Initialize the FeatureGroup to store editable layers
      const editableLayers = new L.FeatureGroup();
      map.addLayer(editableLayers);

      // Initialize draw control
      const drawControl = new L.Control.Draw({
        edit: {
          featureGroup: editableLayers
        },
        draw: {
          polygon: true,
          rectangle: true,
          circle: true,
          marker: true,
          polyline: false,
          circlemarker: false
        }
      });
      map.addControl(drawControl);

      // Event handler for when a new shape is created
      map.on(L.Draw.Event.CREATED, (event) => {
        const layer = event.layer;
        editableLayers.addLayer(layer);
      });

      mapRef.current = map;
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <div id="map" className="h-full w-full" />
      <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow">
        <h3 className="text-sm font-semibold mb-1">Drawing Tools:</h3>
        <p className="text-xs">Use the toolbar on the left to draw shapes on the map.</p>
      </div>
    </div>
  );
};

export default LeafletMap;