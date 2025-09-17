import { PaperClipIcon } from '@heroicons/react/20/solid'
import LandingpageButton from './LandingpageButton';

export default function Description() {

  const FEATURES = [
    "Crafted to grab client attention.",
    "Built to boost algorithm ranking.",
    "Designed to help you win more jobs.",
  ];


  return (
    <section className="py-10 px-5" id="features">
      <div className="mx-auto max-w-3xl lg:max-w-[93.75rem] bg-[#F3F4F5] rounded-3xl lg:h-[600px] p-10 grid">

        <div className='grid grid-cols-2'>
          <div className='flex flex-col gap-20 text-start'>
            <header className='flex flex-col gap-5'>
              <p className="font-headingmd text-[28px]">
                Every Word Works Harder.
              </p>
              <p className='text-[#6B7280] font-heading text-[22px]'>
                Provolo isn’t just about writing faster, it’s about writing smarter.
              </p>
            </header>
            
            <ol className="list-none text-base text-[#6B7280] flex flex-col gap-6">
              {FEATURES.map((feature, index) => (
                <li key={index} className="flex items-center font-headingmd text-x">
                  <span className="px-2 py-1 bg-[#6B7280]/10 rounded-lg mr-2 text-sm font-headingmd">
                    {index + 1}
                  </span>
                  {feature}
                </li>
              ))}
            </ol>

            <LandingpageButton to={"/signup"} btnText={"Get Started"} />
          </div>
          <div></div>
        </div>
      </div>
    </section>
  )
}
