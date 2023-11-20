/* The code is importing the necessary dependencies and components for the MultistepForm component. */
import { useState } from "react";
import Step1 from './Step1'
import Step2 from "../Step2";
import { Button } from "@/components/ui";

/**
 * The `MultistepForm` component is a multi-step form that allows users to navigate between different
 * steps and update form data.
 * @returns The MultistepForm component is returning different JSX elements based on the value of the
 * "step" state variable. If the step is 1, it returns Step1 component along with previous and next
 * buttons. If the step is 2, it returns Step2 component along with previous and next buttons.
 */
const MultistepForm = () => {
    /* The code is using the `useState` hook from React to create two state variables: `step` and
    `formData`. */
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        coldStorageName: "",
        companyName: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        pin: ""
    });
    const [currentStep, setCurrentStep] = useState({});
    // if(step === 0) {
        // setCurrentStep(<Step1 formData={formData} setFormData={setFormData} />)
    // }
    // else if(step === 1) {
    //     setCurrentStep(<Step2 formData={formData} setFormData={setFormData} />)
    // }
    const handleNextStep = () => {
        if(step<2)setStep(step+1);
    }
    const handlePrevStep = () => {
        if(step>1)setStep(step-1);
    }
    switch(step) {
        case 1:
            return (
                <>
                    <Step1 formData={formData} setFormData={setFormData} />
                    <div className="flex">
                        <Button
                            block
                            variant="solid"
                            className='bg-[#ffb017] indigo-btn w-[40%] mx-auto rounded-[30px]'
                            onClick={handlePrevStep}
                        >
                            Previous
                        </Button>
                        <Button
                            block
                            variant="solid"
                            className='bg-[#ffb017] indigo-btn w-[40%] mx-auto rounded-[30px]'
                            onClick={handleNextStep}
                        >
                            Next
                        </Button>
                    </div>
                </>
            )
            case 2:
                return (
                    <>
                        <Step2 formData={formData} setFormData={setFormData} />
                        <div className="flex">
                            <Button
                                block
                                variant="solid"
                                className='signup-submit-btn mx-auto rounded-xl px-4 shadow-lg'
                                onClick={handlePrevStep}
                            >
                                Previous
                            </Button>
                            <Button
                                block
                                variant="solid"
                                className='signup-submit-btn mx-auto rounded-xl px-4 shadow-lg'
                                onClick={handleNextStep}
                            >
                                Next
                            </Button>
                        </div>
                    </>
                )
    }
}

export default MultistepForm;