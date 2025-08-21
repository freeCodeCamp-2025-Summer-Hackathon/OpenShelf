import { Icon } from '@iconify-icon/react'
import { useEffect, useRef, useState } from 'react'

export default function Select({
  label,
  name,
  info,
  options,
  opened,
  setOpened,
  register,
  setValue,
  error,
  rules,
}) {
  const [selected, setSelected] = useState('')
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Add a small delay to allow click events to complete
        setTimeout(() => setOpened(null), 0)
      }
    }

    if (opened === name) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setOpened, opened, name])

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row gap-2 items-center">
        <label className="font-sans">
          {label}
          {rules?.required && <span className="text-red">*</span>}
        </label>
        {info && (
          <div className="relative">
            <Icon
              icon="heroicons:information-circle"
              className="text-stroke-strong peer text-xl mt-1 cursor-pointer"
            />

            <div className="rounded border-1 border-stroke-weak px-2 py-[6px] bg-white text-center w-44 absolute top-[-64px] left-[-72px] shadow-2xs peer-hover:opacity-100 opacity-0 transition-opacity text-stroke-strong">
              {info}
            </div>
          </div>
        )}
      </div>
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          className={`${
            error ? 'border-red' : 'border-stroke-weak'
          } border-1 px-4 py-3 rounded-xl focus:outline-stroke-strong flex flex-row justify-between items-center w-full cursor-pointer`}
          onClick={() => {
            setOpened(prev => (prev === name ? null : name))
          }}
        >
          {selected
            ? (
                <p>{selected}</p>
              )
            : (
                <p className="text-stroke-strong">
                  Select
                  {' '}
                  {label.toLowerCase()}
                  ...
                </p>
              )}
          <Icon icon="heroicons:chevron-down" className="text-stroke-strong" />
        </button>

        {error && <p className="text-red">{error.message}</p>}

        {opened === name && (
          <div className="absolute top-14 border-1 border-stroke-weak px-2 py-3 rounded-lg w-full bg-white z-10 shadow-lg max-h-48 overflow-y-auto">
            {options.map(option => (
              <button
                type="button"
                key={option}
                className={`p-3 rounded-lg w-full flex flex-row justify-between items-center cursor-pointer hover:bg-gray-50 ${
                  selected === option ? 'bg-[#F2F2F2]' : ''
                }`}
                onMouseDown={(e) => {
                  e.preventDefault() // Prevent focus loss
                  e.stopPropagation() // Prevent event bubbling
                  setSelected(option)
                  setValue(name, option)
                  setOpened(null) // Close dropdown after selection
                }}
              >
                <p className="text-left capitalize">{option.replace('-', ' ')}</p>
                {selected === option && <Icon icon="heroicons:check" />}
              </button>
            ))}
          </div>
        )}
      </div>

      <input
        value={selected}
        name={name}
        {...register(name, rules)}
        type="hidden"
        defaultValue=""
      />
    </div>
  )
}
