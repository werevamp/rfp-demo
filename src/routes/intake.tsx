import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/intake')({
  component: IntakeRouteLayout,
})

function IntakeRouteLayout() {
  // Render without any wrapper - each intake child route will use its own IntakeLayout
  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <Outlet />
    </div>
  )
}
