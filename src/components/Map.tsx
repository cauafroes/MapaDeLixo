import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "../styles/map.css";
import L from "leaflet";

import nivel1 from '../../public/nivel1.png';
import nivel2 from '../../public/nivel2.png';
import nivel3 from '../../public/nivel3.png';

type Place = {
  id: string;
  location: {
    latitude: number;
    longitude: number;
  };
  nivel: number; // Propriedade "nivel" para determinar o ícone
};

export type MapProps = {
  places?: Place[];
};

const Map = ({ places }: MapProps) => {
  const getMarkerIcon = (nivel: number) => {
    if (nivel === 1) {
      return L.icon({
        iconUrl: nivel1,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -40],
      });
    } else if (nivel === 2) {
      return L.icon({
        iconUrl: nivel2,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -40],
      });
    } else if (nivel === 3) {
      return L.icon({
        iconUrl: nivel3,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -40],
      });
    }
  };

  return (
    <div className="relative h-screen">
      <MapContainer
        center={[-22.902840281655543, -43.26510183477789]}
        zoom={11}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {places?.map(({ id, location, nivel }) => {
          const { latitude, longitude } = location;
          const markerIcon = getMarkerIcon(nivel);

          if (markerIcon) {
            return <Marker key={`place-${id}`} position={[latitude, longitude]} icon={markerIcon} />;
          }

          return null; // Não exibe o marcador se não houver ícone correspondente
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
