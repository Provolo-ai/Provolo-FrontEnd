import React from 'react'
import AppScreenshot from "../../assets/img/screenshot.png";
import Vector from "../../assets/img/Vector.png";
import Vector2 from "../../assets/img/Vector2.png";
import freelancers from "../../assets/img/freelancers.png";
import upwork from "../../assets/img/upwork.png";
import proposals from "../../assets/img/proposals.png";
import LandingpageButton from './LandingpageButton';



export const Hero = () => {
    return (
        <div className="min-h-screen lg:h-screen overflow-hidden relative bg-light">

            <div className="relative isolate px-6 lg:px-8 lg:pt-80 pt-56 z-10">
                <div className="mx-auto max-w-[75rem] flex flex-col lg:gap-[60px] gap-[100px]">
                    <div className="text-center lg:w-[629px] mx-auto flex flex-col gap-[30px] relative items-center">
                        <p className="text-sm uppercase">
                            Designed to Turn Profile Views Into Interviews
                        </p>

                        <h1 className="tracking-tight leading-tight text-balance lg:text-xl md:text-7xl text-5xl font-medium">
                            Win More Jobs on Upwork. <span className='font-secondary text-primary italic'>Automatically.</span>
                        </h1>
                        <p className="text-[#6B7280] text-base w-[80%] mx-auto">
                            Provolo uses AI + proven copywriting strategies to optimize your profile and proposals, so you can land clients faster.
                        </p>

                        <LandingpageButton to={"/signup"} btnText={"Optimize My Profile"} />

                        <img alt="Provolo" src={proposals} className='absolute lg:-top-20 -bottom-10 lg:-right-14 right-0 w-32' />
                        <img alt="Freelancing" src={freelancers} className='absolute lg:-left-48 left-5 top-5 w-32' />
                        <img alt="Upwork Optimiser" src={upwork} className='absolute lg:top-36 -bottom-16 -right-96  w-32' />
                    </div>

                    <div className='rounded-[32px] bg-white p-4 lg:relative'>
                        <img alt="App screenshot" src={AppScreenshot} className='rounded-[22px] border ' />
                    </div>
                </div>
            </div>

            <img alt="Provolo" src={Vector} className='absolute top-0 left-0 lg:w-1/5 w-1/2' />
            <img alt="Provolo" src={Vector2} className='absolute bottom-0 right-0 w-1/3' />
        </div>
    )
}
