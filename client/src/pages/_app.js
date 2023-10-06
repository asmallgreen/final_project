import DefaultLayout from '@/components/layout/default-layout/index.js'
import '@/styles/index.scss';
import { useEffect } from 'react';
import { AuthProviderJWT } from '@/hooks/use-auth-jwt'
import { CartProvider } from '@/hooks/use-cart';



function MyApp({ Component, pageProps }) {
  // 導入bootstrap的JS函式庫
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  }, [])


  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>)
  return (
    <>
      <AuthProviderJWT>
        <CartProvider>{getLayout(<Component {...pageProps} />)}</CartProvider>
      </AuthProviderJWT>
    </>
  )
}

export default MyApp;