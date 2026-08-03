"use client";

import { useEffect } from "react";

/**
 * Live chat widget.
 * Replace the Tawk.to property ID with your own free account:
 * https://www.tawk.to
 *
 * Or switch to Crisp, Tidio, etc.
 */
export function LiveChat() {
  useEffect(() => {
    // Example Tawk.to embed – replace with your real property ID
    // For now this is a placeholder that does nothing until you add your ID.
    const propertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
    if (!propertyId) return;

    const s1 = document.createElement("script");
    s1.async = true;
    s1.src = `https://embed.tawk.to/${propertyId}/default`;
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    document.body.appendChild(s1);

    return () => {
      // cleanup if needed
    };
  }, []);

  return null;
}
