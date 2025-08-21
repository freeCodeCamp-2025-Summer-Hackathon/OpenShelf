import { Icon } from '@iconify-icon/react'
import clsx from 'clsx'
import { useNavigate } from 'react-router'
import formatDate from '../../../lib/formatDate'
import { acceptBorrowRequest } from '../api/acceptBorrowRequest'
import { declineBorrowRequest } from '../api/declineBorrowRequest'
import { markAsReturned } from '../api/markAsReturned'

export default function BorrowRequestItemDetails({
  id,
  borrower_name,
  request_date,
  expected_return_date,
  status,
  notes,
}) {
  // const status = 'rejected'
  const navigate = useNavigate()

  const handleApprove = async () => {
    try {
      const approveConfig = await acceptBorrowRequest(id)

      if (approveConfig.status !== 200) {
        throw new Error(approveConfig.request.responseText)
      }

      navigate(0)
    }
    catch (err) {
      console.error('Error approving request:', err.message)
    }
  }

  const handleReject = async () => {
    try {
      const rejectConfig = await declineBorrowRequest(id)

      if (rejectConfig.status !== 200) {
        throw new Error(rejectConfig.request.responseText)
      }

      navigate(0)
    }
    catch (err) {
      console.error('Error rejecting request:', err.message)
    }
  }

  const handleMarkAsReturned = async () => {
    try {
      const returnConfig = await markAsReturned(id)

      if (returnConfig.status !== 200) {
        throw new Error(returnConfig.request.responseText)
      }

      navigate(0)
    }
    catch (err) {
      console.error('Error marking item as returned:', err.message)
    }
  }

  return (
    <div className="relative flex flex-row justify-between">
      <div>
        <div className="flex flex-row gap-2 items-center">
          <p>
            Borrow Request from
            {' '}
            <b>{borrower_name}</b>
          </p>

          <div
            className={clsx(
              {
                'bg-amber-100 text-amber-600': status === 'pending',
                'bg-blue-100 text-blue-600': status === 'accepted',
                'bg-red-100 text-red-600': status === 'declined',
                'bg-green-100 text-green-600': status === 'returned',
              },
              'px-2 py-1 w-fit tracking-wider text-sm rounded uppercase',
            )}
          >
            {status}
          </div>
        </div>
        {status === 'accepted' && (
          <p className="text-stroke-strong mt-1">
            Expects return on/before
            {' '}
            <u>{formatDate(expected_return_date)}</u>
            .
          </p>
        )}

        <p className="text-stroke-strong mt-1">
          <i>
            Message: "
            {notes}
            "
          </i>
        </p>
      </div>
      <div className="flex flex-col items-end">
        {status === 'pending' && (
          <p className="text-stroke-strong text-sm">
            {formatDate(request_date)}
          </p>
        )}

        {status === 'pending' && (
          <div className="flex flex-row gap-2">
            <div className="relative mt-2 w-fit">
              <button
                type="button"
                className="size-9 hover:bg-[#0000000d] rounded flex justify-center items-center cursor-pointer peer"
                onClick={handleApprove}
              >
                <Icon
                  icon="heroicons:check"
                  className="text-2xl text-green-600"
                />
              </button>
              <div className="rounded border-1 border-stroke-weak px-[5px] bg-white text-center text-sm absolute left-1/2 transform -translate-x-1/2 top-full mt-2 shadow-2xs peer-hover:opacity-100 opacity-0 transition-opacity text-stroke-strong text-nowrap">
                Approve
              </div>
            </div>
            <div className="relative mt-2 w-fit">
              <button
                type="button"
                className="size-9 hover:bg-[#0000000d] rounded flex justify-center items-center cursor-pointer peer"
                onClick={handleReject}
              >
                <Icon icon="heroicons:x-mark" className="text-2xl text-red" />
              </button>
              <div className="rounded border-1 border-stroke-weak px-[5px] bg-white text-center text-sm absolute left-1/2 transform -translate-x-1/2 top-full mt-2 shadow-2xs peer-hover:opacity-100 opacity-0 transition-opacity text-stroke-strong text-nowrap">
                Reject
              </div>
            </div>
          </div>
        )}

        {status === 'accepted' && (
          <div className="flex flex-row gap-2">
            <div className="relative mt-2 w-fit">
              <button
                type="button"
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors cursor-pointer"
                onClick={handleMarkAsReturned}
              >
                Mark as Returned
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
