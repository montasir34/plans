"use server";

import { cookies } from "next/headers";
import { prisma } from "../db";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function showNotification(
  id: string,
  planId: string,
  role: Role
) {
  try {
    cookies().delete("plan");
    cookies().delete("planAction");
    await prisma.notification.update({
      where: {
        id,
      },
      data: {
        showed: true,
      },
    });
    const plan = await prisma.plan.findFirst({
      where: {
        id: planId,
      },
      include: {
        reviews: true,
      },
    });
    cookies().set({
      name: "planAction",
      value: JSON.stringify(plan),
      httpOnly: true,
      maxAge: 60 * 60,
    });
  } catch (error) {
    throw new Error(`${(error as Error).message}`);
  }
  const redirection =
    role === "MANAGER"
      ? "/main/create-plan/descision"
      : role === "SUPERVISOR"
      ? "/main/create-plan/evaluation"
      : "";
  redirect(redirection);
}
