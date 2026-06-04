import React from "react";
import { Link } from "@tanstack/react-router";


export function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 z-30 flex flex-col items-end gap-3">
      <a
        href="https://wa.me/919800000000?text=Hi%20PIZZAD'OH%2C%20I%27d%20like%20to%20learn%20more%20about%20your%20pizza%20dough."
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-elegant transition hover:scale-105"
      >
        <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current" aria-hidden>
          <path d="M19.11 17.21c-.27-.13-1.6-.79-1.85-.88-.25-.09-.43-.13-.6.13-.18.27-.7.88-.85 1.06-.16.18-.31.2-.58.07-.27-.13-1.14-.42-2.18-1.34-.81-.72-1.35-1.6-1.51-1.87-.16-.27-.02-.41.12-.55.13-.13.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.13-.6-1.45-.82-1.99-.22-.52-.44-.45-.6-.46l-.51-.01c-.18 0-.47.07-.71.34-.25.27-.93.91-.93 2.22 0 1.31.96 2.58 1.09 2.76.13.18 1.88 2.88 4.56 4.04.64.28 1.13.45 1.52.57.64.2 1.22.17 1.68.1.51-.08 1.6-.65 1.82-1.28.22-.63.22-1.17.16-1.28-.06-.11-.24-.18-.51-.31zM16.05 5.33C9.96 5.33 5.04 10.25 5.04 16.34c0 1.95.51 3.85 1.48 5.52L5 27l5.32-1.39a11 11 0 0 0 5.73 1.6h.01c6.08 0 11.01-4.92 11.01-11.01 0-2.94-1.14-5.7-3.22-7.78a10.96 10.96 0 0 0-7.8-3.09z"/>
        </svg>
      </a>
      <Link
        to="/sample"
        className="hidden rounded-full bg-italian-red px-5 py-3 text-sm font-semibold text-cream shadow-elegant transition hover:bg-italian-red/90 md:inline-flex"
      >
        Free Sample →
      </Link>
    </div>
  );
}
