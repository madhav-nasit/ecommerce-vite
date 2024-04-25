import { FC } from 'react';

/**
 * Page displaying the Privacy Policy.
 */
export const PrivacyPolicy: FC = () => {
  return (
    <div className='container mx-auto px-4 pb-10 pt-4'>
      <h1 className='mb-8 text-3xl font-bold'>Privacy Policy</h1>
      <div className='prose'>
        <h2>1. Introduction</h2>
        <p>
          This Privacy Policy describes how Ecommerce LTD ("we", "us", or "our") collects, uses, and
          discloses information that we obtain about visitors to our website and users of our
          e-commerce services (collectively, the "Services"). By visiting the website or using the
          Services, you agree to the terms of this Privacy Policy.
        </p>
        <h2>2. Information We Collect</h2>
        <p>
          We may collect personal information about you such as your name, email address, shipping
          address, and payment information when you use our Services. We also collect non-personal
          information such as your IP address, browser type, and referring website.
        </p>
        <h2>3. How We Use Your Information</h2>
        <p>
          We use the information we collect to provide, maintain, and improve our Services,
          communicate with you, process your orders, and personalize your experience. We may also
          use your information to send you marketing communications.
        </p>
        <h2>4. Information Sharing and Disclosure</h2>
        <p>
          We may share your information with third-party service providers who help us operate our
          website and provide our Services. We may also share your information in response to legal
          requests or to protect our rights and interests.
        </p>
        <h2>5. Data Security</h2>
        <p>
          We take reasonable measures to protect the information we collect from loss, theft, and
          unauthorized access, disclosure, alteration, and destruction.
        </p>
        <h2>6. Changes to this Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by
          posting the new Privacy Policy on this page.
        </p>
        <h2>7. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at
          [contact@email.com].
        </p>
      </div>
    </div>
  );
};
