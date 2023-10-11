/**
 * The LoginWithOTP component renders a form for logging in with a one-time password.
 * @returns The LoginWithOTP component is being returned. It consists of a div with a heading and the
 * LoginWithOTPForm component.
 */
import LoginWithOTPForm from './LoginWithOTPFrom'

const LoginWithOTP = () => {
    return (
        <div className='w-80 -mt-[220px] sm:-mt-[150px] lg:-mt-[150px]  md:w-96  md:m-auto'>
            <div className="mb-8">
                <img className="lg:w-[130px] mt-4 md:w-[25%] w-3/6 mb-4 object-cover object-center rounded-[3%]" alt="hero" src="./img/images/logimg.png" />
                <h4 className="mb-1 text-head-title">Login!</h4>
            </div>
            <LoginWithOTPForm disableSubmit={false} />
        </div>
    )
}

export default LoginWithOTP
