"use client"

import { useState } from "react";
import Image from "next/image";

type TabId = "parts" | "accessories" | "vehicles";

interface TabContent {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export function ServiceCard() {
  const [activeTab, setActiveTab] = useState<TabId>("parts");

  const tabs = [
    { id: "parts" as TabId, label: "Parts" },
    { id: "accessories" as TabId, label: "Accessories" },
    { id: "vehicles" as TabId, label: "Vehicles" },
  ];

  const tabContent: Record<TabId, TabContent> = {
    parts: {
      title: "Parts: Reviving your ride piece by piece",
      description:
        "Parts sourcing for all vehicle makes and models. Our differentiator is our commitment to sourcing the most elusive items, taking pride in achieving the impossible. We turn &apos;can&apos;t be done&apos; into reality, making your automotive dreams our mission.",
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&q=80",
      imageAlt: "Car engine parts and components"
    },
    accessories: {
      title: "Accessories: Elevate your rides identity",
      description:
        "Personalize your vehicle with unique accessories that reflect your style through our sourcing service. Discover distinctive accent pieces that set your ride apart, all at competitive prices and backed by our Price Beat Promise.",
      image: "https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?w=1200&q=80",
      imageAlt: "Covered McLaren supercar"
    },
    vehicles: {
      title: "Vehicles: Uncover your dream ride",
      description:
        "Search no more for your ideal vehicle. With a global reach, DNA Auto Source maintains a personalized local touch. You&apos;re not just a client, but a valued part of our automotive family, benefiting from our unwavering dedication to your satisfaction and competitive pricing.",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80",
      imageAlt: "Luxury sports car"
    },
  };

  return (
    <section id="services" className="bg-white">
      {/* Top Section - Tabs and Content with Image */}
      <div className="grid md:grid-cols-2 md:min-h-[50vh]">
        {/* Image Side - Left on desktop, Bottom on mobile */}
        <div className="relative h-96 md:h-full order-2 md:order-1">
          <Image
            src={tabContent[activeTab].image}
            alt={tabContent[activeTab].imageAlt}
            fill
            className="object-cover transition-opacity duration-300"
          />
        </div>

        {/* Text Content Side - Right on desktop, Top on mobile */}
        <div className="bg-white p-8 md:p-16 flex flex-col justify-center order-1 md:order-2">
          <h2 className="text-sm font-semibold text-gray-500 mb-2">Our Services</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Driven by Expertise, Precision in Every Strand
          </h3>
          <p className="text-gray-800 mb-8 leading-relaxed">
            At DNA Auto Source Inc., we take pride in being your ultimate source for all things
            automotive. Our expertise extends to three distinct areas, each tailored to cater to
            your specific needs and desires.
          </p>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-black text-white"
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-black">
              {tabContent[activeTab].title}
            </h4>
            <p className="text-gray-800 leading-relaxed">
              {tabContent[activeTab].description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}