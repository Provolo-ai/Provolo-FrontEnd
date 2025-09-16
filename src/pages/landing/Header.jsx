'use client'

import { useState } from 'react'
import {
    Dialog,
    DialogPanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
} from '@headlessui/react'
import {
    ArrowPathIcon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import { Link } from '@tanstack/react-router'
import { MoveRight } from 'lucide-react'
import Logo from '../../Reusables/Logo'
import Vector from "../../assets/img/Vector.png";
import Vector2 from "../../assets/img/Vector2.png";

// --- Navigation Data ---
const products = [
    { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
    { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
    { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
    { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
    { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]

const callsToAction = [
    { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
    { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

// --- Components ---
function ProductPopover() {
    return (
        <Popover className="relative my-auto">
            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold text-gray-900">
                Community
                <ChevronDownIcon className="size-5 text-gray-400" />
            </PopoverButton>

            <PopoverPanel className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 overflow-hidden rounded-3xl bg-white shadow-lg transition">
                <div className="p-4">
                    {products.map((item) => (
                        <div
                            key={item.name}
                            className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm hover:bg-gray-50"
                        >
                            <div className="flex size-11 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                <item.icon className="size-5 text-gray-600 group-hover:text-indigo-600" />
                            </div>
                            <div>
                                <a href={item.href} className="block font-semibold text-gray-900">
                                    {item.name}
                                </a>
                                <p className="mt-1 text-gray-600 text-sm">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                    {callsToAction.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                        >
                            <item.icon className="size-5 text-gray-400" />
                            {item.name}
                        </a>
                    ))}
                </div>
            </PopoverPanel>
        </Popover>
    )
}

function NavLinks() {
    return (
        <PopoverGroup className="hidden lg:flex pl-10">
            <ProductPopover />

            <Link to="#features" className="p-3 text-sm text-gray-500 hover:text-gray-950 transition-all">
                Features
            </Link>
            <Link to="#testimonials" className="p-3 text-sm text-gray-500 hover:text-gray-950 transition-all">
                Testimonials
            </Link>
            <Link
                target="_blank"
                to="https://buildsbyesuoladaniel.hashnode.space/provolo/provoloai-project-documentation"
                className="p-3 text-sm text-gray-500 hover:text-gray-950 transition-all"
            >
                Documentation
            </Link>
            <Link
                target="_blank"
                to="https://substack.com/@provoloai"
                className="p-3 text-sm text-gray-500 hover:text-gray-950 transition-all"
            >
                Blog
            </Link>
        </PopoverGroup>
    )
}

function MobileMenu({ open, onClose }) {
    return (
        <Dialog open={open} onClose={onClose} className="lg:hidden">

            <div className="absolute inset-0">
                <DialogPanel className="absolute inset-y-0 right-0 z-10 w-full max-w-full overflow-y-auto bg-[#F7F8F9] p-8">

                    <div className="mt-32 flex flex-col justify-between  relative z-10">
                        <div className="space-y-6 mb-auto py-6">

                            <Link to="/signup" className="block rounded-lg px-3 py-2 text-base text-gray-900">
                                Get Started
                            </Link>

                            <Link
                                to="https://buildsbyesuoladaniel.hashnode.space/provolo/provoloai-project-documentation"
                                target="_blank"
                                className="block rounded-lg px-3 py-2 text-base text-gray-900"
                            >
                                Documentation
                            </Link>

                            <Link
                                to="https://substack.com/@provoloai"
                                target="_blank"
                                className="block rounded-lg px-3 py-2 text-base text-gray-900"
                            >
                                Blog
                            </Link>

                            <Link
                                to="/login"
                                className="bg-primary hover:bg-primary/90 transition-all py-3 px-5 rounded-full flex items-center gap-3 text-sm text-white w-fit"
                            >
                                Log In <MoveRight size={20} />
                            </Link>

                        </div>
                    </div>

                    <img alt="Provolo" src={Vector} className='absolute top-0 left-0 lg:w-1/5 w-1/2' />
                    <img alt="Provolo" src={Vector2} className='absolute bottom-0 right-0 w-[329.08px]' />
                </DialogPanel>

            </div>
        </Dialog>
    )
}

// --- Main Component ---
export default function Header({ open, onClose }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const openModal = () => {
        setMobileMenuOpen(true)
    }

    const closemodal = () => {
        setMobileMenuOpen(false)
    }


    return (
        <>
            {/* <Banner /> */}
            <header className="fixed w-full pt-8" style={{ zIndex: 1000 }}>
                <nav className="mx-auto flex lg:w-[906.67px] w-[90%] items-center align-middle justify-between py-3 lg:px-3 px-[15px] bg-white rounded-full">
                    <div>
                        <Logo />
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="lg:hidden">
                        <button
                            onClick={mobileMenuOpen ? closemodal : openModal}
                            className="inline-flex items-center justify-center rounded-full bg-primary p-2.5 text-white"
                        >
                            <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Open main menu"}</span>
                            {mobileMenuOpen ?
                                <XMarkIcon className="size-6" />
                                :
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M6.04163 4.4585H13.9583"
                                        stroke="white"
                                        strokeWidth="1.6"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M3.66663 10H16.3333"
                                        stroke="white"
                                        strokeWidth="1.6"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M6.04163 15.5415H13.9583"
                                        stroke="white"
                                        strokeWidth="1.6"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            }
                        </button>
                    </div>

                    {/* Desktop Links */}
                    <NavLinks />

                    {/* CTA */}
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <Link
                            to="/login"
                            className="bg-primary hover:bg-primary/90 transition-all py-3 px-5 rounded-full flex items-center gap-3 text-sm text-white"
                        >
                            Log In <MoveRight size={20} />
                        </Link>
                    </div>
                </nav >

                {/* Mobile Menu */}
                {
                    mobileMenuOpen &&
                    <MobileMenu
                        open={mobileMenuOpen}
                        onClose={closemodal}
                    />
                }
            </header >
        </>
    )
}
