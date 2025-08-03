import { createFileRoute } from '@tanstack/react-router'
import ForgotPassword from '../../pages/ForgotPassword'

export const Route = createFileRoute('/_auth/forgotpassword')({
    component: RouteComponent,
})

function RouteComponent() {
    return <ForgotPassword />
}
