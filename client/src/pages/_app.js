import DefaultLayout from '@/components/layout/default-layout/index.js'
import '@/styles/index.scss';

// 註冊fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(fab, fas, far);

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