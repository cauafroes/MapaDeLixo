import { BsCamera } from "react-icons/bs";
import { BsListUl } from "react-icons/bs";
import { BsMap } from "react-icons/bs";
import { BsPlusLg } from "react-icons/bs";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="shadow-lg h-20 fixed bottom-5 left-0 right-0 flex items-center justify-between bg-slate-300 text-black bg-opacity-50 backdrop-blur-md p-4 z-10 rounded-xl mx-auto w-11/12">
      <div className="flex items-center justify-center w-1/4">
        <Link to="/feed">
          <BsListUl className="text-3xl" />
        </Link>
      </div>
      <div className="flex items-center justify-center w-1/4">
        <Link to="/">
          <BsMap className="text-3xl" />
        </Link>
      </div>
      <div className="flex items-center justify-center w-1/4">
        <Link to="/report">
          <BsPlusLg className="text-3xl" />
        </Link>
      </div>
      <div className="flex items-center justify-center w-1/4">
        <Link to="/camera">
          <BsCamera className="text-3xl" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
