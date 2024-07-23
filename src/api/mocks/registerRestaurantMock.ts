import { http, HttpResponse } from "msw"
import { IRegisterRestaurantBody } from "../registerRestaurant"

export const registerRestaurantMock = http.post<never, IRegisterRestaurantBody>("/restaurants", async({ request }) => {
 const { restaurantName } = await request.json()

 if(restaurantName === "Pizza Shop"){
  return new HttpResponse(null, {
   status: 200
  })
 }

 return new HttpResponse(null, { status: 400 })
})