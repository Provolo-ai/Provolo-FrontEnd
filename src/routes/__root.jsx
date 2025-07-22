import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Beta } from '../Reusables/Beta'

export const Route = createRootRoute({
  component: () => (
    <>
      <Beta />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})