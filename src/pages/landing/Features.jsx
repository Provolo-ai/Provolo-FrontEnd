import React from "react";

const FEATURES = [
  "Rank higher in Upwork search",
  "Convert profile views into interviews",
  "Attract high-value clients",
  "Win more jobs with smarter proposals",
];

const STEPS = [
  {
    title: "Smarter Copy, Instantly",
    description:
      "Stop guessing what works. Provolo improves your profile and proposals automatically.",
  },
  {
    title: "More Invitations & Interviews",
    description:
      "Rank higher, get noticed, and turn views into conversations with persuasive, client-focused copy.",
  },
  {
    title: "Optimized for the Algorithm",
    description:
      "Headlines and overviews crafted to boost your visibility in Upwork’s search.",
  },
  {
    title: "Works for Any Freelancer",
    description:
      "Designer, developer, writer, or marketer, Provolo adapts to your niche.",
  },
];

const Features = () => {
  return (
    <section className="lg:py-32 py-10 lg:px-10 px-5" id="features">
      <div className="mx-auto max-w-3xl lg:max-w-[93.75rem] flex flex-col lg:gap-[102px] gap-[25px]">
        {/* Intro text */}
        <p className="lg:w-[69%] font-headingmd lg:text-3xl ">
          Provolo is an AI-powered copywriting platform built for freelancers on
          Upwork.{" "}
          <span className="text-[#A6AAB3] font-headingmd">
            It doesn’t just write faster, it writes smarter, applying proven
            strategies to optimize your profile and proposals. The result? More
            visibility, more interviews, and more jobs, without the guesswork.
          </span>
        </p>

        {/* Features list */}
        <div>
          <p className="font-headingmd mb-5">Why Provolo Works</p>
          <ol className="list-none flex justify-between text-base text-[#6B7280] flex-wrap gap-6">
            {FEATURES.map((feature, index) => (
              <li key={index} className="flex items-center font-headingmd text-[#6B7280]">
                <span className="px-2 py-1 bg-[#6B7280]/10 rounded-lg mr-2 text-sm font-headingmd">
                  {index + 1}
                </span>
                {feature}
              </li>
            ))}
          </ol>
        </div>

        {/* Steps header */}
        <div>
          <p className="font-headingmd">How Provolo Gets You Hired</p>
        </div>
      </div>

      {/* Steps (scrollable cards with scroll snapping) */}
      <div className="lg:flex grid md:grid-cols-2 grid-cols-1 gap-7 lg:overflow-x-auto no-scrollbar py-5 lg:px-2 lg:ml-48 snap-x snap-mandatory">
        {STEPS.map((step, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full sm:w-full lg:w-[630px] snap-start"
          >
            <div className="bg-[#F0F1F2] mb-8 h-[500px] rounded-3xl p-20"></div>
            <div className="px-5">
              <p className="font-headingmd text-[18px]">{step.title}</p>
              <p className="text-[18px] text-[#6B7280]">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
