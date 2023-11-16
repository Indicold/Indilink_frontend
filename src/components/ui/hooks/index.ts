/* These lines of code are importing various custom hooks from different files. Each import statement
is importing a specific hook from a file with a corresponding name. These hooks are then used in the
`hooks` object, which is exported as the default export of this module. */
import useCallbackRef from './useCallbackRef'
import useColorLevel from './useColorLevel'
import useControllableState from './useControllableState'
import useDidUpdate from './useDidUpdate'
import useMergeRef from './useMergeRef'
import useRootClose from './useRootClose'
import useTimeout from './useTimeout'
import useUncertainRef from './useUncertainRef'
import useUniqueId from './useUniqueId'
import useWindowSize from './useWindowSize'

/* The `const hooks` declaration is creating an object called `hooks` that contains references to
various custom hooks imported from different files. Each key in the object corresponds to the name
of the imported hook, and the value is the reference to that hook. This object is then exported as
the default export of the module. */
const hooks = {
    useCallbackRef,
    useColorLevel,
    useControllableState,
    useDidUpdate,
    useMergeRef,
    useRootClose,
    useTimeout,
    useUncertainRef,
    useUniqueId,
    useWindowSize,
}

/* `export default hooks` is exporting the `hooks` object as the default export of the module. This
means that when another module imports this module, they can access the `hooks` object directly
without needing to specify its name. For example, if another module imports this module like this:
`import hooks from './hooks'`, they can then access the `hooks` object like this:
`hooks.useCallbackRef`. */
export default hooks
