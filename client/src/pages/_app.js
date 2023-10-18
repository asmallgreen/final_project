import DefaultLayout from "@/components/layout/default-layout/index.js";
import "@/styles/index.scss";
import { useEffect,useState } from "react";
import { AuthProviderJWT } from "@/hooks/use-auth-jwt";

function MyApp({ Component, pageProps }) {
  // 導入bootstrap的JS函式庫
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  }, [])


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
      <AuthProviderJWT>
        
          {getLayout(<Component {...pageProps} />)}
        
      </AuthProviderJWT>
    </>
  );
}

export default MyApp;