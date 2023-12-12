import React from "react";

interface SlimLoaderProps {
  loading?: boolean;
  bgColor?: string;
  loaderColor?: string;
}

const SlimLoader: React.FC<SlimLoaderProps> = ({
  loading = true,
  bgColor,
  loaderColor,
}) => {
  return (
    <div
      className={`w-full h-[2px] flex relative ${
        bgColor ? bgColor : "bg-blue-100"
      } `}
    >
      {loading && (
        <div className="absolute w-full top-0 right-0 flex justify-center h-[2px] ">
          <div
            className={`h-full w-full bg-[#2C3F4F] infinite-slide ${
            loaderColor ? loaderColor : ""
            }`}
          ></div>
        </div>
      )}
    </div>
  );
};

export default SlimLoader;
