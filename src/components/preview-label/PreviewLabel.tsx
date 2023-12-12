import { memo } from 'react';
import { FormPreviewLabelComponent } from '../../library/multi-step-form/config/form-types';

const  PreviewLabel: FormPreviewLabelComponent =  memo(({data}) => {
  const {value, label} = data
  return (
    <div className='flex justify-between item-center p-3 m-2 rounded-md text-blue-900 w-full'>
        <label className='text-arivalGray max-w-[30%]  text-ellipsis text-start'>{label}</label>
        <label className='text-white  w-[70%] whitespace-pre-wrap text-ellipsis overflow-hidden text-end'>{value}</label>
    </div>
  )
})
export default PreviewLabel
