"use server";

import { cookies } from "next/headers";

export const getTokenFromServer = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    return token?.value || "";

    // eslint-disable-next-line
  } catch (e) {
    return "";
  }
};
