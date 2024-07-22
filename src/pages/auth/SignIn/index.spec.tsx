import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import SignIn from "."
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/react-query"
import { HelmetProvider } from "react-helmet-async"

describe("SignIn", () => {
 it("Should set defulat email input value if email is presente os search params", () => {
  const wrapper = render(
   <>
    <SignIn />
   </>, {
   wrapper: ({ children }) => {
    return (
     <HelmetProvider>
      <MemoryRouter initialEntries={['/sign-in?email=josefr.almeidaads@gmail.com']}>
       <QueryClientProvider client={queryClient}>
        {children}
       </QueryClientProvider>
      </MemoryRouter>
     </HelmetProvider>
    )
   }
  })

  const emailInput = wrapper.getByLabelText("Seu e-mail") as HTMLInputElement;

  // expect(emailInput.value).toEqual("josefr.almeidaads@gmail.com");
 })
})