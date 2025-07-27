import { Icon } from '@iconify-icon/react'

export default function InboxPage() {
  return (
    <div className="flex h-screen justify-center items-center py-20">
      <div className="flex flex-col justify-between max-w-7xl w-2/3 min-w-2xl h-full">
        <div className="flex flex-col justify-center gap-6">
          <div>
            <h1 className="font-display-3xl">Inbox</h1>
            <hr className="text-stroke-strong mx-[-20px] mt-2"></hr>
          </div>

          <div>
            <h2 className="font-display-2xl mb-5">Unread</h2>
            <div>
              <div className="relative flex flex-row justify-between">
                <div className="w-2 h-2 rounded-full bg-red absolute top-2 left-[-16px]"></div>
                <div>
                  <p>
                    Borrow Request from <b>Riki</b> for{' '}
                    <b className="text-lavender-500 underline cursor-pointer">
                      Book in Purple
                    </b>
                  </p>
                  <p className="text-stroke-strong mt-1">
                    <i>Message: "Hi! I would like to borrow this book for my studies.</i>
                  </p>
                </div>
                <div>
                  <p className="text-stroke-strong text-sm">
                    Sun 27 Jul 12:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-display-2xl mb-5">Read</h2>
            <div className="flex flex-col gap-4">
              <div className="relative flex flex-row justify-between">
                <div>
                  <p>
                    <b>Book in Purple</b> is due in <b>3 days</b>.
                  </p>
                  <div className="flex flex-row items-center gap-1 cursor-pointer">
                    <p className="text-lavender-500 underline">Return now</p>
                    <Icon
                      icon="heroicons:arrow-up-right"
                      className="text-lavender-500"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-stroke-strong text-sm">
                    Sun 27 Jul 11:00 AM
                  </p>
                </div>
              </div>

              <hr className="mx-[-12px] text-stroke-weak"></hr>

              <div className="relative flex flex-row justify-between">
                <div>
                  <p>
                    <b>Book in Purple</b> is due in <b>3 days</b>.
                  </p>
                  <div className="flex flex-row items-center gap-1 cursor-pointer">
                    <p className="text-lavender-500 underline">Return now</p>
                    <Icon
                      icon="heroicons:arrow-up-right"
                      className="text-lavender-500"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-stroke-strong text-sm">
                    Sun 27 Jul 11:00 AM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row w-full justify-end items-center gap-4">
          <p className="text-sm">1-3 of 3</p>
          <Icon icon="heroicons:chevron-left" className="text-stroke-strong" />
          <Icon icon="heroicons:chevron-right" />
        </div>
      </div>
    </div>
  )
}
