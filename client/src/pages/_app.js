import DefaultLayout from "@/components/layout/default-layout/index.js";
import "@/styles/index.scss";
import { useEffect } from "react";
import { AuthProviderJWT } from "@/hooks/use-auth-jwt";
import { LoadingProvider } from "@/contexts/LoadingContext";

function MyApp({ Component, pageProps }) {
  // 導入bootstrap的JS函式庫
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>);
  return (
    <>
      <AuthProviderJWT>
        <LoadingProvider>
          {getLayout(<Component {...pageProps} />)}
        </LoadingProvider>
      </AuthProviderJWT>
    </>
  );
}

export default MyApp;
