import { NextRequest, NextResponse } from "next/server";

import { API_ROUTES } from "@/constants";
import { httpClient } from "@/lib";
import { AxiosErrorResponseType } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    const response = await httpClient.post(
      API_ROUTES.AUTH.FORGOT_PASSWORD.OTP_CHECK,
      payload
    );

    return NextResponse.json(response.data);
  } catch (error) {
    const errorResponse = error as AxiosErrorResponseType;

    const status = errorResponse?.response?.status || 500;
    const errorData = errorResponse?.response?.data;

    return NextResponse.json(errorData, { status });
  }
}
