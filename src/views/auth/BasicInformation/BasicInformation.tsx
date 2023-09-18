/**
 * The BasicInformation component renders a form for collecting basic information.
 * @returns The BasicInformation component is returning JSX elements. It includes a div with a heading
 * and a BasicInformationForm component.
 */
import BasicInformationForm from "./BasicInformationForm";

const BasicInformation = () => {
    return (
        <>
            <div className="mb-8">
                <h4 className="mb-1 text-center text-[#0f3492]">Basic Information</h4>
                {/* <p>And lets get started with your free trial</p> */}
            </div>
            <BasicInformationForm disableSubmit={false} />
        </>
    )
}

export default BasicInformation;