import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Custom logic can be added here
    console.log("Middleware running for:", req.nextUrl.pathname);
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Only allow if token exists
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"], // Protect these routes
};
