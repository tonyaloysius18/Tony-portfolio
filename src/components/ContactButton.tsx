interface ContactButtonProps {
  href?: string;
}

export default function ContactButton({ href }: ContactButtonProps) {
  const className =
    "rounded-full text-white font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base outline outline-2 outline-offset-[-3px] outline-white inline-block";
  const style = {
    background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
    boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
  };

  if (href) {
    return (
      <a href={href} className={className} style={style}>
        Contact Me
      </a>
    );
  }

  return (
    <button type="button" className={className} style={style}>
      Contact Me
    </button>
  );
}
