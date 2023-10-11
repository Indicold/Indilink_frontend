/**
 * The SignUp component renders a sign-up form with a title.
 * @returns The SignUp component is returning a JSX fragment that contains a div with a heading and a
 * SignUpForm component.
 */
import SignUpForm from './SignUpForm'

const SignUp = () => {
    return (
        <div className='w-80 mt-[50px] lg:-mt-[50px] lg:w-full'>
            <div className="mb-4 "> 
                <img className="lg:w-[130px] mt-4 md:w-[25%] w-[140px] mb-4 object-cover object-center rounded-[3%]" alt="hero" src="./img/images/logimg.png" />
                <h4 className="font-bold sm:text-head-title">Sign Up!</h4>
            </div>
            <SignUpForm disableSubmit={false} />
        </div>
    )
}

export default SignUp
