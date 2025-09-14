import { Link } from "@tanstack/react-router";
import {
  Copyright,
  Instagram,
  Linkedin,
  Twitter,
  LibraryBig,
} from "lucide-react";
import Vector3 from "../../assets/img/Vector3.png";
import Vector4 from "../../assets/img/Vector4.png";
import freelancers from "../../assets/img/freelancers.png";
import upwork from "../../assets/img/upwork.png";
import proposals from "../../assets/img/proposals.png";

// Reusable styles
const linkBase =
  "p-3 flex items-center gap-3 rounded text-gray-500 hover:text-gray-950 transition-all duration-300 text-sm";

function SocialLink({ to, icon: Icon }) {
  return (
    <Link target="_blank" to={to} className={linkBase}>
      <Icon size={20} />
    </Link>
  );
}

function HeroSection() {
  return (
    <div className="relative isolate overflow-hidden bg-[#0F56EE] px-6 pt-16 lg:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0 h-[600px]">

      {/* Gradient Overlay */}
      <div className="absolute z-20 h-full left-0 w-full bg-gradient-to-b from-white/0 to-white/30 top-32"></div>


      <div className="text-center lg:w-[703px] mx-auto flex flex-col gap-[30px] relative m-auto z-20">

        <p className="tracking-tight text-balance lg:text-[44px] md:text-7xl text-4xl font-headingmd text-white">
          Stop Guessing. <br />
          Start Winning More Jobs on Upwork.
        </p>

        <p className="text-white/70 text-base mx-auto">
          Your skills deserve to be seen and paid. Provolo helps you attract clients, rank higher, and turn views into interviews. Make every word work for you.
        </p>

        <Link
          to="/signup"
          className='bg-white hover:bg-white/90 transition-all duration-300 py-[18px] px-[30px] rounded-full  mx-auto w-[180px] h-[45px] flex items-center justify-center text-sm text-black font-headingmd'
        >
          Get Started
        </Link>


        <img alt="Provolo" src={proposals} className='absolute -top-20 -right-14 w-32' />
        <img alt="Freelancing" src={freelancers} className='absolute -left-48 w-32' />
        <img alt="Upwork Optimiser" src={upwork} className='absolute -bottom-28 right-3 w-32' />

      </div>

      <img alt="Upwork Optimiser" src={Vector4} className='absolute top-0 left-0 w-1/4 z-0 opacity-50' />
      <img alt="Upwork Optimiser" src={Vector3} className='absolute bottom-0 right-0 w-1/4 z-0 opacity-50' />

    </div>
  );
}

function FooterSection() {
  return (
    <div className="lg:flex mt-10 lg:justify-between items-center border-t border-gray-200 pt-10 px-6 lg:px-8">
      <p className="hidden lg:flex items-center gap-3 text-sm">
        <Copyright size={15} />
        Provolo '25
      </p>

      <div className="flex items-center gap-3 justify-center">
        <Link
          target="_blank"
          to="https://buildsbyesuoladaniel.hashnode.space/provolo/terms-and-conditions"
          className={linkBase}
        >
          Terms & Conditions
        </Link>
        <Link
          target="_blank"
          to="https://buildsbyesuoladaniel.hashnode.space/provolo/privacy-policy"
          className={linkBase}
        >
          Privacy Policy
        </Link>
        <Link
          target="_blank"
          to="https://buildsbyesuoladaniel.hashnode.space/provolo/provoloai-project-documentation"
          className={linkBase}
        >
          Documentation
        </Link>

        <SocialLink to="https://x.com/provoloai" icon={Twitter} />
        <SocialLink to="https://www.linkedin.com/company/provoloai" icon={Linkedin} />
        <SocialLink to="https://www.instagram.com/provoloai" icon={Instagram} />
        <SocialLink to="https://substack.com/@provoloai" icon={LibraryBig} />
      </div>
    </div>
  );
}

export default function Example() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[93.75rem] py-24 sm:py-10">
        <HeroSection />
        <FooterSection />
      </div>
    </div>
  );
}
