import { Link } from 'react-router'
import { Icon } from '@iconify-icon/react'

export default function ReturnReminder({
  id,
  item_title,
  status,
  request_date,
  expected_return_date,
  return_date,
}) {
  if (return_date) return

  const todayDate = new Date()
  const expectedReturnDate = new Date(expected_return_date)
  const diffTime = Math.abs(expectedReturnDate - todayDate)
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  const rtf = new Intl.RelativeTimeFormat(undefined, { style: 'long' })

  return (
    <div className="relative flex flex-row justify-between">
      <div>
        <p>
          <b>{item_title}</b> is due <b>{rtf.format(diffDays, 'day')}</b>.
        </p>
        <Link
          to={`/item/${id}`}
          className="flex flex-row items-center gap-1 cursor-pointer"
        >
          <p className="text-lavender-500 underline">Return now</p>
          <Icon icon="heroicons:arrow-up-right" className="text-lavender-500" />
        </Link>
      </div>

      {/* <div>
        <p className="text-stroke-strong text-sm">{formatDate(request_date)}</p>
      </div> */}
    </div>
  )
}
