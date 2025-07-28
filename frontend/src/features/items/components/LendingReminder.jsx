import { Icon } from '@iconify-icon/react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { getBorrowRequestDetails } from '../api/getBorrowRequestDetails'
import formatDate from '../../../lib/formatDate'

export default function ReturnReminder({
  id,
  item_title,
  // status,
  request_date,
  expected_return_date,
  return_date,
}) {
  const status = 'pending'
  const todayDate = new Date()
  const expectedReturnDate = new Date(expected_return_date)
  const diffTime = Math.abs(expectedReturnDate - todayDate)
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  const rtf = new Intl.RelativeTimeFormat(undefined, { style: 'long' })

  const [borrowRequestDetails, setBorrowRequestDetails] = useState('')

  useEffect(() => {
    getBorrowRequestDetails(id).then((res) => setBorrowRequestDetails(res.data))
  }, [id])

  return (
    <>
      {status === 'accepted' && (
        <div>
          <div className="flex flex-row gap-2 items-center">
            <p>
              <b>{item_title}</b> is due <b>{rtf.format(diffDays, 'day')}</b>.
            </p>
            <div className="bg-blue-100 text-blue-600 px-2 py-1 w-fit tracking-wider text-sm rounded uppercase">
              {status}
            </div>
          </div>
          <Link
            to={
              borrowRequestDetails
                ? `/items/${borrowRequestDetails.item.id}`
                : '/items'
            }
            className="flex flex-row items-center gap-1 cursor-pointer"
          >
            <p className="text-lavender-500 underline">Return now</p>
            <Icon
              icon="heroicons:arrow-up-right"
              className="text-lavender-500"
            />
          </Link>
        </div>
      )}

      {status === 'rejected' && (
        <div>
          <div className="flex flex-row gap-2 items-center">
            <p>
              Request for{' '}
              <Link
                to={
                  borrowRequestDetails
                    ? `/items/${borrowRequestDetails.item.id}`
                    : '/items'
                }
                className="text-lavender-500 underline font-bold"
              >
                {item_title}
              </Link>{' '}
              was rejected.
            </p>
            <div className="bg-red-100 text-red-600 px-2 py-1 w-fit tracking-wider text-sm rounded uppercase">
              {status}
            </div>
          </div>
        </div>
      )}

      {status === 'pending' && (
        <div className="relative flex flex-row justify-between">
          <div className="flex flex-row gap-2 items-center">
            <p>
              You requested to checkout{' '}
              <Link
                to={
                  borrowRequestDetails
                    ? `/items/${borrowRequestDetails.item.id}`
                    : '/items'
                }
                className="text-lavender-500 underline font-bold"
              >
                {item_title}
              </Link>{' '}
            </p>
            <div className="bg-amber-100 text-amber-600 px-2 py-1 w-fit tracking-wider text-sm rounded uppercase">
              {status}
            </div>
          </div>
          <div>
            <p className="text-stroke-strong text-sm">
              {formatDate(request_date)}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
