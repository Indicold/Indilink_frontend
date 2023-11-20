/* The `import` statement is used to import modules or values from other files or modules. In this
case, it is importing the following values from the file `ConfigProvider`: */
import ConfigProvider, {
    ConfigContext,
    ConfigConsumer,
    useConfig,
    defaultConfig,
} from './ConfigProvider'

/* The statement `export type { Config } from './ConfigProvider'` is exporting the type `Config` from
the file `ConfigProvider`. This allows other files or modules to import and use the `Config` type. */
export type { Config } from './ConfigProvider'

/* The `export` statement is used to export values from a module. In this case, it is exporting the
following values: `ConfigProvider`, `ConfigContext`, `ConfigConsumer`, `useConfig`, and
`defaultConfig`. This allows other files or modules to import and use these values. */
export {
    ConfigProvider,
    ConfigContext,
    ConfigConsumer,
    useConfig,
    defaultConfig,
}

/* The statement `export default ConfigProvider` is exporting the `ConfigProvider` value as the default
export of the module. This means that when another file or module imports this module using the
`import` statement without specifying a name for the import, the `ConfigProvider` value will be
assigned to the default import. For example, in another file, you can import the default export like
this: `import ConfigProvider from './ConfigProvider'`. */
export default ConfigProvider
