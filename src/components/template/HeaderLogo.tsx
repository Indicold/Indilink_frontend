/* The code is importing two modules: `Logo` from the `@/components/template/Logo` file and
`useAppSelector` from the `@/store` file. */
import Logo from '@/components/template/Logo'
import { useAppSelector } from '@/store'

/* The code is defining a functional component called `HeaderLogo`. Inside the component, it is using
the `useAppSelector` hook from the `@/store` module to access the `mode` property from the `theme`
slice of the Redux store. */
const HeaderLogo = () => {
    /* `const mode = useAppSelector((state) => state.theme.mode)` is using the `useAppSelector` hook to
    access the `mode` property from the `theme` slice of the Redux store. It is retrieving the
    current value of the `mode` property from the Redux store's state. */
    const mode = useAppSelector((state) => state.theme.mode)

    return <Logo mode={mode} className="hidden md:block" />
}

export default HeaderLogo
