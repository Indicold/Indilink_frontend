/**
 * The SignIn component renders a SignInForm component with a heading.
 * @returns The SignIn component is returning a JSX fragment. Inside the fragment, there is a div
 * element with the class "mb-8" and a h4 element with the classes "mb-1 text-center text-head-title".
 * Below that, the SignInForm component is rendered with the prop disableSubmit set to false.
 */
import SignInForm from './SignInForm'

const SignIn = () => {
    return (
        <div className='w-80 -mt-[140px] sm:-mt-[140px] lg:-mt-[140px] md:w-96 md:m-auto'>
            <div className="mb-8 md:m-auto">
              
                
                <img className="w-[140px] lg:w-[130px] mt-4 md:w-3/6 mb-4 object-cover object-center rounded-[3%] " alt="hero" src="./img/images/logimg.png" />
                <h4 className=" font-bold text-xl mb-1/2 sm:text-head-title md:text-head-title lg:text-head-title xl:text-head-title">Login!</h4>
                {/*  */}
            </div>
            
            <SignInForm disableSubmit={false} />
        </div>
    )
}

export default SignIn
