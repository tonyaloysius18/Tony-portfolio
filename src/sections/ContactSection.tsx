import {
  type ElementType,
  type FormEvent,
  type PointerEvent,
  useRef,
  useState,
} from "react";
import {
  AlertCircle,
  ArrowRight,
  ArrowUp,
  Check,
  LoaderCircle,
} from "lucide-react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import RevealHeading from "../components/RevealHeading";

const EMAIL = "ynotlabs.dev@gmail.com";
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${EMAIL}`;
const EASE = [0.16, 1, 0.3, 1] as const;

type SubmitState = "idle" | "sending" | "success" | "error";

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
      </svg>
  );
}

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.04-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.29 0 .32.22.7.83.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12Z" />
      </svg>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.24 2.22.4.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.35 1.05.4 2.22.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.8-.4 2.22-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.05.35-2.22.4-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.24-2.22-.4-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.35-1.05-.4-2.22-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.24-1.8.4-2.22.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.05-.35 2.22-.4 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.39C1.35 2.68.94 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.39 2.13.67.67 1.34 1.08 2.13 1.39.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.39.67-.67 1.08-1.34 1.39-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.87 5.87 0 0 0-1.39-2.13A5.87 5.87 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z" />
      </svg>
  );
}

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    icon: LinkedInIcon,
    href: "https://www.linkedin.com/in/tony-ajay-aloysius-70195a1a4",
  },
  {
    label: "GitHub",
    icon: GithubIcon,
    href: "https://github.com/tonyaloysius18",
  },
  {
    label: "Instagram",
    icon: InstagramIcon,
    href: "https://www.instagram.com/ynot.aloy/",
  },
];

const FIELD_CLASS =
    "w-full rounded-[14px] border border-[#D7E2EA]/22 bg-transparent px-5 py-4 text-sm text-[#D7E2EA] outline-none transition-[border-color,box-shadow,background-color] duration-500 placeholder:text-[#D7E2EA]/44 hover:border-[#D7E2EA]/34 focus:border-[#D7E2EA]/78 focus:bg-[#D7E2EA]/[0.018] focus:shadow-[0_0_0_1px_rgba(215,226,234,0.13),0_0_28px_rgba(135,145,175,0.07)] sm:px-6 sm:py-5";

function SocialLink({
                      label,
                      href,
                      icon: Icon,
                    }: {
  label: string;
  href: string;
  icon: ElementType;
}) {
  const isExternal = href.startsWith("http");

  return (
      <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer" : undefined}
          className="group relative inline-flex items-center gap-2.5 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#D7E2EA]/56 transition-colors duration-300 hover:text-[#D7E2EA] sm:text-xs"
      >
        <Icon size={18} />
        <span>{label}</span>
        <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[#D7E2EA]/72 transition-transform duration-500 ease-out group-hover:scale-x-100" />
      </a>
  );
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingVisible = useInView(sectionRef, {
    amount: 0.22,
    margin: "0px 0px -8% 0px",
    once: false,
  });
  const reduceMotion = Boolean(useReducedMotion());
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const resetSubmitState = () => {
    if (submitState !== "sending" && submitState !== "idle") {
      setSubmitState("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    setSubmitState("sending");
    setErrorMessage("");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("The message could not be sent.");
      }

      form.reset();
      setSubmitState("success");
    } catch {
      setSubmitState("error");
      setErrorMessage("Something went wrong. Please try again or email me directly.");
    }
  };

  const handleGlowMove = (event: PointerEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--glow-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--glow-y", `${event.clientY - bounds.top}px`);
  };

  const handleBackToTop = () => {
    window.dispatchEvent(new CustomEvent("portfolio:reset-scroll-animations"));
    const hero = document.querySelector<HTMLElement>("#hero, #home");

    if (hero) {
      hero.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    }

    window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent("portfolio:reset-scroll-animations"));
      window.dispatchEvent(new Event("scroll"));
    }, reduceMotion ? 0 : 900);
  };

  return (
      <section
          ref={sectionRef}
          id="contact"
          className="relative overflow-hidden border-t border-[#D7E2EA]/10 bg-[#080909] px-5 py-20 text-[#D7E2EA] sm:px-8 sm:py-24 md:px-10 lg:py-28"
      >
        <div className="pointer-events-none absolute left-[12%] top-[48%] h-64 w-64 rounded-full bg-[#A000FF]/[0.055] blur-[120px]" />
        <div className="pointer-events-none absolute right-[12%] top-[30%] h-72 w-72 rounded-full bg-[#4F74FF]/[0.04] blur-[130px]" />

        <div className="relative mx-auto max-w-[1500px]">
          <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:gap-16 xl:gap-24">
            <div style={{ containerType: "inline-size" }}>
              <div
                  role="heading"
                  aria-level={2}
                  className="relative z-10 lg:w-[calc(100%+5rem)] xl:w-[calc(100%+6rem)]"
              >
                {headingVisible ? (
                    <>
                      <RevealHeading
                          text="Let's build"
                          className="hero-heading whitespace-nowrap text-left !text-[clamp(2.65rem,12.5cqw,6.5rem)] font-black uppercase leading-none tracking-[0.03em]"
                      />
                      <RevealHeading
                          text="Something"
                          className="hero-heading whitespace-nowrap text-left !text-[clamp(2.65rem,12.5cqw,6.5rem)] font-black uppercase leading-none tracking-[0.03em]"
                      />
                      <RevealHeading
                          text="Useful."
                          className="hero-heading whitespace-nowrap text-left !text-[clamp(2.65rem,12.5cqw,6.5rem)] font-black uppercase leading-none tracking-[0.03em]"
                      />
                    </>
                ) : (
                    <div
                        aria-hidden="true"
                        className="hero-heading invisible whitespace-nowrap text-left !text-[clamp(2.65rem,12.5cqw,6.5rem)] font-black uppercase leading-none tracking-[0.03em]"
                    >
                      <span className="block">Let&apos;s build</span>
                      <span className="block">Something</span>
                      <span className="block">Useful.</span>
                    </div>
                )}
              </div>

              <motion.p
                  initial={false}
                  animate={headingVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
                  transition={{ duration: reduceMotion ? 0 : 0.75, delay: 0.3, ease: EASE }}
                  className="mt-8 max-w-xl text-base leading-relaxed text-[#D7E2EA]/66 sm:mt-10 sm:text-lg lg:text-xl"
              >
                Have an app to build—or one that needs thoughtful improvement? I&apos;m currently
                taking on selected mobile product projects.
              </motion.p>
            </div>

            <motion.form
                onSubmit={handleSubmit}
                onChange={resetSubmitState}
                initial={false}
                animate={headingVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
                transition={{ duration: reduceMotion ? 0 : 0.85, delay: 0.22, ease: EASE }}
                className="space-y-3.5 sm:space-y-4"
            >
              <input type="hidden" name="_subject" value="New portfolio project enquiry" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

              <label className="block">
                <span className="sr-only">Your name</span>
                <input
                    required
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="YOUR NAME"
                    className={FIELD_CLASS}
                />
              </label>

              <label className="block">
                <span className="sr-only">Email address</span>
                <input
                    required
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="EMAIL"
                    className={FIELD_CLASS}
                />
              </label>

              <label className="block">
                <span className="sr-only">Tell me about the project</span>
                <textarea
                    required
                    name="message"
                    rows={6}
                    placeholder="TELL ME ABOUT THE PROJECT"
                    className={`${FIELD_CLASS} min-h-40 resize-y sm:min-h-44`}
                />
              </label>

              <button
                  type="submit"
                  disabled={submitState === "sending" || submitState === "success"}
                  onPointerMove={handleGlowMove}
                  className="group relative mt-2 flex min-h-16 w-full items-center justify-between overflow-hidden rounded-full border border-[#D7E2EA]/65 bg-[#D7E2EA] px-7 text-left text-sm font-semibold uppercase tracking-[0.16em] text-[#080909] shadow-[0_14px_44px_rgba(103,96,255,0.16)] transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-0.5 hover:shadow-[0_18px_64px_rgba(113,87,255,0.24)] disabled:cursor-default disabled:hover:translate-y-0 sm:px-8"
              >
              <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-8 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                        "radial-gradient(180px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(116,92,255,0.5), transparent 68%)",
                  }}
              />

                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                      key={submitState}
                      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                      transition={{ duration: reduceMotion ? 0 : 0.24, ease: EASE }}
                      className="relative z-10 inline-flex items-center gap-2"
                  >
                    {submitState === "sending" && (
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                    )}
                    {submitState === "success" && <Check className="h-4 w-4" />}
                    {submitState === "error" && <AlertCircle className="h-4 w-4" />}
                    {submitState === "idle" && "Start a conversation"}
                    {submitState === "sending" && "Sending..."}
                    {submitState === "success" && "Message sent"}
                    {submitState === "error" && "Try again"}
                  </motion.span>
                </AnimatePresence>

                <span className="relative z-10 transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-hover:-rotate-6">
                {submitState === "success" ? (
                    <Check className="h-5 w-5" />
                ) : (
                    <ArrowRight className="h-5 w-5" />
                )}
              </span>
              </button>

              <div className="flex min-h-6 items-start justify-between gap-4 px-1 pt-1 text-xs">
                <p aria-live="polite" className="text-[#D7E2EA]/52">
                  {submitState === "sending" && "Sending your message..."}
                  {submitState === "success" && "Thanks — I’ll get back to you shortly."}
                  {submitState === "error" && errorMessage}
                </p>
                {submitState === "error" && (
                    <a
                        href={`mailto:${EMAIL}`}
                        className="shrink-0 border-b border-[#D7E2EA]/35 text-[#D7E2EA]/72"
                    >
                      Email directly
                    </a>
                )}
              </div>
            </motion.form>
          </div>

          <div className="mt-16 flex flex-col gap-8 border-b border-[#D7E2EA]/14 pb-10 sm:mt-20 lg:mt-24 lg:flex-row lg:items-center lg:justify-between">
            <nav aria-label="Social links" className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:gap-x-8">
              {SOCIAL_LINKS.map((link, index) => (
                  <div
                      key={link.label}
                      className={
                        index === 0
                            ? "flex items-center"
                            : "flex items-center border-l border-[#D7E2EA]/18 pl-6 sm:pl-8"
                      }
                  >
                    <SocialLink {...link} />
                  </div>
              ))}
            </nav>

            <p className="inline-flex items-center gap-2.5 whitespace-nowrap text-xs text-[#D7E2EA]/52">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_14px_rgba(34,197,94,0.3)]" />
              Replies within 1–2 business days
            </p>
          </div>

          <footer className="flex flex-col gap-4 pt-8 text-xs text-[#D7E2EA]/42 sm:flex-row sm:items-center sm:justify-between">
            <span>&copy; 2026 Tony Aloysius — Mobile App Developer, France</span>
            <button
                type="button"
                onClick={handleBackToTop}
                className="group inline-flex w-fit items-center gap-2 transition-colors hover:text-[#D7E2EA]/80"
            >
              Back to top
              <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1" />
            </button>
          </footer>
        </div>
      </section>
  );
}