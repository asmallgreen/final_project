import DefaultLayout from '@/components/layout/default-layout/index.js'
import '@/styles/index.scss';


function MyApp({ Component, pageProps }) {
  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>)
    return (
      <>
        {getLayout(<Component {...pageProps} />)}
      </>
    )
}

export default MyApp;
