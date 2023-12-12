import { memo, useState, useRef, useEffect } from "react";
import ClickAwayListener from "../../library/multi-step-form/components/ClickAwayListener";
import { TypeAheadComponent } from "../../library/multi-step-form/config/form-types";
import { svgs } from "../../assets/svgs/svgs";
import SlimLoader from "../slim-loader/SlimLoader";

const TypeAhead: TypeAheadComponent = memo(
  ({ data, className, dropContainerClassName, onChange, onBlur }) => {
    const {
      type,
      name,
      optionsKey,
      value,
      placeholder,
      label,
      disabled,
      dataSourceUrl,
    } = data;

    const inputRef = useRef<HTMLInputElement>();
    const [typeAhead, setTypeAheadState] = useState({
      isPanelShowing: false,
      selected: value || "",
      inputVaue: value,
      dropListData: [],
      loading: false,
    });

    const reg = new RegExp("[^,]*" + typeAhead.inputVaue + "[^,]*", "ig");
    const optionsListArr =
      typeAhead.inputVaue !== "" && typeAhead.inputVaue !== undefined
        ? typeAhead?.dropListData
            .map((item) => item[optionsKey])
            .filter((option) => option.match(reg))
        : typeAhead?.dropListData.map((item) => item[optionsKey]);

    const isValid = (param) => {
      const currentValue = (param.targte as HTMLInputElement)?.value || param;
      return optionsListArr.includes(currentValue);
    };

    const setSelected = (option) => {
      onChange && onChange(option);
      setTypeAheadState((prev) => ({
        ...prev,
        selected: option,
        inputVaue: option,
        isPanelShowing: false,
        error: false,
      }));
    };

    const setInputValue = (currentValue) => {
      console.log(typeAhead.selected);
      setTypeAheadState((prev) => ({
        ...prev,
        inputVaue: currentValue,
      }));
    };

    const openPanel = () => {
      setTypeAheadState((prev) => ({
        ...prev,
        inputVaue: "",
        isPanelShowing: disabled ? false : true,
      }));
    };

    const closePanel = () => {
      setTypeAheadState((prev) => ({
        ...prev,
        inputVaue: typeAhead.selected,
        isPanelShowing: false,
      }));
    };

    const fetchDropListData = async () => {
      setTypeAheadState((prev) => ({
        ...prev,
        loading: true,
      }));
      fetch(dataSourceUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.name.common,
          }));
          // Added set interval just to show loading animation.
          setInterval(() => {
            setTypeAheadState((prev) => ({
              ...prev,
              dropListData: countries,
            }));
          }, 5000);

        })
        .catch((error) => {
          console.error("Error during fetch:", error);
        })
        .finally(() => {
          setInterval(() => {
            setTypeAheadState((prev) => ({
              ...prev,
              loading: false,
            }));
          }, 5000);
        });
    };

    const getOptions = () => {
      return optionsListArr.map((option, index) => {
        const isSelected = typeAhead.selected === option;
        return (
          <div
            onClick={() => {
              setSelected(option);
            }}
            key={index}
            className={`w-full min-h-[40px] h-[40px] px-4 cursor-pointer hover:bg-selected flex items-center ${
              isSelected ? "bg-selected font-bold" : "bg-white"
            }`}
          >
            <span className="w-a whitespace-nowrap capitalize">{option}</span>
            {isSelected && (
              <span className="w-full whitespace-nowrap ml-2 text-ellipsis overflow-hidden capitalize">
                {svgs.Check}
              </span>
            )}
          </div>
        );
      });
    };

    const getOptionsLoader = () => {
      return (
        <div className=" h-full bg-white flex flex-col items-center text-arivalGray mt-[2px]">
          <div className="w-full h-[30px]">
            {typeAhead.loading ? (
              <>
                <div className="min-h-[3px] h-[3px]  max-h-[3px] overflow-hidden w-full  p-[0.5px]">
                  {typeAhead.loading && <SlimLoader />}
                </div>
                <span className="w-full flex justify-center">Fetching list...</span>
              </>
            ) : (
              <div
                onClick={() => fetchDropListData()}
                className=" h-full flex items-center px-2  w-full hover: bg-red-100 cursor-pointer "
              >
                <span className="w-full text-sm text-error">
                  Could not fetch list click here to try again
                </span>
                <span className="h-[10px] cursor-pointer text-red-900">
                  {svgs.Refresh}
                </span>
              </div>
            )}
          </div>
        </div>
      );
    };

    useEffect(() => {
      console.log(typeAhead.dropListData)
      if(typeAhead?.dropListData?.length) return
      dataSourceUrl  && fetchDropListData();
    }, []);

    return (
      <div className="w-full flex flex-col justify-start relative mt-[8px]">
        <label
          htmlFor={name}
          className="w-full text-white relative b-[30px] text-[18px]"
        >
          {label}
        </label>

        <div
          className={` ${className} ${
            disabled ? "bg-gray-100" : "bg-white"
          } h-[40px] flex flex-row items-center justify-between w-full border-[1px] outline-none cursor-pointer  relative`}
        >
          {/* *************************** Main Input element ****************/}
          <input
            id={name}
            ref={inputRef}
            onFocus={() => {
              inputRef.current?.select();
              openPanel();
            }}
            autoComplete="country"
            onInput={(e) => {
              const currentValue = (e.target as HTMLInputElement).value;
              isValid(currentValue)
                ? setSelected(currentValue)
                : setInputValue(currentValue);
            }}
            onBlur={(e) => onBlur(e)}
            className={` ${className} h-full p-3 capitalize w-full  rounded-[5px] outline-none `}
            type={type || "text"}
            placeholder={placeholder}
            name={name}
            value={typeAhead.inputVaue || ""}
            disabled={disabled}
          />

          {/* *************************** Error icon ****************/}
          <span className="pointer-events-none absolute right-1">
            {typeAhead.isPanelShowing ? (
              <>{svgs.ExpandLess}</>
            ) : (
              <>{svgs.ExpandMore}</>
            )}
          </span>
        </div>

        {/* *************************** Drop panel ****************/}
        {typeAhead.isPanelShowing && (
          <ClickAwayListener
            onClickAway={(e) => {
              if ((e.target as HTMLElement).id == name) return;
              closePanel();
            }}
          >
            {typeAhead.dropListData?.length ? (
              <div
                className={`w-full h-auto type-ahead animate-rise bg-white z-[20] max-h-[190px] overflow-y-auto shadow-md  flex flex-col absolute top-[74px] overflow-x-hidden text-ellipsis whitespace-nowrap ${dropContainerClassName}`}
              >
                {getOptions()}
              </div>
            ) : (
              getOptionsLoader()
            )}
          </ClickAwayListener>
        )}
      </div>
    );
  },
  (prevProps, nextProps) => {
    JSON.stringify(prevProps.stepData) === JSON.stringify(nextProps.stepData);
    return (
      JSON.stringify(prevProps.stepData) === JSON.stringify(nextProps.stepData)
    );
  }
);

export default TypeAhead;
