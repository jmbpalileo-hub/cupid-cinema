import Nav from './components/Nav.jsx'
import Inquire from './components/Inquire.jsx'
import { Hero, Intro, Statement, Films, Approach, Packages, KindWords, Strip, Faq, Footer } from './components/Sections.jsx'
import { useReveal } from './components/ui.jsx'

export default function App() {
  useReveal()
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Intro />
        <Statement />
        <Films />
        <Approach />
        <Packages />
        <KindWords />
        <Strip />
        <Faq />
        <Inquire />
      </main>
      <Footer />
    </>
  )
}
