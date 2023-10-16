import DefaultLayout from "@/components/layout/default-layout/index.js";
import "@/styles/index.scss";
import { useEffect, useState } from "react";
import { AuthProviderJWT } from "@/hooks/use-auth-jwt";
import { ProductProvider } from "@/hooks/use-product-context";
import Loading from "@/components/loading";

function MyApp({ Component, pageProps }) {
  // 導入bootstrap的JS函式庫
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
      console.log('loading component is loading');
    }, 3000)
  }, [])
  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>);
  return (
    <>
      <AuthProviderJWT>
        <ProductProvider>
        {isLoading ? 
        (<Loading/>):
        (getLayout(<Component {...pageProps} />))
        }
        </ProductProvider>
      </AuthProviderJWT>
    </>
  );
}

export default MyApp;
