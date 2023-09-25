/**
 * The LoginWithOTP component renders a form for logging in with a one-time password.
 * @returns The LoginWithOTP component is being returned. It consists of a div with a heading and the
 * LoginWithOTPForm component.
 */
import LoginWithOTPForm from './LoginWithOTPFrom'

const LoginWithOTP = () => {
    return (
        <>
            <div className="mb-8">
                <h4 className="mb-1 text-head-title">Login!</h4>
            </div>
            <LoginWithOTPForm disableSubmit={false} />
        </>
    )
}

export default LoginWithOTP
