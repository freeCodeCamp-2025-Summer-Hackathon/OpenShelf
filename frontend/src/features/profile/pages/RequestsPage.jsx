// src/features/profile/pages/RequestsPage.jsx
import { useState } from 'react'
import { useLoaderData, useRevalidator } from 'react-router-dom'
import { Icon } from '@iconify-icon/react'
import { getBorrowRequests } from '../api/getBorrowRequests'
import { updateBorrowRequest } from '../api/updateBorrowRequest'
import ProfileMenu from '../../../components/ProfileMenu'

export async function requestsLoader() {
  try {
    const response = await getBorrowRequests()
    return { 
      requests: response.data?.results || [],
      error: response.error || null 
    }
  } catch (error) {
    console.error('Error loading borrow requests:', error)
    return { 
      requests: [],
      error: 'Failed to load borrow requests. Please try again later.'
    }
  }
}

export default function RequestsPage() {
  const { requests, error } = useLoaderData()
  const revalidator = useRevalidator()
  const [activeTab, setActiveTab] = useState('received')
  const [actionInProgress, setActionInProgress] = useState(null)
  const [statusMessage, setStatusMessage] = useState({ type: '', message: '' })

  // Filter requests based on active tab
  const receivedRequests = requests.filter(req => req.owner_is_current_user)
  const sentRequests = requests.filter(req => !req.owner_is_current_user)
  const displayRequests = activeTab === 'received' ? receivedRequests : sentRequests

  const handleRequestAction = async (requestId, status) => {
    setActionInProgress(requestId)
    setStatusMessage({ type: '', message: '' })

    try {
      const response = await updateBorrowRequest(requestId, status)
      
      if (response.status === 200) {
        setStatusMessage({ 
          type: 'success', 
          message: `Request ${status === 'approved' ? 'approved' : 'rejected'} successfully` 
        })
        revalidator.revalidate()
      } else {
        setStatusMessage({ 
          type: 'error', 
          message: response.error || 'Failed to update request' 
        })
      }
    } catch (error) {
      console.error('Error updating borrow request:', error)
      setStatusMessage({ 
        type: 'error', 
        message: 'An unexpected error occurred' 
      })
    } finally {
      setActionInProgress(null)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date)
  }

  return (
    <div className="flex flex-row justify-center mt-12">
      <div className="w-[1280px] p-6 grid grid-cols-12 gap-8">
        <div className="col-span-3">
          <div className="sticky top-24">
            <ProfileMenu />
          </div>
        </div>
        <div className="col-span-9">
        <h1 className="font-display-3xl mb-6">Borrow Requests</h1>

        {statusMessage.message && (
          <div className={`mb-6 p-4 rounded-lg ${
            statusMessage.type === 'success' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {statusMessage.message}
          </div>
        )}
        
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Tab navigation */}
        <div className="flex border-b mb-6">
          <button
            type="button"
            className={`px-4 py-2 font-medium ${
              activeTab === 'received' 
                ? 'border-b-2 border-lavender-500 text-lavender-800' 
                : 'text-stroke-strong'
            }`}
            onClick={() => setActiveTab('received')}
          >
            Requests Received
          </button>
          <button
            type="button"
            className={`px-4 py-2 font-medium ${
              activeTab === 'sent' 
                ? 'border-b-2 border-lavender-500 text-lavender-800' 
                : 'text-stroke-strong'
            }`}
            onClick={() => setActiveTab('sent')}
          >
            Requests Sent
          </button>
        </div>

        {displayRequests.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-lavender-100">
                  <th className="py-3 px-4 text-left">Item</th>
                  {activeTab === 'received' && (
                    <th className="py-3 px-4 text-left">Requested By</th>
                  )}
                  {activeTab === 'sent' && (
                    <th className="py-3 px-4 text-left">Owner</th>
                  )}
                  <th className="py-3 px-4 text-left">Date Requested</th>
                  <th className="py-3 px-4 text-left">Return By</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  {activeTab === 'received' && (
                    <th className="py-3 px-4 text-left">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {displayRequests.map(request => (
                  <tr key={request.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      {request.item?.title || 'Unknown Item'}
                    </td>
                    <td className="py-3 px-4">
                      {activeTab === 'received'
                        ? request.requester?.name || 'Unknown User'
                        : request.owner?.name || 'Unknown Owner'}
                    </td>
                    <td className="py-3 px-4">
                      {formatDate(request.created_at)}
                    </td>
                    <td className="py-3 px-4">
                      {formatDate(request.expected_return_date)}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        request.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : request.status === 'approved' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </td>
                    {activeTab === 'received' && request.status === 'pending' && (
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleRequestAction(request.id, 'approved')}
                            disabled={actionInProgress === request.id}
                            className="bg-green-600 text-white p-2 rounded-md disabled:opacity-50"
                          >
                            {actionInProgress === request.id ? (
                              <Icon icon="heroicons:arrow-path" className="animate-spin" />
                            ) : (
                              <Icon icon="heroicons:check" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRequestAction(request.id, 'rejected')}
                            disabled={actionInProgress === request.id}
                            className="bg-red-600 text-white p-2 rounded-md disabled:opacity-50"
                          >
                            <Icon icon="heroicons:x-mark" />
                          </button>
                        </div>
                      </td>
                    )}
                    {activeTab === 'received' && request.status !== 'pending' && (
                      <td className="py-3 px-4">
                        <span className="text-stroke-weak text-sm">No actions available</span>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 bg-lavender-50 rounded-lg">
            <p className="text-lg text-lavender-800 mb-2">
              {activeTab === 'received' 
                ? "You haven't received any borrow requests yet" 
                : "You haven't sent any borrow requests yet"}
            </p>
            <p className="text-stroke-strong">
              {activeTab === 'received' 
                ? "When someone wants to borrow your items, you'll see their requests here" 
                : "Find items you're interested in and send borrow requests to their owners"}
            </p>
          </div>
        )}
      </div>
      </div>
    </div>
  )
}
