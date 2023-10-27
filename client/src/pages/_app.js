import DefaultLayout from "@/components/layout/default-layout/index.js";
import "@/styles/index.scss";
import { useEffect, useState } from "react";
import { AuthProviderJWT } from "@/hooks/use-auth-jwt";

import { ParallaxProvider } from "react-scroll-parallax";
import Loading from "@/components/loading";
import { useRouter } from "next/router";
import FlareCursor from "@/components/mouse-icon2";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // 導入bootstrap的JS函式庫
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
 
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    const handleRouteChange = (url) => {
      setIsLoading(true);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      clearTimeout(loadingTimeout);
    };
  }, [router]);


  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>);
  // 修正 Next hydration 錯誤
  // 一定要在最後面
  // https://stackoverflow.com/questions/72673362/error-text-content-does-not-match-server-rendered-html
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }
  return (
    <>
      <ParallaxProvider>
        <AuthProviderJWT>
            <FlareCursor />
            {isLoading && <Loading />}
            {getLayout(<Component {...pageProps} />)}
        </AuthProviderJWT>
      </ParallaxProvider>
    </>
  );
}

export default MyApp;