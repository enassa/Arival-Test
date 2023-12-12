import React from "react";
import { ROUTES } from "../../constants/routes";
import { svgs } from "../../assets/svgs/svgs";
import { useNavigate } from "react-router-dom";
import { GIT_URL } from "../../constants/urls";

interface Link {
  text: string;
  url: string;
  icon: any;
}

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const links: Link[] = [
    { text: "Test Demo", url: ROUTES.form.url, icon: svgs.Demo },
    { text: "Test Repo", url: GIT_URL, icon: svgs.Github },
  ];

  const ejectUrls = () => {
    return links.map((item, index) => (
      <a
        key={index}
        onClick={(e) => {
          e.preventDefault();

          if(item.text == "Test Repo"){
            location.assign(item.url)
            return;
          }
          navigate(item.url);
        }}
        href={item.url}
        className="flex items-center  animate-rise shadow-md px-3 whitespace-nowrap mt-2 p-2 hover:bg-gray-100"
      >
        <span className="h-[100px] flex mr-2">{item.icon}</span>
        <span className="">{item.text}</span>
      </a>
    ));
  };

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="w-[300px] items-center  flex justify-center flex-col">
        {ejectUrls()}
      </div>
    </div>
  );
};

export default Landing;
