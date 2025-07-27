import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { verifyToken } from './app/lib/jwt';

const PUBLIC_PATHS = ['/api/auth', '/api/health'];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (request.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 204 });
    addCORSHeaders(response);
    return response;
  }

  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    const response = NextResponse.next();
    addCORSHeaders(response);
    return response;
  }

  const token = request.cookies.get('token')?.value;

  if(!token) {
    const response =  NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    addCORSHeaders(response);
    return response;
  }

  try {
    const decoded = await verifyToken(token);

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', decoded.id);

    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });
    addCORSHeaders(response);
    return response;
  } catch (error) {
    console.log(err);
    const response = NextResponse.json({ message: 'Unauthorized: Invalid token' }, { status: 401 });
    addCORSHeaders(response);
    return response;
  }
}

function addCORSHeaders(response) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

export const config = {
  matcher: ['/api/:path*'],
};
