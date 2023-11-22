/* The line `import Drawer from './Drawer'` is importing the default export from the file `Drawer.tsx`
or `Drawer.ts` in the same directory. The imported value is assigned to the variable `Drawer`, which
can then be used to access the exported functionality from the `Drawer` module. */
import Drawer from './Drawer'

/* The line `export type { DrawerProps } from './Drawer'` is exporting the type `DrawerProps` from the
file `Drawer.tsx` or `Drawer.ts` in the same directory. This allows other modules to import and use
the `DrawerProps` type. */
export type { DrawerProps } from './Drawer'

/* The line `export { Drawer }` is exporting the `Drawer` variable as a named export. This means that
other modules can import the `Drawer` variable by its name and use it in their code. */
export { Drawer }

/* The line `export default Drawer` is exporting the `Drawer` variable as the default export of the
module. This means that when other modules import this module, they can choose to import the default
export without specifying its name. For example, another module can import this module like this:
`import Drawer from './Drawer'`. */
export default Drawer
