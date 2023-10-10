import DefaultLayout from "@/components/layout/default-layout/index.js";
import "@/styles/index.scss";
import { useEffect } from "react";
import { AuthProviderJWT } from "@/hooks/use-auth-jwt";
import { ProductCartProvider } from "@/hooks/use-product-cart";
import { CourseCartProvider } from "@/hooks/use-course-cart";

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
        <ProductCartProvider>
          <CourseCartProvider>
            {getLayout(<Component {...pageProps} />)}
          </CourseCartProvider>
        </ProductCartProvider>
      </AuthProviderJWT>
    </>
  );
}

export default MyApp;
