import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "../styles/map.css";
import L from "leaflet";

import nivel0 from '../../public/nivel0.png';
import nivel1 from '../../public/nivel1.png';
import nivel2 from '../../public/nivel2.png';
import nivel3 from '../../public/nivel3.png';
import nivel4 from '../../public/nivel4.png';
import nivel5 from '../../public/nivel5.png';
import nivel6 from '../../public/nivel6.png';
import nivel7 from '../../public/nivel7.png';
import nivel8 from '../../public/nivel8.png';
import nivel9 from '../../public/nivel9.png';
import nivel10 from '../../public/nivel10.png';

type Place = {
  id: string;
  location: {
    latitude: number;
    longitude: number;
  };
  qtd_de_lixo: number;
};

export type MapProps = {
  places?: Place[];
};

const Map = ({ places }: MapProps) => {
  const getMarkerIcon = (qtd_de_lixo: number) => {
    let iconUrl = "";

    switch (qtd_de_lixo) {
      case 0:
        iconUrl = nivel0;
        break;
      case 1:
        iconUrl = nivel1;
        break;
      case 2:
        iconUrl = nivel2;
        break;
      case 3:
        iconUrl = nivel3;
        break;
      case 4:
        iconUrl = nivel4;
        break;
      case 5:
        iconUrl = nivel5;
        break;
      case 6:
        iconUrl = nivel6;
        break;
      case 7:
        iconUrl = nivel7;
        break;
      case 8:
        iconUrl = nivel8;
        break;
      case 9:
        iconUrl = nivel9;
        break;
      case 10:
        iconUrl = nivel10;
        break;
      default:
        return null;
    }

    return L.icon({
      iconUrl,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -40],
    });
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

        {places?.map(({ id, location, qtd_de_lixo }) => {
          const { latitude, longitude } = location;
          const markerIcon = getMarkerIcon(qtd_de_lixo);

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
