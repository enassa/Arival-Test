const FormWrapper = ({ data, children }) => {
  const { stepData, formTitle } = data;
  return (
    <div className="w-full flex justify-start h-full items-center flex-col pt-[1%] ">
      <div className="flex w-full mt-[3%] mb-[2%] justify-center items-center flex-col">
        <span className="text-[25px] md:text-arivalDark text-primary">{formTitle}</span>
        <span className="text-[20px] text-primary md:flex hidden">{stepData?.title}</span>
      </div>
      <div className="flex md:justify-start h-full md:items-start w-full  flex-col-reverse relative md:flex-row">
          {children}
      </div>
    </div>
  );
};
export default FormWrapper;
