import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { API_ROUTES } from "@/constants";
import { httpClient } from "@/lib";
import { AxiosErrorResponseType } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    const response = await httpClient.post(API_ROUTES.AUTH.LOGIN, payload);

    // set token into the cookies
    const cookieStore = await cookies();

    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);

    cookieStore.set({
      name: "token",
      value: response.data.auth.token,
      expires,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    const errorResponse = error as AxiosErrorResponseType;

    const status = errorResponse?.response?.status || 500;
    const errorData = errorResponse?.response?.data;

    return NextResponse.json(errorData, { status });
  }
}
