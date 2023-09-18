import LoginWithOTPForm from './LoginWithOTPFrom'

const LoginWithOTP = () => {
    return (
        <>
            <div className="mb-8">
                <h4 className="mb-1 text-center text-head-title">Login to Indicold</h4>
            </div>
            <LoginWithOTPForm disableSubmit={false} />
        </>
    )
}

export default LoginWithOTP
