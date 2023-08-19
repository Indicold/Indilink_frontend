import BasicInformationForm from "./BasicInformationForm";

const BasicInformation = () => {
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1 text-center">Basic Information</h3>
                {/* <p>And lets get started with your free trial</p> */}
            </div>
            <BasicInformationForm disableSubmit={false} />
        </>
    )
}

export default BasicInformation;