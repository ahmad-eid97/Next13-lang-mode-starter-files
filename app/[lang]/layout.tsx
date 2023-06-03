// NEXT STUFF
import { cookies } from 'next/headers';
// STORE STUFF
import { StoreProvider } from "store/provider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const Cookies = cookies();

  return (
    <html id={`${Cookies.get('next13-lang')?.value || 'en'}`}>
      <body className={`${Cookies.get('next13-mode')?.value || 'light'}`}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}
