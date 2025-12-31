'use client';

import { personalData } from '@/utils/data/personal-data';
import Link from 'next/link';
import { useState } from 'react';
import { BiLogoLinkedin } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoGithub } from "react-icons/io";
import Image from 'next/image';
import { MdAlternateEmail } from "react-icons/md";
import ContactForm from './contact-form';

// Obfuscate email to prevent spam bots from scraping
function ObfuscatedEmail({ email }) {
  const [revealed, setRevealed] = useState(false);

  // Split email into parts that bots can't easily parse
  const [user, domain] = email.split('@');

  const handleReveal = () => {
    setRevealed(true);
  };

  if (revealed) {
    return (
      <a
        href={`mailto:${email}`}
        className="hover:text-[#16f2b3] transition-colors duration-300"
      >
        {email}
      </a>
    );
  }

  return (
    <button
      onClick={handleReveal}
      className="hover:text-[#16f2b3] transition-colors duration-300 cursor-pointer"
      aria-label="Click to reveal email address"
    >
      <span>{user}</span>
      <span className="select-none">[at]</span>
      <span>{domain}</span>
    </button>
  );
}

function ContactSection() {
  return (
    <div id="contact" className="relative my-12 mt-24 text-white lg:my-16">
      <div className="absolute flex-col items-center hidden lg:flex top-24 -right-8">
        <span className="bg-[#1a1443] w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md">
          CONTACT
        </span>
        <span className="h-36 w-[2px] bg-[#1a1443]"></span>
      </div>
      <div className="grid items-center grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
        <ContactForm />

        <div className="lg:w-3/4 ">
          <div className="flex flex-col gap-5 lg:gap-9">
            <p className="flex items-center gap-3 text-sm md:text-xl">
              <MdAlternateEmail
                className="bg-[#8b98a5] p-2 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer"
                size={36}
              />
              <ObfuscatedEmail email={personalData.email} />
            </p>
            <p className="flex items-center gap-3 text-sm md:text-xl">
              <CiLocationOn
                className="bg-[#8b98a5] p-2 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer"
                size={36}
              />
              <span>
                {personalData.address}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-5 mt-8 lg:mt-16 lg:gap-10">
            <Link target="_blank" href={personalData.twitter}>
              <FaXTwitter
                className="bg-[#8b98a5] p-3 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer"
                size={48}
              />
            </Link>
            <Link target="_blank" href={personalData.pinkary}>
              <Image
                src="/svg/pinkary.svg"
                alt="Pinkary"
                width={48}
                height={48}
                className="rounded-full hover:scale-110 transition-all duration-300 cursor-pointer"
              />
            </Link>
            <Link target="_blank" href={personalData.github}>
              <IoLogoGithub
                className="bg-[#8b98a5] p-3 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer"
                size={48}
              />
            </Link>
            <Link target="_blank" href={personalData.linkedIn}>
              <BiLogoLinkedin
                className="bg-[#8b98a5] p-3 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer"
                size={48}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;