import DefaultLayout from '@/components/layout/default-layout/index.js'
import '@/styles/index.scss';

export default function MyApp({ Component, pageProps }) {
 
  // 使用預設排版檔案
  // 對應`components/layout/default-layout/index.js`(或components/layout/default-layout.js)
  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>)

  return (
    <>
      {getLayout(<Component {...pageProps} />)}
    </>
  )
}