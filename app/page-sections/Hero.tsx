import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section
      className="relative h-[100svh] md:h-[95vh] bg-cover bg-center text-white flex items-center px-4 sm:px-6 md:px-8"
      style={{ backgroundImage: "url('/gwagon.jpg')" }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="relative max-w-2xl space-y-4 md:space-y-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Your Premier <br />
          Destination for all <br />
          things Automotive
        </h1>
        <p className="text-sm sm:text-base md:text-lg max-w-xl">
          At DNA Autosource, we deliver top-notch automotive services tailored
          to your needs, dependable quality and reliability with every part and
          service we offer.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
          <Button className="w-full sm:w-auto">
            <Link href="/#services">Learn More</Link>
          </Button>
          <Button 
            variant="outline" 
            className="w-full sm:w-auto text-black border-white hover:bg-white hover:text-black"
          >
            <Link href="/#footer">Contact</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}