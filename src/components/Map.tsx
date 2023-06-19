import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "../styles/map.css";
import L from "leaflet";

import nivel1 from '../../public/nivel1.svg';

type Place = {
  id: string;
  location: {
    latitude: number;
    longitude: number;
  };
};

export type MapProps = {
  places?: Place[];
};

const marketIcon = L.icon({
  iconUrl: nivel1,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -40],
});

const Map = ({ places }: MapProps) => {
  return (
    <div className="relative h-screen">
      <MapContainer
        center={[-22.902840281655543, -43.26510183477789]}
        zoom={11}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {places?.map(({ id, location }) => {
          const { latitude, longitude } = location;

          return <Marker key={`place-${id}`} position={[latitude, longitude]} icon={marketIcon} />;
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
