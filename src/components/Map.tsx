import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "../styles/map.css";
import L from "leaflet";
import api from "../services/api";
import { useEffect, useState } from "react";

type Place = {
  id: string;
  gps_lat: number;
  gps_long: number;
  trash_amount: number;
};

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

  const getMarkerIcon = (trash_amount: string) => {
    const num = parseInt(trash_amount);
    const icons = [
      "nivel0",
      "nivel1",
      "nivel2",
      "nivel3",
      "nivel4",
      "nivel5",
      "nivel6",
      "nivel7",
      "nivel8",
      "nivel9",
      "nivel10",
    ];

    let iconUrl = icons.find((_, index) => index === num) || null;
    iconUrl = "../../public/" + iconUrl + ".svg";
    const icon = L.icon({
      iconUrl,
      iconSize: [(40 * num) / 7, (40 * num) / 7],
      // iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -40],
    });

    return icon;
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
          const markerIcon = getMarkerIcon(arr.trash_amount.toString());
          return (
            <Marker
              key={`place-${arr.id}`}
              position={[arr.gps_lat, arr.gps_long]}
              icon={markerIcon}
            />
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
