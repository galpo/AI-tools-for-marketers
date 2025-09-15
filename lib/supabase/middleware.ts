import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  // Simply pass through all requests without authentication checks
  // This removes the redirect issue while keeping the app functional
  return NextResponse.next({
    request,
  })
}
