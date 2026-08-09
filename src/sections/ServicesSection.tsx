import FadeIn from "../components/FadeIn";

const SERVICES = [
  {
    number: "01",
    name: "App Design & Development",
    description:
      "End-to-end product work -- from first sketch to shipped app -- so the product that launches matches the one you imagined.",
  },
  {
    number: "02",
    name: "Cross-Platform Engineering",
    description:
      "One shared Kotlin Multiplatform codebase powering native Android and iOS apps, instead of building and maintaining two.",
  },
  {
    number: "03",
    name: "API & Backend Integration",
    description:
      "Connecting apps to REST APIs, third-party services, and cloud backends with reliable, well-tested data layers.",
  },
  {
    number: "04",
    name: "App Store Launch & Maintenance",
    description:
      "Play Console and App Store submissions, version updates, and steady iteration after launch -- not just a handoff.",
  },
  {
    number: "05",
    name: "UI/UX for Mobile",
    description:
      "Clean, native-feeling interfaces with attention to platform conventions, accessibility, and everyday usability.",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn>
        <h2
          className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Services
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {SERVICES.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1}>
            <div
              className="flex items-center gap-6 sm:gap-10 py-8 sm:py-10 md:py-12"
              style={{
                borderTop: i === 0 ? "none" : "1px solid rgba(12, 12, 12, 0.15)",
              }}
            >
              <span
                className="font-black text-[#0C0C0C] flex-none"
                style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
              >
                {service.number}
              </span>
              <div className="flex flex-col gap-2">
                <h3
                  className="font-medium uppercase text-[#0C0C0C]"
                  style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}
                >
                  {service.name}
                </h3>
                <p
                  className="font-light leading-relaxed max-w-2xl text-[#0C0C0C]"
                  style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)", opacity: 0.6 }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
