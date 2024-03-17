import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseReqResClient } from "./lib/supabase/server-client";

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createSupabaseReqResClient(request, response);

    const {
        data: { session },
    } = await supabase.auth.getSession();

    const user = session?.user;

    return response;
}
