import { HttpResponse, http } from "msw"
import { IGetProfileResponse } from "../getProfille"


export const getProfileMock = http.get<never, never, IGetProfileResponse>("/me", async() => {
 return HttpResponse.json({
  id: "1",
  name: "Jose Almeida",
  email: "josefr.almeidaads@gmail.com",
  phone: "(32) 998509807",
  role: "manager",
  createdAt: new Date(),
  updatedAt: null
 })
})