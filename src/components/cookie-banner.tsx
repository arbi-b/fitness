"use client";

import { useEffect, useState } from "react";

type Preferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<"banner" | "customize">("banner");

  const [prefs, setPrefs] = useState<Preferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem("cookie-consent");

    if (!stored) {
      setVisible(true);
      return;
    }

    try {
      const parsed = JSON.parse(stored);

      setPrefs({
        necessary: true,
        analytics: parsed.analytics ?? false,
        marketing: parsed.marketing ?? false,
      });

      setVisible(false);
    } catch (error) {
      // OLD FORMAT ("accepted") → reset safely
      localStorage.removeItem("cookie-consent");
      setVisible(true);
    }
  }, []);

  const saveConsent = (updated: Preferences) => {
    localStorage.setItem("cookie-consent", JSON.stringify(updated));
    setVisible(false);
  };

  const acceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
    });
  };

  const rejectAll = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
    });
  };

  const toggle = (key: keyof Preferences) => {
    if (key === "necessary") return;

    setPrefs((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const saveCustom = () => {
    saveConsent(prefs);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-neutral-900 text-black dark:text-white p-8 rounded-2xl shadow-2xl max-w-lg w-full mx-4">

        {step === "banner" && (
          <>
            <h2 className="text-2xl font-bold mb-4">
              We Use Cookies 🍪
            </h2>

            <p className="text-sm mb-6">
              We use cookies to improve your experience, analyze traffic, and show relevant ads.
              You can accept, reject, or customize your preferences.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={acceptAll}
                className="bg-black text-white dark:bg-white dark:text-black px-4 py-3 rounded-lg"
              >
                Accept All
              </button>

              <button
                onClick={rejectAll}
                className="border px-4 py-3 rounded-lg"
              >
                Reject All
              </button>

              <button
                onClick={() => setStep("customize")}
                className="text-sm underline"
              >
                Customize
              </button>
            </div>
          </>
        )}

        {step === "customize" && (
          <>
            <h2 className="text-2xl font-bold mb-4">
              Customize Cookies
            </h2>

            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between items-center">
                <span>Necessary Cookies</span>
                <input type="checkbox" checked disabled />
              </div>

              <div className="flex justify-between items-center">
                <span>Analytics Cookies</span>
                <input
                  type="checkbox"
                  checked={prefs.analytics}
                  onChange={() => toggle("analytics")}
                />
              </div>

              <div className="flex justify-between items-center">
                <span>Marketing Cookies</span>
                <input
                  type="checkbox"
                  checked={prefs.marketing}
                  onChange={() => toggle("marketing")}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={saveCustom}
                className="bg-black text-white dark:bg-white dark:text-black px-4 py-3 rounded-lg"
              >
                Save Preferences
              </button>

              <button
                onClick={() => setStep("banner")}
                className="text-sm underline"
              >
                Back
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}