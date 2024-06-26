import { api } from "@/lib/axios"

interface IUpdateProfileBody {
 name: string;
 description: string | null;
}

export const updateProfile = async({ description, name }: IUpdateProfileBody) => {
 await api.put("/profile", { name, description })
}