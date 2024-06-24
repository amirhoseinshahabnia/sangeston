import FooterListenLinks from "./footerListenLinks";
import FooterSocialLinks from "./footerSocialLinks";
import Typography from "./typography";

type Props = {
  data: any;
};

const Footer = ({ data }: Props) => {
  const date = new Date();
  return (
    <footer id="footer" className="pb-4 pt-16 xl:pt-20 2xl:pt-24 relative">
      <div
        className="wrapper main-color flex flex-col mx-auto w-11/12 lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7x"
        id="contact"
      >
        <div className="get-in-touch mb-32 xl:mb-40 2xl:mb-48">
          <Typography
            variant="h2"
            htmlCopy='Let&apos;s create<br />something<br /><span className="font-bold">great together</span>'
            classes="main-color mb-16 xl:mb-20 2xl:mb-24"
          />
          <p className="main-color">
            For collaborations send an email to:{" "}
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
            <FooterListenLinks links={data.soundHubLinks} />
          </div>
          <div className="social links flex flex-col items-center mb-8 lg:order-1 lg:mb-0">
            <h4 className="mb-4">Social</h4>
            <FooterSocialLinks links={data.socialLinks} />
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
