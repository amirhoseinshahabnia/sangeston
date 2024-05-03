import FooterListenLinks from './footerListenLinks';
import FooterSocialLinks from './footerSocialLinks';

const Footer = () => {
  const date = new Date();
  return (
    <footer id="footer" className="pb-4 pt-16 lg:pt-24 relative">
      <div className="wrapper main-color flex flex-col mx-auto w-11/12 lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7x">
        <div className="get-in-touch mb-32 lg:mb-48">
          <h3 className="main-color text-4xl mb-16 lg:text-6xl lg:mb-24">
            Let&apos;s create
            <br />
            something
            <br />
            <span className="font-bold">great together</span>
          </h3>
          <p className="main-color">
            For collaborations send an email to:{' '}
            <a
              href="mailto:collab@sang.com"
              className="underline hover:opacity-80"
            >
              collab@sang.com
            </a>
          </p>
        </div>
        <div
          className="flex flex-col justify-between mb-16 lg:mb-24 gap-x-16 lg:flex-row"
          id="footer-widgets"
        >
          <div className="signup-form flex flex-col mb-8 lg:order-1 lg:mb-0">
            <h4 className="mb-4">
              Get early access to fresh beats & upcoming release, Subscribe!
            </h4>
            <div className="sign-form-placeholder mx-auto lg:m-0"></div>
          </div>
          <div className="song-links flex flex-col items-center order-first mb-8 lg:order-1 lg:mb-0 ">
            <h4 className="mb-4">Listen to Sang&apos;s songs here</h4>
            <FooterListenLinks />
          </div>
          <div className="social links flex flex-col items-center mb-8 lg:order-1 lg:mb-0">
            <h4 className="mb-4">Social</h4>
            <FooterSocialLinks />
          </div>
        </div>
      </div>
      <div className="credit main-color text-center w-11/12 mx-auto absolute left-0 bottom-4 lg:bottom-6 right-0">
        Copyright © {date.getFullYear()} Sangestone. All Rights Reserved.
        Designed by Sahar Mirzaei.
      </div>
    </footer>
  );
};

export default Footer;
