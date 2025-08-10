import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Beta } from '../Reusables/Beta'
import ErrorPage from '../pages/ErrorPage'
import NotFound from '../pages/NotFound'

export const Route = createRootRoute({
  component: () => (
    <>
      <Beta />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
  notFoundComponent: () => <NotFound/>,
  errorComponent: ({ error, info, reset }) => (
    <ErrorPage error={error} info={info} reset={reset} />
  )
})