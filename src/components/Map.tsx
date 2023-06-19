import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "../styles/map.css";
import L from "leaflet";
import nivel0 from "../../public/nivel0.png";
import nivel1 from "../../public/nivel1.png";
import nivel2 from "../../public/nivel2.png";
import nivel3 from "../../public/nivel3.png";
import nivel4 from "../../public/nivel4.png";
import nivel5 from "../../public/nivel5.png";
import nivel6 from "../../public/nivel6.png";
import nivel7 from "../../public/nivel7.png";
import nivel8 from "../../public/nivel8.png";
import nivel9 from "../../public/nivel9.png";
import nivel10 from "../../public/nivel10.png";
import api from "../services/api";
import { useEffect, useState } from "react";

type Place = {
  id: string;
  gps_lat: number;
  gps_long: number;
  trash_amount: number;
};

const marketIcon = new L.Icon({
  iconUrl:
    "https://th.bing.com/th/id/R.c1d171888c0f59f4f45e2569406d938e?rik=uCyFb1bVsv9Yvg&pid=ImgRaw&r=0",
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -40],
});

// const Map = ({ places }: MapProps) => {
const Map = () => {
  const [arr, setArr] = useState<Place[]>([]);

  async function getFeed() {
    await api
      .get("/getmapcoords")
      .then((res) => {
        setArr(res.data.data);
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    getFeed();
  }, []);

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

        {arr?.map((arr) => {
          const markerIcon = getMarkerIcon(arr.trash_amount);
          return (
            <Marker
              key={`place-${arr.id}`}
              position={[arr.gps_lat, arr.gps_long]}
              icon={marketIcon}
            />
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
