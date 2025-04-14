import React from "react";
import { Link } from "react-router-dom";
import VideosList from "../constants/VideoList";

const Videos = () => {
  return (
    <div className="sm:m-5 font-roboto">
      <hr className="my-5" />
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-6 justify-center items-center mx-auto max-w-7xl">
        {VideosList.map((short) => (
          <Link
            to={`/short/${short.id}`}
            key={short.id}
            className="flex flex-col"
          >
            <img
              src={short.thumbnail}
              alt={short.title}
              className="h-[265px] object-cover rounded-lg w-full "
            />
            <div className="">
            <p className="font-light mt-2">{short.title}</p>
            <p className="text-[14px] font-light">{short.views}</p>
            </div>
          </Link>
        ))}
      </div>
      <hr className="my-5" />
    </div>
  );
};

export default Videos;
