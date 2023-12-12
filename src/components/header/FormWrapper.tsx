const FormWrapper = ({ data, children }) => {
  const { stepData, formTitle } = data;
  return (
    <div className="w-full flex justify-start h-full items-center flex-col animate-rise">
      <div className="flex w-full h-[20%]  justify-center items-center flex-col">
        <span className="text-[36px]">{formTitle}</span>
        <span className="text-[20px] text-primary">{stepData?.title}</span>
      </div>
      <div className="flex justify-center items-center w-full relative">
        {children}
      </div>
    </div>
  );
};
export default FormWrapper;
