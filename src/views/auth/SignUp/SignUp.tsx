import SignUpForm from './SignUpForm'

const SignUp = () => {
    return (
        <>
            <div className="mb-4">
                <h4 className="text-head-title text-center">Sign Up</h4>
            </div>
            <SignUpForm disableSubmit={false} />
        </>
    )
}

export default SignUp
