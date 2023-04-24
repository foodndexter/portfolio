import { Layout, Processing, Splash } from "@/components"
import { AuthProvider, PopupProvider, useAuth } from "@/context"
import { globalStyle } from "@/modules"
import type { AppProps } from "next/app"
import { PropsWithChildren } from "react"
import { QueryClient, QueryClientProvider } from "react-query"

export default function App({ Component, pageProps }: AppProps) {
  globalStyle()

  const { isProcessing } = useAuth()
  return (
    <Providers>
      <Splash>
        <Processing state={isProcessing}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
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
