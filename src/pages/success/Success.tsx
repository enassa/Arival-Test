import React, { useEffect, useState } from "react";
import { svgs } from "../../assets/svgs/svgs";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { getAsObjectFromSession } from "../../library/multi-step-form/form-utils/functions";

const Success: React.FC = () => {
  const navigate = useNavigate();
  const [showSubmission, setShowSubmission] = useState<boolean>(false);
  useEffect(() => {
    setInterval(() => {
      setShowSubmission(true);
    }, 1000);
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center flex-col ">
      {showSubmission ? (
        <div className="w-[500px] h-[400px] flex shadow-md mb-5 p-3 overflow-y-auto">
          <pre>
            {JSON.stringify(getAsObjectFromSession("formData"), null, 4)}
          </pre>
        </div>
      ) : (
        <div className="w-[300px] min-w-[300px] h-[300px] mb-[20px] min-h-[300px] animate-rise flex justify-center items-center shadow-neuroInsert rounded-full">
          <span className="animate-bounce">{svgs.CheckCircle}</span>
        </div>
      )}
      <div className="text-xl flex items-center">
        Form was submitted!{" "}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate(ROUTES.base.url);
          }}
          className="text-bgTrade cursor-pointer text-blue-900 font-extrabold mr-2 ml-2"
        >
          Click here to go back
        </a>
        or
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate(ROUTES.base.url);
          }}
          className="text-bgTrade cursor-pointer text-black text-red-800 font-extrabold ml-1 flex items-center"
        >
          <span> here to Check the code</span>
          <span className="flex h-[20px] whitespace-nowrap items-center ml-2 bg-red-50 rounded-full">
            {svgs.Github}
          </span>
        </a>
      </div>
    </div>
  );
};

export default Success;
