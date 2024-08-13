import { Dialog, TextTrigger } from '@components/Dialog';
import { PrivacyPolicy } from './PrivacyPolicy';
import { TermsAndConditions } from './TermsAndConditions';
import { Disclaimers } from './Disclaimers';
import { CookiePolicy } from './CookiePolicy';

export function Footer() {
  return (
    <footer className="flex flex-col w-screen items-center bg-highlight-bg">
      <h4>Copyright 2024, All rights reserved to Xavier Padoan</h4>
      <div className="flex flex-col md:flex-row items-center w-screen md:w-[60vw] md:justify-between">
        <Dialog
          title="privacy_policy"
          trigger={<TextTrigger>Privacy Policy</TextTrigger>}
        >
          <PrivacyPolicy />
        </Dialog>
        <Dialog
          title="terms_and_conditions"
          trigger={<TextTrigger>Terms and Conditions</TextTrigger>}
        >
          <TermsAndConditions />
        </Dialog>
        <Dialog
          title="disclaimers"
          trigger={<TextTrigger>Disclaimers</TextTrigger>}
        >
          <Disclaimers />
        </Dialog>
        <Dialog
          title="cookies_policy"
          trigger={<TextTrigger>Cookies Policy</TextTrigger>}
        >
          <CookiePolicy />
        </Dialog>
      </div>
    </footer>
  );
}
