import { Icon } from '@iconify-icon/react'
import { useRouteError } from 'react-router-dom'

export default function ErrorBoundary() {
  const error = useRouteError()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <Icon icon="heroicons:exclamation-triangle" className="text-3xl text-red-500" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h1>
        
        {error instanceof Error 
          ? (
            <>
              <p className="text-red-600 font-medium mb-2">{error.message}</p>
              <pre className="bg-gray-100 p-4 rounded text-left overflow-auto max-h-60 text-sm">
                {error.stack}
              </pre>
            </>
          ) 
          : (
            <p className="text-gray-600">
              An unexpected error occurred. Please try refreshing the page.
            </p>
          )}
        
        <div className="mt-6">
          <button
            type="button"
            className="bg-lavender-600 text-white px-6 py-2 rounded-lg hover:bg-lavender-700"
            onClick={() => window.location.href = '/'}
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  )
}
