import { useState } from "react";
import api from "./api/api";
export default function SendReport() {
  const [data, setData] = useState({
    name: "",
    desc: "",
    gps_lat: null,
    gps_long: null,
    image: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form submission

    try {
      // Send the POST request using Axios
      const response = await api.post("/api/report", data);
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Send Report</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea name="desc" value={data.desc} onChange={handleChange} />
        </label>
        <br />
        <label>
          Latitude:
          <input
            type="number"
            name="gps_lat"
            value={data.gps_lat || ""}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Longitude:
          <input
            type="number"
            name="gps_long"
            value={data.gps_long || ""}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Image URL:
          <input
            type="text"
            name="image"
            value={data.image}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
