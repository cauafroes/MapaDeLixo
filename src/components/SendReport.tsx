import { useState, ChangeEvent } from "react";
import Switch from "react-switch";
import Slider from "@mui/material/Slider";
import api from "./api/api";

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
  const [data, setData] = useState<FormData>({
    name: "",
    desc: "",
    cep: "",
    gps_lat: null,
    gps_long: null,
    image: null,
  });
  // Funções do Input Range
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
  };
  const getRangeColor = () => {
    if (value < 3) {
      return "bg-red-500";
    } else if (value < 6) {
      return "bg-yellow-500";
    } else {
      return "bg-green-500";
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    if (checked === true) fetchUserLocation();
    setAutomaticGPS(checked);
  };

  const fetchUserLocation = () => {
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
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("desc", data.desc);
    formData.append("cep", data.cep);
    formData.append("gps_lat", String(data.gps_lat));
    formData.append("gps_long", String(data.gps_long));
    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    try {
      const response = await api.post("/reports", formData, {
        headers: {
          "Content-Type": "multipart/form-data;",
        },
      });
      console.log(response.data);
    } catch (error: any) {
      alert(JSON.stringify(error.response.data.message));
    }
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
    const re = /^[0-9.\-\b]+$/;
    if (name === "image") {
      const fileInput = event.target as HTMLInputElement;
      const file = fileInput.files && fileInput.files[0];
      console.log(file);
      setData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
    }
    if (name === "gps_lat" || name === "gps_long") {
      if (value === "" || re.test(value)) {
        setData((prevData) => ({
          ...prevData,
          [name]: value ? parseFloat(value) : null,
        }));
      }
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSliderChange = (event: any, value: any) => {
    const normalizedValue = value / 10;
    const updatedRed = Math.round(normalizedValue + 1 * 200);
    const updatedGreen = Math.round((1 - normalizedValue) * 200);

    setRed(updatedRed);
    setGreen(updatedGreen);
  };

  const colorStyle = {
    width: 300,
    color: `rgb(${red}, ${green}, 60)`,
  };

  return (
    <>
      <div className="max-w-md p-7 mb-28 mx-auto">
        <h1 className="text-2xl font-bold mb-4">Reportar lixo</h1>
        <form onSubmit={handleSubmit}>
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
                placeholder="12345-678"
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          )}
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
                file:rounded-full
                file:text-white

                w-full px-1 mt-3 text-xs text-gray bg-blue-300 rounded-full text-white
              "
            />
          </label>
          <p>Quantidade de Lixo</p>
          <label
            htmlFor="rangeInput"
            className="flex mb-1 justify-between items-center"
          >
            <span>0</span>
            <span>10</span>
          </label>
          <input
            id="rangeInput"
            type="range"
            min="0"
            max="10"
            value={value}
            onChange={handleInputChange}
            className={`w-full h-8 rounded-md transition-colors ${getRangeColor()}`}
          />
          <Slider
            defaultValue={2}
            min={0}
            max={10}
            sx={colorStyle}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            step={1}
            marks
          />
          <button
            type="submit"
            className="bg-blue-500 mt-3 text-white py-4 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </>
  );
}
