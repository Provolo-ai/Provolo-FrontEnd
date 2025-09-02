import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Beta } from '../Reusables/Beta'
import ErrorPage from '../pages/ErrorPage'
import NotFound from '../pages/NotFound'
import { useAuthInit } from '../hooks/useAuthInit'

function RootComponent() {
  // Initialize authentication when app starts
  useAuthInit();
  
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <NotFound/>,
  errorComponent: ({ error, info, reset }) => (
    <ErrorPage error={error} info={info} reset={reset} />
  )
})