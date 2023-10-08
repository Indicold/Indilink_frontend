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
                <img className="lg:w-[130px] mt-4 md:w-[25%] w-5/6 mb-4 object-cover object-center rounded-[3%]" alt="hero" src="./img/images/logimg.png" />
                <h4 className="mb-1 text-title">Basic Information!</h4>
                {/* <p>And lets get started with your free trial</p> */}
            </div>
            <BasicInformationForm disableSubmit={false} />
        </>
    )
}

export default BasicInformation;