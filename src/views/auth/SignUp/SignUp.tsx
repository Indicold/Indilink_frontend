import SignUpForm from './SignUpForm'

const SignUp = () => {
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1 text-[#0f3492]">Sign Up</h3>
                <p className='text-[#0f3492]'>And lets get started with your free trial</p>
            </div>
            <SignUpForm disableSubmit={false} />
        </>
    )
}

export default SignUp
