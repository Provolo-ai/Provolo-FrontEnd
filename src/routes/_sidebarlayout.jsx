import { createFileRoute, Outlet } from '@tanstack/react-router'
import Sidebar from '../Reusables/Sidebar'

export const Route = createFileRoute('/_sidebarlayout')({
    component: RouteComponent,
})

function RouteComponent() {
    return <>
        <div className="flex h-screen bg-gray-50 ">
            <Sidebar />
            <Outlet />
        </div>
    </>
}
