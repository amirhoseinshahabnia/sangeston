import FooterListenLinks from './footerListenLinks';
import FooterSocialLinks from './footerSocialLinks';

const Footer = () => {
  const date = new Date();
  return (
    <footer id="footer" className="pb-4 pt-24 relative">
      <div className="wrapper main-color flex flex-col mx-auto w-11/12 md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7x">
        <div className="get-in-touch mb-48">
          <h3 className="main-color text-6xl mb-24">
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
        <div className="flex justify-between mb-24 gap-x-16">
          <div className="signup-form">
            <h4 className="mb-4">
              Get early access to fresh beats & upcoming release, Subscribe!
            </h4>
          </div>
          <div className="song-links flex flex-col items-center">
            <h4 className="mb-4">Listen to Sang&apos;s songs here</h4>
            <FooterListenLinks />
          </div>
          <div className="social links flex flex-col items-center">
            <h4 className="mb-4">Social</h4>
            <FooterSocialLinks />
          </div>
        </div>
      </div>
      <div className="credit main-color text-center w-11/12 mx-auto absolute left-0 bottom-6 right-0">
        Copyright © {date.getFullYear()} Sangestone. All Rights Reserved.
        Designed by Sahar Mirzaei.
      </div>
    </footer>
  );
};

export default Footer;
