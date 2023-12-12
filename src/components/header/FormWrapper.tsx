const FormWrapper = ({ data, children }) => {
  const { stepData, formTitle } = data;
  return (
    <div className="w-full flex justify-start h-full items-center flex-col animate-rise pt-[1%]">
      <div className="flex w-full mt-[3%] mb-[2%] justify-center items-center flex-col">
        <span className="text-[30px]">{formTitle}</span>
        <span className="text-[20px] text-primary">{stepData?.title}</span>
      </div>
      <div className="flex justify-start h-full items-start w-full relative">
        {children}
      </div>
    </div>
  );
};
export default FormWrapper;
