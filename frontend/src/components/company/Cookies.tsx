import React from "react";
import { CompanyPageLayout } from "./CompanyPageLayout";

export const Cookies = () => {
  return (
    <CompanyPageLayout 
      title="Cookie Policy"
      subtitle="How we use digital identifiers to refine your experience within our intelligent workspace."
    >
      <section className="space-y-8">
        <h2>1. What are Cookies?</h2>
        <p>
          Cookies are small text files stored on your device that help us remember your preferences and provide a seamless, cinematic experience as you navigate our platform.
        </p>
        
        <h2>2. Essential Cookies</h2>
        <p>
          These are necessary for the website to function. They handle authentication, security, and the persistence of your document workspace as you move between tools.
        </p>

        <h2>3. Performance & Analytics</h2>
        <p>
          We use these to understand how users interact with our AI engines. This data is anonymized and helps us refine the future of our document intelligence ecosystem.
        </p>

        <h2>4. Managing Preferences</h2>
        <p>
          You can choose to disable cookies through your browser settings, although this may impact your ability to use certain high-fidelity features of the Veriscribe platform.
        </p>
      </section>
    </CompanyPageLayout>
  );
};
