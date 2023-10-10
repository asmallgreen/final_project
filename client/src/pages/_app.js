import DefaultLayout from '@/components/layout/default-layout/index.js'
import '@/styles/index.scss';
import { useEffect } from 'react';
import { AuthProviderJWT } from '@/hooks/use-auth-jwt'




function MyApp({ Component, pageProps }) {
    // 導入bootstrap的JS函式庫
    useEffect(() => {
      import('bootstrap/dist/js/bootstrap')
    }, [])
  

  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>)
    return (
      <>
    <AuthProviderJWT>
      {getLayout(<Component {...pageProps} />)}
    </AuthProviderJWT>
      </>
    )
}

export default MyApp;

// import DefaultLayout from '@/components/layout/default-layout/index.js';
// import '@/styles/index.scss';
// import { useEffect } from 'react';
// import { AuthProviderJWT } from '@/hooks/use-auth-jwt';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'; // 引入 React Router

// function MyApp({ Component, pageProps }) {
//   // 導入bootstrap的JS函式庫
//   useEffect(() => {
//     import('bootstrap/dist/js/bootstrap');
//   }, []);

//   const getLayout =
//     Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>);

//   return (
//     <>
//       <AuthProviderJWT>
//         {/* 將整個應用包裹在 Router 中 */}
//         <Router>
//           <div>
//             <nav>
//               <ul>
//                 <li>
//                   <Link to="/">首頁</Link>
//                 </li>
//                 <li>
//                   <Link to="/reserve">預訂</Link>
//                 </li>
//               </ul>
//             </nav>

//             {/* 設定路由 */}
//             <Route
//               path="/"
//               exact
//               render={() => (
//                 // 在這裡放置日期選擇器組件
//                 <div>
//                   <Component {...pageProps} />
//                 </div>
//               )}
//             />

//             <Route
//               path="/reserve"
//               render={() => (
//                 // 在這裡顯示 "reserve.js" 頁面並傳遞所選日期
//                 <Component {...pageProps} />
//               )}
//             />
//           </div>
//         </Router>
//       </AuthProviderJWT>
//     </>
//   );
// }

// export default MyApp;