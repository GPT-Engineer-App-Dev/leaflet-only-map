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
        rectangle: true,
        circle: true,
        marker: true,
        polyline: false,
        circlemarker: false
      }
    });
    map.addControl(drawControl);

    // Event handler for when a shape is created
    map.on(L.Draw.Event.CREATED, (event) => {
      const layer = event.layer;
      drawnItems.addLayer(layer);
    });

    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ height: '100vh', width: '100%' }} />;
};

export default LeafletMap;