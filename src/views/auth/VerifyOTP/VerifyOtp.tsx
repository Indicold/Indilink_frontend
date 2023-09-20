/**
 * The VerfyOtp function renders the VerfyOtpForm component with the disableSubmit prop set to false.
 * @returns The VerfyOtp component is returning the VerfyOtpForm component with the disableSubmit prop
 * set to false.
 */
import VerfyOtpForm from "./VerifyOtpForm"
const VerfyOtp = () => {
    return <VerfyOtpForm disableSubmit={false} />
}

export default VerfyOtp
