import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import formatDate from '../../../lib/formatDate'
import { getBorrowRequestDetails } from '../api/getBorrowRequestDetails'

export default function BorrowRequest({
  id,
  item_title,
  borrower_name,
  request_date,
  status,
  notes,
}) {
  const [borrowRequestDetails, setBorrowRequestDetails] = useState('')

  useEffect(() => {
    getBorrowRequestDetails(id).then(res => setBorrowRequestDetails(res.data))
  }, [id])

  return (
    <div className="relative flex flex-row justify-between">
      <div>
        <div className="flex flex-row gap-2 items-center">
          <p>
            Borrow Request from
            {' '}
            <b>{borrower_name}</b>
            {' '}
            for
            {' '}
            <Link
              to={
                borrowRequestDetails
                  ? `/items/${borrowRequestDetails.item.id}`
                  : ''
              }
              className="text-lavender-500 underline cursor-pointer font-bold"
            >
              {item_title}
            </Link>
          </p>

          <div
            className={clsx(
              {
                'bg-amber-100 text-amber-600': status === 'pending',
                'bg-blue-100 text-blue-600': status === 'approved',
                'bg-red-100 text-red-600': status === 'rejected',
              },
              'px-2 py-1 w-fit tracking-wider text-sm rounded uppercase',
            )}
          >
            {status}
          </div>
        </div>
        <p className="text-stroke-strong mt-1">
          <i>
            Message: "
            {notes}
            "
          </i>
        </p>
      </div>
      <div>
        <p className="text-stroke-strong text-sm">{formatDate(request_date)}</p>
      </div>
    </div>
  )
}
