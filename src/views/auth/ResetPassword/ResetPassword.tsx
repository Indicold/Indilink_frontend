/**
 * This is a React component that renders a ResetPasswordForm component with the disableSubmit prop set
 * to false.
 * @returns The ResetPassword component is returning the ResetPasswordForm component with the
 * disableSubmit prop set to false.
 */
import ResetPasswordForm from './ResetPasswordForm'

const ResetPassword = () => {
    return <ResetPasswordForm disableSubmit={false} />
}

export default ResetPassword
