import { Processing, Splash } from "@/components"
import { AuthProvider, PopupProvider } from "@/context"
import { globalStyle } from "@/modules"
import type { AppProps } from "next/app"
import { PropsWithChildren } from "react"
import { QueryClient, QueryClientProvider } from "react-query"

export default function App({ Component, pageProps }: AppProps) {
  globalStyle()

  return (
    <Providers>
      <Splash>
        <Processing>
          <Component {...pageProps} />
        </Processing>
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
