import React from 'react';

interface IObj {
  label: string;
}

interface Props {
  obj: IObj;
}

export const Tag: React.FC<Props> = ({ obj }) => {
  return (
  <div className="inline-flex mt-2 pr-4 items-center bg-orange-200 rounded-full">
    <div className="inline-flex items-center text-sm px-2 py-1 bg-orange-300 font-bold text-orange-700 rounded-full">
        {obj.label}
    </div>
        <button className="p-0 bg-transparent w-0 mb-1 ml-1 font-bold text-orange-800">x</button>
    </div> 
  );
};
