import { useState } from "react";
import Step1 from './Step1'
import Step2 from "../Step2";
import { Button } from "@/components/ui";

const MultistepForm = () => {
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