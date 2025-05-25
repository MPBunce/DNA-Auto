import { Hero } from "./page-sections/Hero"
import Insta from "./page-sections/Insta"
import { Navbar } from "./page-sections/Navbar"
import { ServiceCard } from "./page-sections/ServiceCard"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ServiceCard />
      <Insta />
    </main>
  )
}
