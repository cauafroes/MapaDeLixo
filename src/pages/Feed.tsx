import { useEffect, useState } from "react";
import FeedCard, { IObj } from "../components/FeedCard";
import Navbar from "../components/Navbar";

import api from "../services/api";

const Feed = () => {
  const [arr, setArr] = useState<IObj[]>([]);
  const [loading, setLoading] = useState(true);

  async function getFeed() {
    await api
      .get("/reports")
      .then((res) => {
        setArr(res.data.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center mb-32">
        {arr.length > 1 && !loading ? 
        arr.map((obj: IObj, index: number) => (
              <FeedCard key={index} obj={obj} />
            ))
          : <>
          <FeedCard />
          <FeedCard />
          <FeedCard />
          </> }

        <Navbar />
      </div>
    </>
  );
};

export default Feed;
