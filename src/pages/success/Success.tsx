import React, { useEffect, useState } from "react";
import { svgs } from "../../assets/svgs/svgs";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { getAsObjectFromSession } from "../../library/multi-step-form/form-utils/functions";
import { GIT_URL } from "../../constants/urls";

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
        <>
          <div className="md:w-[700px] h-md:[400px] w-[95%] h-[80%] flex md:shadow-md shadow-sm mb-5 p-[20px] overflow-y-auto overflow-x-auto">
            <pre>
              {JSON.stringify(getAsObjectFromSession("formData"), null, 4)}
            </pre>
          </div>
          <div className="text-xl flex items-center">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate(ROUTES.base.url);
              }}
              className="text-bgTrade cursor-pointer text-blue-900 font-extrabold mr-2 ml-2"
            >
              Go back
            </a>
            ||
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                location.assign(GIT_URL);
              }}
              className="text-bgTrade cursor-pointer text-red-800 font-extrabold ml-1 flex items-center"
            >
              <span> Check code</span>
            </a>
          </div>
        </>
      ) : (
        <div className="w-[300px] min-w-[300px] h-[300px] mb-[20px] min-h-[300px] animate-rise flex justify-center items-center shadow-neuroInsert rounded-full">
          <span className="animate-bounce">{svgs.CheckCircle}</span>
        </div>
      )}
    </div>
  );
};

export default Success;
