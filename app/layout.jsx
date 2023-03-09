import Header from './header'
import Footer from './footer'
import './css/variables.css'
import './css/base.css'

export const metadata = {
  title: 'HeardleDupe',
  description: "A dupe of Spotify's music quiz Heardle",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <Header></Header>
          {children}
          <Footer></Footer>
        </div>
      </body>
    </html>
  )
}
