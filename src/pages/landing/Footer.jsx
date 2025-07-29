import { Link } from "@tanstack/react-router";
import { Copy, Copyright, MoveRight } from "lucide-react";
import Logo from "../../Reusables/Logo";

export default function Example() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-24 sm:py-24">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">

          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -z-10 size-256 -translate-y-1/2 mask-[radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
          >
            <circle r={512} cx={512} cy={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>

          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-3xl tracking-tight text-balance text-white sm:text-5xl">
              Boost your productivity. Start using our app today.
            </h2>
            <p className="mt-6 text-lg/8 text-pretty text-gray-300">
              Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <Link
                to="/signup"
                className='bg-white hover:bg-gray-100 transition-all duration-300 p-3 px-6 rounded-md flex  align-middle gap-3 hover:gap-5 w-fit'
              >
                Get Started
                <MoveRight size={20} />
              </Link>
            </div>
          </div>

          <div className="relative mt-16 h-80 lg:mt-8">
            <img
              alt="App screenshot"
              src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png"
              width={1824}
              height={1080}
              className="absolute top-0 left-0 w-228 max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
            />
          </div>
        </div>


        <div className="flex mt-10 justify-between items-center border-t border-gray-200 pt-10">

          <div className="flex items-center gap-2 text-gray-500 text-md">
            <Logo />
            <Copyright size={15} />
            <p>Provolo '25</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              target="_blank"
              to="https://buildsbyesuoladaniel.hashnode.space/provolo/terms-and-conditions"
              className="p-3 flex align-middle gap-3 rounded text-gray-500 hover:bg-gray-50 hover:text-gray-950 transition-all duration-300 text-sm"
            >
              Terms & Conditions
            </Link>
            <Link
              target="_blank"
              to="https://buildsbyesuoladaniel.hashnode.space/provolo/privacy-policy"
              className="p-3 flex align-middle gap-3 rounded text-gray-500 hover:bg-gray-50 hover:text-gray-950 transition-all duration-300 text-sm"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
