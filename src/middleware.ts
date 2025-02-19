import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const { pathname } = req.nextUrl;

    if (pathname === '/login') {
        return NextResponse.next();
    }

    if (!token && pathname.startsWith('/api/')) {
        return new NextResponse(unauthorizedBody, unauthorizedInit);
    }

    if (!token) {
        const loginUrl = new URL('/login', req.url);
        loginUrl.searchParams.set('callbackUrl', req.nextUrl.toString());
        return NextResponse.redirect(loginUrl);
    }

    // Разрешаем доступ к страницам и API для авторизованных пользователей
    return NextResponse.next();
}

// Применяем middleware ко всем маршрутам
export const config = {
    matcher: ['/((?!api/auth|_next/static|_next/image).*)'], // Исключаем маршрут api/auth (для корректной работы next-auth)
};

const unauthorizedBody = JSON.stringify({
    error: 'Unauthorized',
    message: 'You must be logged in to access this resource.',
});
const unauthorizedInit = { status: 401, headers: { 'Content-Type': 'application/json' } };
