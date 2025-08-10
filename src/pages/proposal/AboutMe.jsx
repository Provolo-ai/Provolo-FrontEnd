import {
    BriefcaseIcon,
    CalendarIcon,
    CheckIcon,
    ChevronDownIcon,
    CurrencyDollarIcon,
    LinkIcon,
    MapPinIcon,
    PencilIcon,
} from '@heroicons/react/20/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { CircleDollarSign, FilePenLine, Globe, Pencil, PersonStanding, User } from 'lucide-react'

export default function AboutMe() {
    return (
        <div className="">
            <div className="max-w-40 flex-1">
                {/* <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    Back End Developer
                </h2> */}
                <div className="mt-1 flex flex-col sm:mt-0 sm:flex-col text-right justify-end">
                    <div className="mt-2 flex items-center text-sm text-gray-400">
                        <User className="mr-1.5 size-5 shrink-0 text-gray-400" size={5} />
                        <p className='truncate'>
                            Esuola Daniel
                        </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-400">
                        <Globe className="mr-1.5 size-5 shrink-0 text-gray-400" size={5} />
                        <p className='truncate'>
                            https:://www.esuoladaniel.framer.website
                        </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-400">
                        <CircleDollarSign className="mr-1.5 size-5 shrink-0 text-gray-400" size={5} />
                        $120k &ndash; $140k
                    </div>
                </div>
            </div>
            <div className="mt-5 flex lg:mt-5">
                <span className="">
                    <button
                        type="button"
                        className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-400 hover:text-gray-500 transition-all duration-300 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 w-full"
                    >
                        <Pencil className="mr-3 size-5 shrink-0" size={5} />
                        Edit
                    </button>
                </span>
            </div>
        </div>
    )
}
