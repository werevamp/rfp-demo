import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { MantineProvider, createTheme } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css'
import './index.css'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  // Scroll to top on navigation, restore position on browser back/forward
  defaultPreloadStaleTime: 0,
})

// High contrast theme
const theme = createTheme({
  fontFamily: 'Roboto, system-ui, sans-serif',
  defaultRadius: 'md',
  colors: {
    dark: [
      '#C9C9C9',
      '#b8b8b8',
      '#828282',
      '#696969',
      '#424242',
      '#3d3d3d',
      '#2e2e2e',
      '#242424',
      '#1f1f1f',
      '#141414',
    ],
  },
  primaryColor: 'blue',
  primaryShade: 6,
  black: '#000000',
  white: '#ffffff',
  other: {
    dimmedStrength: 0.65, // Stronger dimmed text
  },
  components: {
    Text: {
      defaultProps: {
        c: 'dark.9', // Darker default text
      },
    },
    Title: {
      defaultProps: {
        c: 'dark.9', // Darker titles
      },
      styles: {
        root: {
          fontWeight: 700, // Bolder titles
        },
      },
    },
    Paper: {
      defaultProps: {
        shadow: 'sm',
        withBorder: true,
      },
      styles: {
        root: {
          borderColor: 'var(--mantine-color-gray-4)', // Medium borders
          borderWidth: '1px',
        },
      },
    },
    Card: {
      defaultProps: {
        shadow: 'sm',
        withBorder: true,
      },
      styles: {
        root: {
          borderColor: 'var(--mantine-color-gray-4)', // Medium borders
          borderWidth: '1px',
        },
      },
    },
    Button: {
      styles: {
        root: {
          fontWeight: 600, // Bolder button text
        },
      },
    },
    Badge: {
      defaultProps: {
        variant: 'filled',
      },
      styles: (theme, props) => ({
        root: {
          fontWeight: 600, // Bolder badges
          // Increase contrast for light variant
          ...(props.variant === 'light' && {
            backgroundColor: `color-mix(in srgb, var(--badge-bg) 25%, transparent)`,
            color: `var(--badge-color)`,
            border: `1.5px solid var(--badge-color)`,
          }),
        },
      }),
    },
    AppShell: {
      styles: {
        header: {
          borderColor: 'var(--mantine-color-gray-3)', // More visible header border
        },
      },
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <ModalsProvider>
        <Notifications />
        <RouterProvider router={router} />
      </ModalsProvider>
    </MantineProvider>
  </StrictMode>,
)
