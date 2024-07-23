import { HttpResponse, http } from "msw"
import { IGetManagedRestaurantResponse } from "../getManagedRestaurant"


export const getManagedRestaurantMock = http.get<never, never, IGetManagedRestaurantResponse>("/managed-restaurant", async() => {
 return HttpResponse.json({
  id: "1",
  name: "Pizza Shop Almeida",
  description: "Pizza Almeida",
  managerId: "1",
  createdAt: new Date(),
  updatedAt: null
 })
})