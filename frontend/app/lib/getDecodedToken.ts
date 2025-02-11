import { jwtDecode, JwtPayload } from "jwt-decode";

interface NewJwtPayload extends JwtPayload {
  id: string;
  email: string;
}

// Function to get and decode token safely
export function getDecodedToken(): NewJwtPayload | null {
  if (typeof window === "undefined") return null; // Ensure client-side execution

  const token = localStorage.getItem("AccessToken");

  if (!token) {
    window.location.href = "/auth/login"; // Redirect if no token
    return null;
  }

  try {
    return jwtDecode<NewJwtPayload>(token);
  } catch (error) {
    console.error("Invalid token:", error);
    window.location.href = "/auth/login"; // Redirect on invalid token
    return null;
  }
}

// Usage Example
export const decoded = getDecodedToken();
