import { http, HttpResponse } from "msw"
import { ISignInBody } from "../signIn"

export const sigInMock = http.post<never, ISignInBody>("/authenticate", async({ request }) => {
 const { email } = await request.json()

 if(email === "diego.schell.f@gmail.com"){
  return new HttpResponse(null, {
   status: 200,
   headers: {
    'Set-Cookie': "auth=sample-jwt"
   }
  })
 }

 return new HttpResponse(null, { status: 401 })
})