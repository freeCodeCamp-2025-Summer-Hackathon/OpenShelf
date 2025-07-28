import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import formatDate from '../../../lib/formatDate'
import { checkOutItem as checkOut } from '../api/checkOutItem'

export default function CheckOutModal({ item, onCancel }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  // set the return date to two weeks from now
  const returnDate = useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() + 14)
    return date.toISOString()
  }, [])

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    setErrorMessages([])
    setLoading(true)
    try {
      await checkOut({
        item_id: item.id,
        expected_return_date: returnDate,
        notes: data.notes || '',
      })
      setSuccess(true)
      navigate('/inbox')
    }
    catch (err) {
      const errorData = err.response?.data
      if (errorData) {
        const errorMessages = Object.values(errorData).flat()
        setErrorMessages(errorMessages)
      }
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black/30"
      onClick={onCancel}
    >
      <div
        className="bg-white px-5 py-10 rounded-2xl shadow-xl w-96 flex flex-col justify-center items-center gap-5"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-center mb-4">
          <p>You're about to check out</p>
          <h1 className="font-display-5xl">{item.title}</h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[80%] flex flex-col gap-3"
        >
          {/* Return date is shown as read-only text */}
          <div className="flex flex-col gap-1">
            <label htmlFor="return-date" className="font-sans">
              Return Date
            </label>
            <input
              id="return-date"
              type="text"
              className="block border-1 border-stroke-weak px-4 py-3 rounded-xl bg-gray-300 cursor-not-allowed"
              value={formatDate(new Date(returnDate))}
              disabled
              readOnly
            />
            <p className="text-xs text-gray-500">
              Return date is set to
              {' '}
              <b>2 weeks</b>
              {' '}
              from now.
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="notes" className="font-sans">
              Notes
            </label>
            <textarea
              id="notes"
              placeholder="Add some notes..."
              {...register('notes')}
              rows={4}
              className="block border-1 border-stroke-weak px-4 py-3 rounded-xl focus:outline-stroke-strong resize-none"
            />
          </div>

          {errorMessages.length > 0 && (
            <div className="text-red text-sm">
              {errorMessages.map(msg => (
                <p key={msg}>{msg}</p>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-4 items-center">
            <button
              type="submit"
              className="font-sans-lg-upper flex justify-center items-center gap-2 py-3 w-full max-w-[400px] bg-lavender-500 text-white rounded-md cursor-pointer"
              disabled={loading || success}
            >
              {success
                ? 'Checked Out!'
                : loading
                  ? 'Checking Out...'
                  : 'Confirm'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="font-sans-lg-upper flex justify-center items-center gap-2 py-3 w-full max-w-[400px] bg-[#F2ECF4] rounded-md cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
