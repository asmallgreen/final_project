import { useEffect } from 'react';
import DefaultLayout from '../components/layout/default-layout'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/_globals.scss';

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  }, [])
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
