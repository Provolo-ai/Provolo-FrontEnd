import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Link } from '@tanstack/react-router'
import useSession from '../../hooks/useSession'
import { GenerateAvatar } from '../../Reusables/GenerateAvatar'
import { LogOut } from 'lucide-react'
import { logout } from '../../utils/logout.util'


const userNavigation = [
    { name: 'My profile', href: '/userprofile' },
    { name: 'Settings', href: '#' },
]

export default function User({ open }) {
    const { user: userData, loading: loadingUserData } = useSession()

    console.log(open);


    const handleSignOut = async () => {
        try {
            await logout();
            navigate({ to: "/login", replace: true });
        } catch (error) {
            console.error("Error signing out:", error);
            navigate({ to: "/login", replace: true });
        }
    };

    const user = {
        name: userData?.displayName ?? "User",
        email: userData?.email,
        imageUrl:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    }
    return (
        <Menu as="div" className="rounded-lg ml-3 z-10 mt-3">
            <MenuButton className="relative flex max-w-xs items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                <span className="absolute -inset-1.5" />
                {loadingUserData ? <div className='size-8 rounded-full bg-gray-300 animate-pulse'></div> : <GenerateAvatar name={userData?.displayName} size={32} />}
                {
                    open &&
                    <span className='ml-3'>
                        <p >{user.name}</p>
                        <p className=" text-xs text-gray-400 text-start">Free</p>
                    </span>
                }
                {/* <img
                    alt=""
                    src={user.imageUrl}
                    className="size-8 rounded-full outline -outline-offset-1 outline-white/10"
                /> */}
                {/* {loadingUserData ?
                    <div className='w-12 h-6 bg-black' />
                    :
                    <p>{user.name}</p>
                } */}
            </MenuButton>

            <MenuItems
                transition
                className="absolute z-10 -mt-44 w-60 origin-bottom-right rounded-md bg-white py-1 shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
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

                {/* Logout */}
                <button
                    onClick={handleSignOut}
                    className={`text-left text-red-400 bg-red-50/70 transition-all duration-300 rounded-md p-3 flex items-center gap-3 hover:bg-red-50 w-full`}
                >
                    <LogOut size={20} />
                    Log Out


                </button>
            </MenuItems>
        </Menu>
    )
}
