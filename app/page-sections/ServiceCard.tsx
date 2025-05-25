import { Card, CardContent } from "@/components/ui/card"
import { FaTools, FaPaintBrush, FaCarSide } from "react-icons/fa"

export function ServiceCard() {
  const services = [
    {
      icon: <FaTools size={32} />,
      title: "Reviving your ride piece by piece",
      description: "Parts sourcing for all vehicle makes and models.",
    },
    {
      icon: <FaPaintBrush size={32} />,
      title: "Elevate your ride's identity",
      description: "Personalize your vehicle with unique accessories.",
    },
    {
      icon: <FaCarSide size={32} />,
      title: "Uncover your dream ride",
      description: "Search no more for your ideal vehicle.",
    },
  ]

  return (
    <section className="py-48 px-6 text-center bg-white">
      <h2 className="text-3xl font-bold mb-4">
        Driven by Expertise, Precision in Every Strand
      </h2>
      <p className="text-gray-600 max-w-3xl mx-auto mb-12">
        At DNA Auto Source, we take pride in being your ultimate source for all things automotive. Our expertise extends to three distinct areas, each tailored to cater to your specific needs and desires.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <Card key={index} className="text-left hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="">{service.icon}</div>
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="text-sm text-gray-600">{service.description}</p>
              <a href="#" className="text-sm font-medium inline-flex items-center">
                Learn More
                <span className="ml-1">→</span>
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
