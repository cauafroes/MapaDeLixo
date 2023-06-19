import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "../styles/map.css";
import L from "leaflet";
import api from "../services/api";
import { useEffect, useState } from "react";

type Place = {
  id: string;
  gps_lat: number;
  gps_long: number;
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
