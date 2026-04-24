import { cookies } from "next/headers";

export async function getJwtToken(): Promise<string> {
  const reqCookies = await cookies();
  const jwt = reqCookies.get("jwt-credential")?.value;
  return jwt || "";
}
