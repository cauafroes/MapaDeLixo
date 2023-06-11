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
      <div className="flex flex-col items-center justify-center mb-32">
        {arr.length > 0 ? (
          arr.map((obj: IObj, index: number) => (
            <FeedCard key={index} obj={obj} />
          ))
        ) : (
          <div className=" w-full h-1/3 mt-44 p-8 rounded-sm">
            <p className="text-center text-4xl">
              Nenhuma irregularidade reportada
            </p>
          </div>
        )}
        <Navbar />
      </div>
    </>
  );
};

export default Feed;
