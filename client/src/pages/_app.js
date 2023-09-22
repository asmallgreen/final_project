import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.scss'; // 全域的 SCSS 檔案

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp;