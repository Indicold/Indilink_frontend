/* The code is importing the `combineReducers` function from the `@reduxjs/toolkit` library and the
`common` reducer and `CommonState` type from the `commonSlice` file. */
import { combineReducers } from '@reduxjs/toolkit'
import common, { CommonState } from './commonSlice'

/* The `combineReducers` function is used to combine multiple reducers into a single reducer function.
In this code, it is combining the `common` reducer into a single reducer called `reducer`. */
const reducer = combineReducers({
    common,
})

/**
 * The above type defines a state object that includes a property called "common" of type CommonState.
 * @property {CommonState} common - The `common` property is a state object of type `CommonState`.
 */
export type BaseState = {
    common: CommonState
}

/* The line `export * from './commonSlice'` is exporting all named exports from the `commonSlice` file.
This means that any named exports defined in the `commonSlice` file will be available for import
from the file where this line is used. */
export * from './commonSlice'

/* `export default reducer` is exporting the `reducer` as the default export of the file. This means
that when another file imports this file, they can import the default export without specifying its
name. For example, in another file, you can import the `reducer` like this: */
export default reducer
