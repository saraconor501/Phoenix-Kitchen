import { MapContainer, Marker,  TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import L from 'leaflet';
const restaurantCoords = [42.819791, 73.844014];

const MapLeaflet = () => {
    const [markers, setMarkers] = useState([
        { id: 1, lat: 42.798295, lng: 73.845631, text: "Маркер 1" },
        { id: 2, lat:42.799261, lng: 73.843996, text: "Маркер 2" },
        { id: 3, lat: 51.515, lng: -0.11, text: "Маркер 3" }
      ]);
    
      const customIcon = L.icon({
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        });


  return (
    <div className="map-container">
    <MapContainer
      center={restaurantCoords}
      zoom={9}
      style={{ height: "400px", width: "890px" }}
    >
        {markers.map(marker => (
        <Marker icon={customIcon} position={[marker.lat, marker.lng]} key={marker.id}></Marker>
     ))}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  </div>
  )
}

export default MapLeaflet