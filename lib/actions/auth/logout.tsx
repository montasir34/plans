'use server'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
    const cookiesStore = cookies();
    cookiesStore.delete("token");
    cookiesStore.delete("plan");
    //and other cookies like plan
    redirect("/");
}
