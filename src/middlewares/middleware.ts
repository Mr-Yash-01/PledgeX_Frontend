import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const { pathname } = req.nextUrl;

    // Allow access to login page without redirection loop
    if (pathname === "/signin") {
        return NextResponse.next();
    }

    if (token) {
        console.log("Token found");
        
        try {
            const response = await fetch("http://localhost:4000/auth", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!response.ok) {
                // If token is invalid, redirect to signin
                return NextResponse.redirect(new URL("/signin", req.url));
            }

            return NextResponse.next();
        } catch (error) {
            console.error("Error fetching user:", error);
            return NextResponse.redirect(new URL("/signin", req.url));
        }
    }

    console.log("No token found");
    
    // If no token, redirect to signin
    return NextResponse.redirect(new URL("/signin", req.url));
}

// Apply middleware to all protected routes except public ones
export const config = {
    matcher: "/dashboard/:path*", // Apply middleware only to protected routes
};
