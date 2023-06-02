import FeedCard, { IObj } from "../components/FeedCard";
import Navbar from "../components/Navbar";

const Feed = () => {
  const objs = [
    {
      title: "lorem",
      desc: "ipsum",
    },
    {
      title: "22",
      desc: "ipsbbum",
    },
  ];

  return (
    <>
      <div className="mb-32">
        {objs.map((obj: IObj, index: number) => (
          <FeedCard key={index} obj={obj} />
        ))}
        <Navbar />
      </div>
    </>
  );
};

export default Feed;
