import { useState, ChangeEvent } from "react";
import Switch from "react-switch";
import Slider from "@mui/material/Slider";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

interface FormData {
  name: string;
  desc: string;
  cep: string;
  gps_lat: number | null;
  gps_long: number | null;
  image: File | null;
}

export default function SendReport() {
  const [automaticGPS, setAutomaticGPS] = useState(false);
  const [value, setValue] = useState(0); // Set do Input Range
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [red, setRed] = useState(255);
  const [green, setGreen] = useState(200);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState<FormData>({
    name: "",
    desc: "",
    cep: "",
    gps_lat: null,
    gps_long: null,
    image: null,
  });

  const handleSwitchChange = (checked: boolean) => {
    if (checked === true) fetchUserLocation();
    setAutomaticGPS(checked);
  };

  const fetchUserLocation = () => {
    // const re = /^[0-9.\-\b]+$/;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setData((prevData) => ({
            ...prevData,
            gps_lat: position.coords.latitude,
            gps_long: position.coords.longitude,
          }));
        },
        () => {
          alert(
            "Não conseguimos obter sua localização, certifique-se de ter permitido o acesso quando requisitado."
          );
          setAutomaticGPS(false);
        }
      );
    } else {
      alert("Este navegador não suporta Geolocalização.");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("desc", data.desc);
    if (data.cep != null && data.cep.length >= 8 && !automaticGPS) {
      formData.append("cep", data.cep.slice(0, 5) + "-" + data.cep.slice(5));
    }
    if (data.gps_lat != null && automaticGPS) {
      data.gps_lat = parseFloat(data.gps_lat.toFixed(8));
      formData.append("gps_lat", String(data.gps_lat));
    }
    if (data.gps_long != null && automaticGPS) {
      data.gps_long = parseFloat(data.gps_long.toFixed(8));
      formData.append("gps_long", String(data.gps_long));
    }
    formData.append("trash_amount", String(value));
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    await api
      .post("/reports", formData, {
        headers: {
          "Content-Type": "multipart/form-data;",
        },
      })
      .then((response) => {
        setLoading(false);

        if (response.data.type === true) {
          alert("Lixo reportado com sucesso!");
          return navigate("/");
        }
        console.log(response.data.success);
        if (!response.data.success) {
          const error = Object.values(
            response?.data?.data as { [key: string]: string }
          )[0];
          alert(error[0]);
        }
      });
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    let processedValue = value;
    if (name == "cep") {
      processedValue = processedValue.replace(/[^0-9]/g, "");
    }
    setData((prevData) => ({
      ...prevData,
      [name]: processedValue,
    }));
    console.log(data.cep);
  };

  const handleSliderChange = (event: any) => {
    const tempvalue = event?.target?.value;
    setValue(tempvalue);
    const normalizedValue = value / 10;
    const updatedRed = Math.round(normalizedValue + 1 * 180);
    const updatedGreen = Math.round((1 - normalizedValue) * 220);

    setRed(updatedRed);
    setGreen(updatedGreen);
  };

  return (
    <>
      <div className="max-w-md p-7 mb-28 mx-auto">
        <h1 className="text-2xl font-bold">Reportar lixo</h1>
        <form onSubmit={handleSubmit} className="leading-9 mt-6">
          <label className="block mb-1 pt-1">
            Selecione uma imagem:
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleFileChange}
              className="
                file:bg-gradient-to-b file:from-blue-400 file:to-blue-500
                file:text-xs
                file:px-6 file:py-3 file:m-5
                file:border-none
                file:rounded-xl
                file:text-white

                w-full px-1 mt-3 text-xs text-gray bg-blue-300 rounded-xl text-white pr-4
              "
            />
          </label>
          <label className="block mb-2">
            Nome:
            <input
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Lixo na esquina da minha casa!"
              className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <label className="block mb-2">
            Descrição:
            <textarea
              name="desc"
              value={data.desc}
              onChange={handleChange}
              placeholder="Estão jogando lixo..."
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <div className="text-center">
            <p>Quantidade de Lixo</p>
          </div>
          <label
            htmlFor="rangeInput"
            className="flex mb-1 justify-between items-center"
          >
            <span>0</span>
            <span>10</span>
          </label>

          <Slider
            defaultValue={2}
            min={0}
            max={10}
            sx={{
              color: `rgb(${red}, ${green}, 60)`,
            }}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            step={1}
            marks
          />
          {automaticGPS ? (
            <>
              <label className="block mb-2">
                Latitude:
                <input
                  disabled
                  name="gps_lat"
                  value={data.gps_lat || ""}
                  onChange={handleChange}
                  className="border border-gray-300 text-gray-400 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <label className="block mb-2">
                Longitude:
                <input
                  disabled
                  name="gps_long"
                  value={data.gps_long || ""}
                  onChange={handleChange}
                  className="border border-gray-300 text-gray-400 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
            </>
          ) : (
            <label className="block mb-2">
              CEP:
              <input
                name="cep"
                value={data.cep || ""}
                maxLength={8}
                placeholder="12345678"
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          )}
          <label className="flex items-center mt-5 mb-5 justify-between bg-blue-400 p-4 rounded-xl text-white">
            Usar minha localização
            <Switch
              height={17}
              width={35}
              handleDiameter={25}
              onChange={handleSwitchChange}
              checked={automaticGPS}
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 mt-7 text-white py-4 px-4 rounded focus:outline-none text-center align-middle focus:ring-2 focus:ring-blue-500 w-full flex items-center justify-center"
          >
            {!loading ? (
              "Cadastrar"
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-9 h-9 animate-spin"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            )}
          </button>
        </form>
      </div>
    </>
  );
}
