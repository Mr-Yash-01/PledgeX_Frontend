import { NextResponse } from "next/server";

// Paths that do NOT require authentication
const PUBLIC_PATHS = ["/signin", "/signup"];

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Allow public pages to be accessed freely
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // Get token from cookies
  const token = req.cookies.get("token")?.value;
  console.log("Token:", token);

  // If no token, redirect to signin **only if not already on /signin**
  if (!token) {
    if (pathname !== "/signin") {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
    return NextResponse.next();
  }

  try {
    // Verify token by sending it to backend API
    const response = await fetch("http://localhost:4000/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    // If verification fails, remove token and redirect to /signin
    if (!response.ok) {
      console.error("Token verification failed");
      const res = NextResponse.redirect(new URL("/signin", req.url));
      res.cookies.set("token", "", { path: "/", maxAge: 0 });
      return res;
    }

    // Get user data from response
    const data = await response.json();
    console.log("User Data:", data);

    // Redirect user based on role **only if not already on correct dashboard**
    if (data.role === "Clients" && pathname !== "/dashboard/c") {
      return NextResponse.redirect(new URL("/dashboard/c", req.url));
    } else if (data.role === "Freelancers" && pathname !== "/dashboard/f") {
      return NextResponse.redirect(new URL("/dashboard/f", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error verifying token:", error);

    // If verification request fails, remove token and redirect
    const res = NextResponse.redirect(new URL("/signin", req.url));
    res.cookies.set("token", "", { path: "/", maxAge: 0 });
    return res;
  }
}

export const config = {
  matcher: "/dashboard/:path*",
};

