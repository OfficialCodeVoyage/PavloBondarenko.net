// Custom render function that includes providers and common setup
import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'

// Add any providers here (theme, router, etc.)
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

// Re-export everything
export * from '@testing-library/react'
export { customRender as render }

// Helper function to create mock props
export const createMockProps = <T extends Record<string, any>>(
  overrides?: Partial<T>
): T => {
  return {
    ...overrides,
  } as T
}

// Mock Next.js router
export const createMockRouter = (router?: Partial<any>) => ({
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn().mockResolvedValue(undefined),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
  isReady: true,
  isPreview: false,
  ...router,
})