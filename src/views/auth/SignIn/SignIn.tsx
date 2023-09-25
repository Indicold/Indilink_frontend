/**
 * The SignIn component renders a SignInForm component with a heading.
 * @returns The SignIn component is returning a JSX fragment. Inside the fragment, there is a div
 * element with the class "mb-8" and a h4 element with the classes "mb-1 text-center text-head-title".
 * Below that, the SignInForm component is rendered with the prop disableSubmit set to false.
 */
import SignInForm from './SignInForm'

const SignIn = () => {
    return (
        <>
            <div className="mb-8">
                <img className="lg:w-[130px] mt-4 md:w-3/6 w-5/6 mb-4 object-cover object-center rounded-[3%] " alt="hero" src="./img/images/logimg.png" />
                <h4 className="mb-1 text-head-title">Login!</h4>
            </div>
            <SignInForm disableSubmit={false} />
        </>
    )
}

export default SignIn
