import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="w-full">
      {/* Section 1: Text + Image */}
      <div className="grid md:grid-cols-2">
        {/* Text Side */}
        <div className="bg-white flex items-center justify-center p-8 md:p-16">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
              About Us
            </h1>
            <p className="text-gray-800 leading-relaxed text-lg">
              Welcome to DNA Auto Source Inc., your premier destination for all things automotive. Established in 2023, our roots in the industry stretch back over a decade, making us a trusted name in the world of vehicles, parts, and accessories. As a proud Canadian business, we&apos;ve managed to transcend borders and serve customers across the globe.
            </p>
          </div>
        </div>

        {/* Image Side */}
        <div className="relative h-96 md:h-[32rem]">
          <Image
            src="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1200&q=80"
            alt="White Mercedes coupe"
            fill
            className="object-cover"
          />
        </div>
      </div>

    </section>
  );
}