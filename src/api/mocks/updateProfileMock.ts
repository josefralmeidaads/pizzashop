import { HttpResponse, http } from "msw"
import { IUpdateProfileBody } from "../updateProfile"


export const updateProfileMock = http.put<never, IUpdateProfileBody>("/profile", async({ request }) => {
 const { name } = await request.json()
 
 if(name === "Pizza Shop Schell"){
  return new HttpResponse(null, { status: 204 })
 }

 return new HttpResponse(null, { status: 400 })
})