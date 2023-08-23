import MultiStep from 'react-multistep'
import Step1 from '../MultistepForm/Step1'
import Step2 from '../Step2'
const NewMultistep = () => {
    return (
        <div className='multistep-form lg:w-[550px]'>
            <MultiStep activeStep={0} prevButton={{}}>
                <Step1 title={<label className='text-label-title'>Basic Details</label>} />
                <Step2 title={<label className='text-label-title'>Infra Details</label>} />
            </MultiStep>
        </div>
    )
}

export default NewMultistep;