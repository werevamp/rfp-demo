import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Layout from '../components/Layout'

function RootComponent() {
  const router = useRouterState()
  const isIntakePage = router.location.pathname.startsWith('/intake')

  if (isIntakePage) {
    return (
      <>
        <Outlet />
        <TanStackRouterDevtools />
      </>
    )
  }

  return (
    <Layout>
      <Outlet />
      <TanStackRouterDevtools />
    </Layout>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
})