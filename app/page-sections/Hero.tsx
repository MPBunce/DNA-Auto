import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section
      className="relative h-[95vh] bg-cover bg-center text-white flex items-center px-8"
      style={{ backgroundImage: "url('/gwagon.jpg')" }} // Replace with actual image
    >
      <div className="max-w-2xl space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
          Your Premier <br />
          Destination for all <br />
          things Automotive
        </h1>
        <p className="text-sm sm:text-base">
          At DNA Autosource, we deliver top-notch automotive services tailored
          to your needs, dependable quality and reliability with every part and
          service we offer.
        </p>
        <div className="space-x-4">
          <Button>Get Started</Button>
          <Button variant="outline" className="text-black border-white hover:bg-white hover:text-black">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  )
}
