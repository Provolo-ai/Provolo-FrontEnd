import { Link } from "@tanstack/react-router";
import React from "react";
import LandingpageButton from "./LandingpageButton";

const STEPS = [
    {
        title: "Connect Your Profile",
        description:
            "Import your Upwork profile in one click. Provolo scans your headline, overview, and proposals.",
    },
    {
        title: "AI Optimizes Your Copy",
        description:
            "Provolo applies proven copywriting strategies to rewrite your profile into a client-magnet. Watch weak words transform into persuasive ones in real time.",
    },
    {
        title: "Get Seen & Hired",
        description:
            "Rank higher in search, attract more views, and convert them into interviews and jobs.",
    },
];

const HowItWorks = () => {
    return (
        <section className="py-32 px-10" id="features">
            <div className="mx-auto max-w-3xl lg:max-w-[93.75rem] flex flex-col gap-10">

                {/* Section header */}
                <header>
                    <p className="font-headingmd text-[28px]">
                        From Profile to Paycheck in 3 Steps.
                    </p>
                    <p className="font-headingmd text-[#6B7280]">
                        No learning curve. No guesswork. Just connect, optimize, and start
                        landing clients.
                    </p>
                </header>

                {/* Steps */}
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7">
                    {STEPS.map((step, index) => (
                        <div key={index}>
                            <div className="bg-[#F0F1F2] mb-8 h-[500px] rounded-3xl p-20"></div>
                            <div className="pl-5">
                                <p className="font-headingmd text-[18px] mb-3">{step.title}</p>
                                <p className="text-[18px] text-[#6B7280]">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <span className="text-center flex justify-center">
                    <LandingpageButton to={"/signup"} btnText={"Boost My Profile Now"} />
                </span>
            </div>

        </section>
    );
};

export default HowItWorks;
