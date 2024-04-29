import { FC } from 'react';

/**
 * Page displaying the Terms of Use.
 */
export const TermsOfUse: FC = () => {
  return (
    <div className='container mx-auto px-4 pb-10 pt-4'>
      <h1 className='mb-8 text-3xl font-bold'>Terms and Conditions</h1>
      <div className='prose'>
        <h2>1. Introduction</h2>
        <p>
          This website is operated by Ecommerce LTD. Throughout the site, the terms “we”, “us” and
          “our” refer to Ecommerce LTD.. Ecommerce LTD. offers this website, including all
          information, tools and services available from this site to you, the user, conditioned
          upon your acceptance of all terms, conditions, policies and notices stated here.
        </p>
        <h2>2. License to Use Website</h2>
        <p>
          Unless otherwise stated, Ecommerce LTD. and/or its licensors own the intellectual property
          rights in the website and material on the website. Subject to the license below, all these
          intellectual property rights are reserved.
        </p>
        <h2>3. Restrictions</h2>
        <p>You are specifically restricted from all of the following:</p>
        <ul>
          <li>publishing any website material in any other media;</li>
          <li>selling, sublicensing and/or otherwise commercializing any website material;</li>
          <li>publicly performing and/or showing any website material;</li>
          <li>using this website in any way that is or may be damaging to this website;</li>
          <li>using this website in any way that impacts user access to this website;</li>
          <li>
            using this website contrary to applicable laws and regulations, or in any way may cause
            harm to the website, or to any person or business entity;
          </li>
          <li>
            engaging in any data mining, data harvesting, data extracting or any other similar
            activity in relation to this website;
          </li>
          <li>using this website to engage in any advertising or marketing.</li>
        </ul>
        <h2>4. No Warranties</h2>
        <p>
          This website is provided “as is,” with all faults, and Ecommerce LTD. express no
          representations or warranties, of any kind related to this website or the materials
          contained on this website.
        </p>
        <h2>5. Limitation of Liability</h2>
        <p>
          In no event shall Ecommerce LTD., nor any of its officers, directors and employees, be
          liable to you for anything arising out of or in any way connected with your use of this
          website, whether such liability is under contract, tort or otherwise, and Ecommerce LTD.,
          including its officers, directors and employees shall not be liable for any indirect,
          consequential or special liability arising out of or in any way related to your use of
          this website.
        </p>
      </div>
    </div>
  );
};
