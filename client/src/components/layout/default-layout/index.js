import Footer from './footer.js'
import Navbar from './navbar.js'
import Head from 'next/head'

export default function DefaultLayout({ title = '', children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <Navbar />
      <main>
        <div className="container">
          {children}
        </div>
      </main>
      <Footer />
    </>
  )
}
