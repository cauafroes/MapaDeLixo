export interface IObj {
  name: string;
  image: string;
  desc: string;
}

interface props {
  obj: IObj;
}

const FeedCard = ({ obj }: props) => {
  return (
    <>
      <a
        href="#"
        className="flex flex-col m-6 items-center bg-white border border-gray-200 rounded-xl shadow-xl md:flex-row"
      >
        <img
          className="object-cover w-full rounded-t-lg h-56 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          // src="https://flowbite.com/docs/images/blog/image-4.jpg"
          src={obj.image}
          alt=""
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {obj.name}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>
      </a>
    </>
  );
};

export default FeedCard;
