import React from "react";
import { ROUTES } from "../../constants/routes";
import { svgs } from "../../assets/svgs/svgs"; // Assuming you have SvgType defined in svgs file
import { useNavigate } from "react-router-dom";

interface Link {
  text: string;
  url: string;
  icon: any; // Assuming you have a type for your svgs
}

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const links: Link[] = [
    { text: "Test Demo", url: ROUTES.form.url, icon: svgs.Demo },
    { text: "Test Repo", url:'TODO-add git url', icon: svgs.Github },
  ];

  const ejectUrls = () => {
    return links.map((item, index) => (
      <a
        key={index}
        onClick={(e) => {
          e.preventDefault();
          navigate(item.url);
        }}
        href={item.url}
        className="flex items-center mr-5 animate-rise shadow-md px-3 whitespace-nowrap mt-2 p-2 hover:bg-gray-100"
      >
        <span className="h-[100px] flex mr-2">{item.icon}</span>
        <span className="">{item.text}</span>
      </a>
    ));
  };

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="w-[300px]  flex justify-start flex-col">
        {ejectUrls()}
      </div>
    </div>
  );
};

export default Landing;
