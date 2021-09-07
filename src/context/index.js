/*
 * 'createContext' allows us to create a Context Provider to wrap multiple components in,
 * then we can pass multiple values, functions, or data to it and everything inside the provider
 * will have access to it all this data
 *
 * This allows us to avoid passing down data multple levels down, and makes for cleaner code.
 *
 * So we have something like this
 *
 * <Provider value={anyValue}>
 *  <Component1></Component1>
 *  <Component2>
 *    <Component3></Component3>
 *  </Component2>
 * </Provider>
 *
 *
 * Component3 will have access to 'value' without that value having to go through the parent -> Component2 -> Component3
 *
 * ... and so on
 */

import { createContext } from "react";

const TestContext = createContext({});
const TestProvider = TestContext.Provider;

export { TestContext, TestProvider };
