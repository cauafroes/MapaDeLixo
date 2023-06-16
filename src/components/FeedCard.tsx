import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export interface IObj {
  name: string;
  image: string;
  desc: string;
}

interface props {
  obj?: IObj;
}

const FeedCard = ({ obj }: props) => {
  return (
    <>
      <a
        href="#"
        className="w-10/12 m-6 items-center bg-white border border-gray-200 rounded-xl shadow-xl md:flex-row"
      >
        <div className="flex-shrink-0">
          {obj ? (
            <>
              <img
                className="object-cover w-full rounded-t-lg h-56 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                // src="https://flowbite.com/docs/images/blog/image-4.jpg"
                src={obj.image}
                alt=""
              />
            </>
          ) : (
            <div className="flex justify-center items-center h-56 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg">
              <Skeleton height={220} width={300} />
            </div>
          )}
        </div>

        <div className="flex flex-col justify-start p-4 md:ml-4">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-left">
            {obj?.name || <Skeleton width={290} />}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-left">
            {obj?.desc || <Skeleton width={290} count={3} />}
          </p>
        </div>
      </a>
    </>
  );
};

export default FeedCard;
