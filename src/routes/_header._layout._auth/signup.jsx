import { createFileRoute } from '@tanstack/react-router'
import Authentication from '../../pages/Signup'

export const Route = createFileRoute('/_header/_layout/_auth/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Authentication />
}
