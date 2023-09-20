/**
 * The SignUp component renders a sign-up form with a title.
 * @returns The SignUp component is returning a JSX fragment that contains a div with a heading and a
 * SignUpForm component.
 */
import SignUpForm from './SignUpForm'

const SignUp = () => {
    return (
        <>
            <div className="mb-4">
                <h4 className="text-head-title text-center">Sign Up to Indicold</h4>
            </div>
            <SignUpForm disableSubmit={false} />
        </>
    )
}

export default SignUp
