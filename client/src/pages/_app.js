import DefaultLayout from '../component/layout/default-layout'
import 'bootstrap/dist/css/bootstrap.min.css'; // import bootstrap css  

// import '../styles/_globals.scss';
// import '../styles/_public.scss';
import '../styles/index.scss'
// import '../styles/_components.scss';

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
