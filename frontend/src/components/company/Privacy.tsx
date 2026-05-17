import React from "react";
import { CompanyPageLayout } from "./CompanyPageLayout";

export const Privacy = () => {
  return (
    <CompanyPageLayout 
      title="Privacy Policy"
      subtitle="At Veriscribe, your data privacy is our highest priority. Learn how we handle your information with cinematic precision."
    >
      <section className="space-y-8">
        <h2>1. Data Collection</h2>
        <p>
          We collect information that you provide directly to us when you create an account, use our document intelligence tools, or communicate with us. This may include your name, email address, and any document content you process through our AI engines.
        </p>
        
        <h2>2. How We Use Data</h2>
        <p>
          Your data is used exclusively to provide and improve the Veriscribe ecosystem. This includes:
        </p>
        <ul>
          <li>Orchestrating AI engines for document processing.</li>
          <li>Refining the accuracy of our detection and humanization models.</li>
          <li>Ensuring secure access to your cinematic workspace.</li>
        </ul>

        <h2>3. Data Sovereignty</h2>
        <p>
          You maintain full ownership of all documents and intellectual property processed through Veriscribe. We do not use your private documents to train public AI models without your explicit consent.
        </p>

        <h2>4. Security Protocols</h2>
        <p>
          We implement state-of-the-art encryption and security measures to protect your information. Our platform is built on enterprise-grade infrastructure with multi-layer data protection.
        </p>
      </section>
    </CompanyPageLayout>
  );
};
