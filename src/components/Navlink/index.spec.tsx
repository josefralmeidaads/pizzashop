import { render } from "@testing-library/react"
import Navlink from "."
import { MemoryRouter } from "react-router-dom"

describe("Navlink", () => {
 it("Should highlight the nav link when is the current page link", () => {
  const wrapper = render(
   <>
    <Navlink to="/about">About</Navlink>
    <Navlink to="/home">Home</Navlink>
   </>, {
   wrapper: ({ children }) => {
    return (
     <MemoryRouter initialEntries={['/about']}>
      {children}
     </MemoryRouter>
    )
   }
  })

  wrapper.debug()

  expect(wrapper.getByText('About').dataset.current).toEqual("true");
  expect(wrapper.getByText('Home').dataset.current).toEqual("false");
 })
})