"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import PrimaryButton from "./PrimaryButton";
import { useRouter } from "next/navigation";

const navbarItems = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Destinations", link: "/destinations" },
  { id: 3, name: "Travel Guide", link: "/guide" },
  { id: 4, name: "About", link: "/about" },
  { id: 5, name: "Contact", link: "/contact" },
];

const renderAnimatedNavText = (text: string) => {
  const letters = text.split("");

  return (
    <>
      <span className="block">
        {letters.map((letter, index) => (
          <span
            className="letter"
            style={{ transitionDelay: `${index * 0.02}s` }}
            key={`${letter}-${index}`}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </span>
      <span className="block">
        {letters.map((letter, index) => (
          <span
            className="letter"
            style={{ transitionDelay: `${index * 0.02}s` }}
            key={`${letter}-clone-${index}`}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </span>
    </>
  );
};

const Header = () => {
  const router = useRouter();
  const [bgColor, setBgColor] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleBackgroundColor = () => {
      setBgColor(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleBackgroundColor);
    return () => window.removeEventListener("scroll", handleBackgroundColor);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`max-w-481 mx-auto fixed left-0 right-0 top-0 z-50 w-full transition-all duration-500 ${bgColor
          ? "border-b border-white/10 bg-black/60 backdrop-blur-md"
          : "border-b border-white/10 bg-black/0"
          }`}
      >
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between sm:h-20">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3">
              <span className="font-greatvibes text-2xl font-normal leading-none tracking-normal text-white sm:text-[2rem] md:text-[2.45rem]">
                Safarly
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex lg:items-center lg:gap-2">
              <ul className="flex items-center gap-1">
                {navbarItems.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.link}
                      className="nav-link relative block overflow-hidden px-2 py-2 xl:px-4"
                    >
                      <span className="nav-text relative block h-4 font-sans text-[10px] lg:text-xs font-medium uppercase leading-5 tracking-[0.08em] text-white/88">
                        {renderAnimatedNavText(item.name)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="ml-4 flex items-center gap-3 xl:ml-6">
                <PrimaryButton
                  onClick={() => router.push("/login")}
                  className="h-10 cursor-pointer px-4! py-0! text-[0.75rem] shadow-none! xl:px-5! xl:text-[0.84rem]"
                  style={{
                    background: "rgba(123, 203, 146, 0.1)",
                    border: "1px solid rgba(123, 203, 146, 0.55)",
                  }}
                >
                  Sign In
                </PrimaryButton>

                <PrimaryButton
                  onClick={() => router.push("/home")}
                  className="h-10 cursor-pointer px-4! py-0! text-[0.75rem] xl:px-6! xl:text-[0.84rem]"
                >
                  Start Exploring
                </PrimaryButton>
              </div>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative z-50 rounded-lg border border-white/20 p-2 text-white lg:hidden"
              aria-label="Toggle menu"
            >
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Tablet Navigation (lg breakpoint) */}
      <div
        className={`max-w-481 mx-auto fixed left-0 right-0 top-16 z-40 hidden border-b border-white/10 bg-black/95 backdrop-blur-lg transition-all duration-500 lg:top-20 ${mobileMenuOpen ? "block" : "hidden"
          }`}
      >
        <div className="container mx-auto px-6 py-4">
          <ul className="flex flex-wrap items-center justify-center gap-2">
            {navbarItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.link}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:text-[#7BCB92]"
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <div className="flex w-full items-center justify-center gap-3 pt-4">
              <PrimaryButton
                onClick={() => {
                  router.push('/login')
                  setMobileMenuOpen(false);
                }}
                className="px-4! py-2! text-sm"
                style={{
                  background: "rgba(123, 203, 146, 0.1)",
                  border: "1px solid rgba(123, 203, 146, 0.55)",
                }}
              >
                Sign In
              </PrimaryButton>
              <PrimaryButton
                onClick={() => {
                  router.push("/home");
                  setMobileMenuOpen(false);
                }}
                className="px-4! py-2! text-sm"
              >
                Start Exploring
              </PrimaryButton>
            </div>
          </ul>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-lg transition-all duration-500 lg:hidden ${mobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
          }`}
        style={{ top: "64px" }}
      >
        <div className="flex h-full flex-col px-6 py-8">
          {/* Mobile Navigation Links */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {navbarItems.map((item, index) => (
                <li
                  key={item.id}
                  style={{
                    transitionDelay: `${index * 0.05}s`,
                    transform: mobileMenuOpen
                      ? "translateX(0)"
                      : "translateX(-20px)",
                    opacity: mobileMenuOpen ? 1 : 0,
                  }}
                  className="transition-all duration-300"
                >
                  <Link
                    href={item.link}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block border-b border-white/10 py-4 text-lg font-medium uppercase tracking-wider text-white transition-colors hover:text-[#7BCB92]"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Buttons */}
          <div
            className="space-y-4 pt-8 transition-all duration-500"
            style={{
              transform: mobileMenuOpen ? "translateY(0)" : "translateY(20px)",
              opacity: mobileMenuOpen ? 1 : 0,
              transitionDelay: "0.2s",
            }}
          >
            <PrimaryButton
              onClick={() => {
                console.log("Sign In clicked");
                setMobileMenuOpen(false);
              }}
              className="w-full"
              style={{
                background: "rgba(123, 203, 146, 0.1)",
                border: "1px solid rgba(123, 203, 146, 0.55)",
              }}
            >
              Sign In
            </PrimaryButton>

            <PrimaryButton
              onClick={() => {
                router.push("/explore");
                setMobileMenuOpen(false);
              }}
              className="w-full"
            >
              Start Exploring
            </PrimaryButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
