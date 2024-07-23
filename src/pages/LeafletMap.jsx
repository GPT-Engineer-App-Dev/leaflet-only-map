import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';

const LeafletMap = () => {
  useEffect(() => {
    const map = L.map('map').setView([40.7128, -74.0060], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Initialize FeatureGroup to store editable layers
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    // Initialize draw control
    const drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems,
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

    // Event handler for when a new shape is created
    map.on(L.Draw.Event.CREATED, (event) => {
      const layer = event.layer;
      drawnItems.addLayer(layer);
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="relative h-screen w-full">
      <div id="map" className="h-full w-full" />
      <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow z-[1000]">
        <h3 className="font-bold mb-2">Drawing Tools:</h3>
        <ul className="list-disc pl-5">
          <li>Polygon</li>
          <li>Rectangle</li>
          <li>Circle</li>
          <li>Marker</li>
        </ul>
      </div>
    </div>
  );
};

export default LeafletMap;