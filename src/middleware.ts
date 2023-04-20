import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/api/entries/')) {
    const id = req.nextUrl.pathname.replace('/api/entries/', '');
    const check = mongoose.Types.ObjectId.isValid(id);
    if (!check) {
      const url = new URL('/api/bad-request', req.url);
      url.search = `?message=${id} is not valid`;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/api/entries/:path*'],
};
