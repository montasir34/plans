"use server";

import { Role } from "@prisma/client";
import { prisma } from "../db";

export default async function FetchNotification(role: Role, id: string) {
  try {
    let whereClause = {};

    if (role === "EMPLOYER") {
      whereClause = {
        userId: id,
        notification_type: "DESCISION",
      };
    } else if (role === "SUPERVISOR") {
      whereClause = {
        notification_type: "NEW_PLAN",
      };
    } else if (role === "MANAGER") {
      whereClause = {
        notification_type: "EVALUATE",
      };
    }

    const data = await prisma.notification.findMany({
      where: whereClause,
    });

    return data;
  } catch (error) {
    throw new Error(`Error fetching notifications: ${(error as Error).message}`);
  }
}
