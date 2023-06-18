import { BsFillCaretDownFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";

import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import api from "../services/api";
import { useEffect, useState } from "react";
import { split } from "postcss/lib/list";
import Skeleton from "react-loading-skeleton";

interface IObj {
  id: number;
  name: string;
  image: string;
  desc: string;
  address: string;
  neighbourhood: string;
  created_at: Date;
  day: string;
  time: string;
}

const FeedCardOpen = () => {
  const location = useLocation();
  const [data, setData] = useState<IObj | undefined>(undefined);
  const [comments, setComments] = useState(true);
  const [description, setDescription] = useState(true);
  const id = location.state?.id || null;

  async function getData() {
    await api.get(`/reports/${id}`).then((r) => {
      if (r?.data?.type) {
        const dt = new Date(r.data.data.created_at);
        const tempTimeArr = split(dt.toTimeString(), [":"], false);
        r.data.data.day = dt.toLocaleDateString();
        r.data.data.time = tempTimeArr[0] + ":" + tempTimeArr[1];
        setData(r.data.data);
      }
    });
  }

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  console.log(data);

  return (
    <>
      {data?.image ? (
        <img
          className="object-cover w-full h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          alt="lixo"
          src={data?.image}
        />
      ) : (
        <Skeleton height={384} />
      )}

      <h1 className="px-4 mt-2 mb-2 text-2xl font-bold tracking-tight text-gray-900 text-left">
        {data?.name || <Skeleton />}
      </h1>
      <h2 className="px-4 mb-2 text-lg font-bold tracking-tight text-gray-600 text-left">
        {data?.address || <Skeleton />}
      </h2>
      <h2 className="px-4 mb-4 text-lg font-bold tracking-tight text-gray-600 text-left">
        {data?.day ? data?.day + " às " + data?.time : <Skeleton />}
      </h2>
      <div className="flex items-center px-4 mb-2 w-full h-10 flex-row">
        <h3 className="text-lg font-bold tracking-tight text-gray-600 text-left">
          Descrição
        </h3>
        <button
          className="p-0 px-2 bg-transparent w-0 font-bold text-green-800"
          onClick={() => {
            setDescription(!description);
          }}
        >
          <BsFillCaretDownFill />
        </button>
      </div>
      {description && (
        <div className="flex items-center px-4 mb-2 w-full h-auto flex-row border-t border-b border-gray-200  bg-slate-100">
          <p className="p-2.5 text-lg font-bold tracking-tight text-gray-800 text-left">
            {data?.desc || <Skeleton />}
          </p>
        </div>
      )}
      <div className="flex items-center px-4 mb-2 w-full h-10 flex-row">
        <h3 className="text-lg font-bold tracking-tight text-gray-600 text-left">
          Comentários
        </h3>
        <button
          className="p-0 px-2 bg-transparent w-0 font-bold text-green-800"
          onClick={() => {
            setComments(!comments);
          }}
        >
          <BsFillCaretDownFill />
        </button>
      </div>

      {comments && (
        <div className="flex flex-col items-center py-2 px-4 mb-2 w-full h-auto border-t border-b border-gray-200 bg-slate-100">
          <div className="flex px-4 mb-2 w-full h-auto rounded-3xl flex-col bg-white drop-shadow-lg">
            <div className="p-1 flex w-full h-auto">
              <div className="px-1 pt-3 h-auto">
                <BsFillPersonFill className="text-4xl" />
                <p className="text-sm font-bold tracking-tight text-gray-800">
                  Jonas
                </p>
              </div>
              <p className="px-2 pt-2 text-base font-bold tracking-tight text-gray-800">
                Valeu pela dica, passei hoje por aí e recolhi todas as latinhas,
                realmente tinha bastante, agora resta a comlurb passar lá pra
                retirar o lixo.
              </p>
            </div>
            <div className="self-end px-1 pb-2 h-auto">
              <p className="text-sm font-ligth text-gray-800">20/06/2023</p>
            </div>
          </div>
        </div>
      )}
      <div className="w-full h-96 mt-4 mb-2 flex items-center flex-col px-4">
        <h1 className="px-4 mb-6 text-3xl font-bold tracking-tight text-gray-900 text-center">
          Faça um comentário!
        </h1>
        <input
          name="name"
          placeholder="Nome"
          className="w-full border border-gray-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="comment"
          placeholder="Escreva seu comentário aqui..."
          className="w-full mt-5 h-24 border border-gray-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 mt-4 self-center text-white text-lg font-bold px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-40 h-14"
        >
          Comentar
        </button>
      </div>
      <Navbar />
    </>
  );
};

export default FeedCardOpen;
