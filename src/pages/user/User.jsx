import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Link } from '@tanstack/react-router'

const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const userNavigation = [
    { name: 'Your profile', href: '/userprofile' },
    { name: 'Settings', href: '#' },
]




export default function User() {
    return (
        <Menu as="div" className="absolute top-10 right-10 rounded-lg ml-3 z-10">
            <MenuButton className="relative flex max-w-xs items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <img
                    alt=""
                    src={user.imageUrl}
                    className="size-8 rounded-full outline -outline-offset-1 outline-white/10"
                />
            </MenuButton>

            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
                {userNavigation.map((item) => (
                    <MenuItem key={item.name}>
                        <Link
                            to={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                        >
                            {item.name}
                        </Link>
                    </MenuItem>
                ))}
            </MenuItems>
        </Menu>
    )
}
