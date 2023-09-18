import MultiStep from 'react-multistep'
import Step1 from '../MultistepForm/Step1'
import Step2 from '../Step2'
import Step3 from '../MultistepForm/Step3'
import Step4 from '../MultistepForm/Step4'
import Step5 from '../MultistepForm/Step5'
import Step6 from '../MultistepForm/Step6'
const NewMultistep = () => {
    return (
        <div className='multistep-form'>
            <MultiStep activeStep={0} prevButton={{}}>
                <Step1 title="Basic Details" />
                <Step2 title="Infra Details" />
                <Step3 title="Compliance Details" />
                <Step4 />
                <Step5 />
                <Step6 />
            </MultiStep>
        </div>
    )
}

export default NewMultistep;