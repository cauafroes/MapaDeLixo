import { BsFillCaretDownFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";

import Navbar from "../components/Navbar";

export interface IObj {
  name: string;
  image: string;
  desc: string;
}

interface props {
  obj?: IObj;
}

const FeedCardOpen = ({ obj }: props) => {
  return (
    <>
    <img className="object-cover w-full h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
        alt="lixo"
        src="https://th.bing.com/th/id/R.8b9585b77ac896a69366a9c5c6fb31b8?rik=8I1qvdeZuLLq1A&riu=http%3a%2f%2fwww.osaogoncalo.com.br%2fimg%2fnormal%2f20000%2fnormal_00028378_00.jpg%3fxid%3d76859&ehk=EQaJwqdiH%2fmweHkAQFu%2bAfNZTRE%2fi8glEBa12KLIkus%3d&risl=&pid=ImgRaw&r=0"/>
    <h1 className="px-4 mt-2 mb-2 text-2xl font-bold tracking-tight text-gray-900 text-left">Lixo em frente a minha casa!</h1>
    <h2 className="px-4 mb-2 text-lg font-bold tracking-tight text-gray-600 text-left">Irajá, Rio de Janeiro - RJ</h2>
    <h2 className="px-4 mb-4 text-lg font-bold tracking-tight text-gray-600 text-left">16/06/2023</h2>
    <div className="flex items-center px-4 mb-2 w-full h-10 flex-row">
        <h3 className="text-lg font-bold tracking-tight text-gray-600 text-left">Descrição</h3>
        <button className="p-0 px-2 bg-transparent w-0 font-bold text-green-800"><BsFillCaretDownFill /></button>
    </div>
    <div className="flex items-center px-4 mb-2 w-full h-auto flex-row border-t border-b border-gray-500 bg-slate-100">
        <p className="p-2.5 text-lg font-bold tracking-tight text-gray-800 text-left">
            Estão jogando lixo em frente a minha casa todo dia,
            porém a comlurb não está realizando a coleta,
            por favor gostaria de alguma solução!
        </p>
    </div>
    <div className="flex items-center px-4 mb-2 w-full h-10 flex-row">
        <h3 className="text-lg font-bold tracking-tight text-gray-600 text-left">Comentários</h3>
        <button className="p-0 px-2 bg-transparent w-0 font-bold text-green-800"><BsFillCaretDownFill /></button>
    </div>

    <div className="flex flex-col items-center py-2 px-4 mb-2 w-full h-auto border-t border-b border-gray-500 bg-slate-100">
            
            <div className="flex px-4 mb-2 w-full h-auto rounded-3xl flex-col bg-white drop-shadow-lg">
                <div className="p-1 flex w-full h-auto">
                    <div className="px-1 pt-3 h-auto">
                        <BsFillPersonFill className="text-4xl"/>
                        <p className="text-sm font-bold tracking-tight text-gray-800">João</p>
                    </div>
                    <p className="px-2 pt-2 text-base font-bold tracking-tight text-gray-800">Passei por aí essa manhã,
                     realmente está bem ruim,
                      mas eu pude observar que tem bastante latinha.</p>
                </div>
                <div className="self-end px-1 pb-2 h-auto">
                    <p className="text-sm font-ligth text-gray-800">18/06/2023</p>
                </div>
            </div>

            <div className="flex px-4 mb-2 w-full h-auto rounded-3xl flex-col bg-white drop-shadow-lg">
                <div className="p-1 flex w-full h-auto">
                    <div className="px-1 pt-3 h-auto">
                        <BsFillPersonFill className="text-4xl"/>
                        <p className="text-sm font-bold tracking-tight text-gray-800">Jonas</p>
                    </div>
                    <p className="px-2 pt-2 text-base font-bold tracking-tight text-gray-800">Valeu pela dica,
                     passei hoje por aí e recolhi todas as latinhas,
                      realmente tinha bastante,
                       agora resta a comlurb passar lá pra retirar o lixo.</p>
                </div>
                <div className="self-end px-1 pb-2 h-auto">
                    <p className="text-sm font-ligth text-gray-800">20/06/2023</p>
                </div>
            </div>
    </div>
    <div className="w-full h-96 mt-4 mb-2 flex items-center flex-col px-4">
        <h1 className="px-4 mb-6 text-3xl font-bold tracking-tight text-gray-900 text-center">Faça um comentário!</h1>
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