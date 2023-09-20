/**
 * This is a React component that renders a ForgotPasswordForm component with the disableSubmit prop
 * set to false.
 * @returns The `ForgotPassword` component is returning the `ForgotPasswordForm` component with the
 * `disableSubmit` prop set to `false`.
 */
import ForgotPasswordForm from './ForgotPasswordForm'

const ForgotPassword = () => {
    return <ForgotPasswordForm disableSubmit={false} />
}

export default ForgotPassword
