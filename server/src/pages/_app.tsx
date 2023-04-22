import { Splash } from "@/components"
import { AuthProvider, PopupProvider, useAuth } from "@/context"
import { globalStyle } from "@/modules"
import type { AppProps } from "next/app"
import { PropsWithChildren, useCallback, useEffect, useState } from "react"
import { QueryClient, QueryClientProvider } from "react-query"

export default function App({ Component, pageProps }: AppProps) {
  globalStyle()
  return (
    <Providers>
      <Splash>
        <Component {...pageProps} />
      </Splash>
    </Providers>
  )
}

function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <PopupProvider>
        <AuthProvider>{children}</AuthProvider>
      </PopupProvider>
    </QueryClientProvider>
  )
}
