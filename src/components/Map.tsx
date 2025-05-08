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

    const max = 10;
    const hue = 120 - Math.min(num, max) * 12; // 120 (green) ➝ 0 (red)
    const bgColor = `hsl(${hue}, 80%, 50%)`;

    const iconSize = Math.max(20, (60 * num) / 7); // Minimum size 20
    // const bgColor = `hsl(${Math.min(num * 12, 120)}, 80%, 50%)`; // Changes color from green to red-ish

    const icon = L.divIcon({
      className: '', // Remove default class
      html: `<div style="
        width: ${iconSize}px;
        height: ${iconSize}px;
        background-color: ${bgColor};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: white;
        border: 2px solid white;
      ">${num}</div>`,
      iconSize: [iconSize, iconSize],
      iconAnchor: [iconSize / 2, iconSize / 2],
      popupAnchor: [0, -iconSize / 2],
    });

    return icon
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
