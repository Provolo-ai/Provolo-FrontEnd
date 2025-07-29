import React from 'react'
import CustomButton from '../../Reusables/CustomButton'
import { MoveRight } from 'lucide-react'
import { Link } from '@tanstack/react-router'


export const Hero = () => {
    return (
        <div className="bg-white">

            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="mx-auto max-w-7xl p-36 sm:py-48 lg:py-40 rounded-2xl homeBg">
                    <div className="text-center">
                        <h1 className="text-8xl tracking-tight text-balance text-white sm:text-7xl">
                            Supercharge your Upwork Profile
                        </h1>
                        <p className="my-8 text-2xl text-pretty text-white ">
                            Supercharge your Upwork profile with intelligent, data-driven insights.
                            Craft compelling proposals, improve your visibility, and unlock higher-quality gigs.
                        </p>

                        <Link
                            to="/signup"
                            className='bg-white hover:bg-gray-100 transition-all duration-300 p-3 px-6 rounded-md flex  align-middle gap-3 hover:gap-5 mx-auto w-fit'
                        >
                            Get Started
                            <MoveRight size={20} />
                        </Link>

                    </div>
                </div>
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
                    />
                </div>
            </div>
        </div>
    )
}
