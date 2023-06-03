import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { i18n } from './i18n-config';

import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales
  return matchLocale(languages, locales, i18n.defaultLocale)
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const currentLang = pathname.substring(1, 3);
  const storedLang = request.cookies.get('next13-lang');
  const storedMode = request.cookies.get('next13-mode');

  const response = NextResponse.next();

  if (!storedLang) {
    response.cookies.set({
      name: 'next13-lang',
      value: i18n.defaultLocale,
      path: '/',
    });
    // YOU MUST RETURN THE RESPONSE FOR CLIENT TO SET THE COOKIE...
    return response;
  } else {
    if (currentLang !== storedLang.value) {
      const newPathname = new URL(`/${storedLang.value}/${pathname.substring(3)}`, request.url);
      return NextResponse.redirect(newPathname)
    }
  }

  if (!storedMode) {
    response.cookies.set({
      name: 'next13-mode',
      value: 'light',
      path: '/',
    });
    // YOU MUST RETURN THE RESPONSE FOR CLIENT TO SET THE COOKIE...
    return response;
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(new URL(`/${locale}/${pathname}`, request.url))
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}