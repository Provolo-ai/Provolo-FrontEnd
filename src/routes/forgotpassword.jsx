import { createFileRoute } from '@tanstack/react-router'
import ForgotPassword from '../pages/ForgotPassword'

export const Route = createFileRoute('/forgotpassword')({
    component: RouteComponent,
})

function RouteComponent() {
    return <ForgotPassword />
}
