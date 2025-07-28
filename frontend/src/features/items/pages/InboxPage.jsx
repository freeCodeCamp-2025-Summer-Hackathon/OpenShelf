import { Fragment } from 'react'
import { useLoaderData } from 'react-router'
import BorrowRequest from '../components/BorrowRequest'
import ReturnReminder from '../components/LendingReminder'

export default function InboxPage() {
  const { lendingRequests, borrowRequests } = useLoaderData()

  return (
    <div className="flex h-screen justify-center items-center py-[8rem]">
      <div className="flex flex-col justify-between max-w-7xl w-2/3 min-w-2xl h-full">
        <div className="flex flex-col justify-center gap-6">
          <div>
            <h1 className="font-display-3xl">Inbox</h1>
            <hr className="text-stroke-strong mx-[-20px] mt-2"></hr>
          </div>

          <div>
            <h2 className="font-display-2xl mb-5">
              Your Lending Requests
              {' '}
              {borrowRequests.count > 0 && `(${borrowRequests.count})`}
            </h2>
            <div>
              {borrowRequests.count > 0
                ? (
                    borrowRequests.results.map(request => (
                      <ReturnReminder key={request.id} {...request} />
                    ))
                  )
                : (
                    <p className="text-stroke-strong">
                      You have no lending requests/ return reminders.
                    </p>
                  )}
            </div>
          </div>

          <div>
            <h2 className="font-display-2xl mb-5">
              Borrow Requests
              {' '}
              {lendingRequests.count > 0 && `(${lendingRequests.count})`}
            </h2>
            <div className="flex flex-col gap-4">
              {lendingRequests.count > 0
                ? (
                    lendingRequests.results.map(request => (
                      <Fragment key={request.id}>
                        <BorrowRequest {...request} />
                        <hr className="mx-[-12px] text-stroke-weak"></hr>
                      </Fragment>
                    ))
                  )
                : (
                    <p className="text-stroke-strong">
                      You have no borrow requests.
                    </p>
                  )}
            </div>
          </div>
        </div>

        {/* <div className="flex flex-row w-full justify-end items-center gap-4">
          <p className="text-sm">1-3 of 3</p>
          <Icon icon="heroicons:chevron-left" className="text-stroke-strong" />
          <Icon icon="heroicons:chevron-right" />
        </div> */}
      </div>
    </div>
  )
}
