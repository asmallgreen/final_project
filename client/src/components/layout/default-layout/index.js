import Footer from "./footer.js";
import Navbar from "./navbar.js";
import Logobar from "./logobar.js";
import Head from "next/head";

export default function DefaultLayout({ title = "", children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width" />
      </Head>
      {/* <Router> */}
        <Logobar />
        <Navbar />
        <main>
          <div>{children}</div>
        </main>
        <Footer />
        {/* <Switch>
          <Route exact path="/" component={Product} /> 
          <Route path="/product" Component={Product} />
        </Switch>
      </Router> */}
    </>
  );
}