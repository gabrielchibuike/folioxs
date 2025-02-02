import { jwtDecode, JwtPayload } from "jwt-decode";

interface newJwtPayLoad extends JwtPayload {
  id: string;
  email: string;
}

const token =
  (typeof window !== "undefined" && localStorage.getItem("AccessToken")) ||
  "token";
console.log(token);

if (!token) {
  if (typeof window !== "undefined") window.location.href = "/auth/login";
}

export const decoded: newJwtPayLoad = jwtDecode(token as string);
