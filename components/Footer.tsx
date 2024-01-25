
import Link from "next/link";
import { Logo } from ".";

const Footer = () => (
  <footer className="footer">
    <div className="footer__links-container">
      <div className="footer__rights">
        <Logo />
        <p className="text-base text-gray-700">
          PokeLib 2024 <br />
          All Rights Reserved &copy;
        </p>
      </div>
      <div className="footer__links">
          <h3 className="font-bold">
            About
          </h3>
      </div>
    </div>

    <div className="footer__copyrights">
      <p>@2024 PokeLib. All rights reserved</p>

      <div className="footer__copyrights-link">
        <Link href="/" className="text-gray-500">
          Privacy & Policy
        </Link>
        <Link href="/" className="text-gray-500">
          Terms & Condition
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;