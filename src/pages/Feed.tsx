import { useEffect, useState } from "react";
import FeedCard, { IObj } from "../components/FeedCard";
import Navbar from "../components/Navbar";
import api from "../components/api/api";

const Feed = () => {
  const [arr, setArr] = useState([]);

  async function getFeed() {
    await api
      .get("/reports")
      .then((res) => {
        setArr(res.data.data);
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <>
      <div className="mb-32">
        {arr.map((obj: IObj, index: number) => (
          <FeedCard key={index} obj={obj} />
        ))}
        <Navbar />
      </div>
    </>
  );
};

export default Feed;
