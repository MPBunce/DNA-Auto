"use client"

import { Hero } from "./page-sections/Hero"
import Insta from "./page-sections/Insta"
import { Navbar } from "./page-sections/Navbar"
import { ServiceCard } from "./page-sections/ServiceCard"
import Footer from "./page-sections/Footer"
import About from "./page-sections/About"
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          const offset = 80; // Height of your navbar
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, []);

  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <ServiceCard />
      <Insta />
      <Footer />
    </main>
  )
}