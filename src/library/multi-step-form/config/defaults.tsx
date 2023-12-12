import { memo } from 'react';
import { ReactNode } from 'react';
import { FormButtonComponent, FormPreviewLabelComponent, FormPreviewWrapperComponent } from './form-types';


export const DefaultPreviewpWrapper: FormPreviewWrapperComponent = memo(
    ({ children }) => (
      <div className="w-full flex flex-col">{children}</div>
    )
);

export const DefaultPreviewLabel: FormPreviewLabelComponent = memo(
    ({ children }) => (
      <div className="w-full flex flex-col">{children}</div>
    )
);

export const DefaultStepWrapper: React.FC<{ children: ReactNode }> = memo(
    ({ children }) => (
      <div className="w-full flex flex-col">{children}</div>
    )
);

export const DefaultButton:FormButtonComponent = memo(({data, onSubmit}) => {
    const {disabled} = data
    const handleSubmit = (e) => {
      onSubmit(e)
    }
    return (
      <button disabled={disabled} className='bg-blue-500 p-2' onClick={(e) => {
          e.stopPropagation();
          handleSubmit(e)
      }}>Submit</button>
    )
  })
  