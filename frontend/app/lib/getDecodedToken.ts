import { jwtDecode, JwtPayload } from "jwt-decode";

interface newJwtPayLoad extends JwtPayload {
  id: string;
  email: string;
}

const token =
  typeof window !== "undefined" && localStorage.getItem("AccessToken");
console.log(token);

if (!token) {
  window.location.href = "/auth/login";
}

export const decoded: newJwtPayLoad = jwtDecode(token as string);
