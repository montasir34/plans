"use server";

import { cookies } from "next/headers";

async function deleteCookie() {
  const cookieStore = cookies();
  console.log(cookieStore.get("plan")?.value);
  cookieStore.delete("plan");
  cookieStore.delete("planAction");
}

export default deleteCookie;
