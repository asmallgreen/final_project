import DefaultLayout from "@/components/layout/default-layout/index.js";
import "@/styles/index.scss";
import { useEffect, useState } from "react";
import { AuthProviderJWT } from "@/hooks/use-auth-jwt";
import { ProductProvider } from "@/hooks/use-product-context";
import Loading from "@/components/loading";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // 導入bootstrap的JS函式庫
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
 
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    // 监听路由的变化
    const handleRouteChange = (url) => {
      setIsLoading(true);

      // 在两秒后将 isLoading 设置为 false
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);


  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>);
  return (
    <>
      <AuthProviderJWT>
        <ProductProvider>
        {isLoading && <Loading />}
        {getLayout(<Component {...pageProps} />)}
        </ProductProvider>
      </AuthProviderJWT>
    </>
  );
}

export default MyApp;



