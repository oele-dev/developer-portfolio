// @flow strict
import Link from 'next/link';

function Footer() {
  return (
    <div className="relative border-t bg-[#0d1224] border-[#353951] text-white">
      <div className="mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-6 lg:py-10">
        <div className="flex justify-center -z-40">
          <div className="absolute top-0 h-[1px] w-1/2  bg-gradient-to-r from-transparent via-violet-500 to-transparent"></div>
        </div>
        <div className="flex items-center justify-between md:flex-row">
          <p className="text-sm">
            © Developer Portfolio of <Link target="_blank" href="https://www.linkedin.com/in/oele-dev" className="text-[#16f2b3]">oele.dev</Link> <span className="text-xs">based on </span><Link target="_blank" href="https://github.com/said7388/developer-portfolio" className="text-xs"> ABU SAID</Link>
          </p>
          <div />
        </div>
      </div>
    </div >
  );
};

export default Footer;