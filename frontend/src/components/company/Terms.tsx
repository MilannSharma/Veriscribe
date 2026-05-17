import React from "react";
import { CompanyPageLayout } from "./CompanyPageLayout";

export const Terms = () => {
  return (
    <CompanyPageLayout 
      title="Terms of Service"
      subtitle="The formal agreement governing your journey within the Veriscribe ecosystem."
    >
      <section className="space-y-8">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using Veriscribe, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
        </p>
        
        <h2>2. Use License</h2>
        <p>
          Permission is granted to temporarily use the document intelligence tools on Veriscribe's website for personal or commercial document processing. This is the grant of a license, not a transfer of title.
        </p>

        <h2>3. Prohibited Conduct</h2>
        <p>
          Users are prohibited from using Veriscribe to generate or process content that violates intellectual property rights, promotes illegal activities, or aims to bypass ethical AI usage boundaries.
        </p>

        <h2>4. Service Availability</h2>
        <p>
          While we strive for 99.9% uptime, Veriscribe is provided "as is". We reserve the right to modify or discontinue features of the cinematic workspace at any time to improve the ecosystem's intelligence.
        </p>

        <h2>5. Limitation of Liability</h2>
        <p>
          In no event shall Veriscribe or its suppliers be liable for any damages arising out of the use or inability to use the materials on Veriscribe's website.
        </p>
      </section>
    </CompanyPageLayout>
  );
};
