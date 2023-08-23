import SignInForm from './SignInForm'

const SignIn = () => {
    return (
        <>
            <div className="mb-8">
                <h4 className="mb-1 text-center text-head-title">Login to Indicold</h4>
            </div>
            <SignInForm disableSubmit={false} />
        </>
    )
}

export default SignIn
