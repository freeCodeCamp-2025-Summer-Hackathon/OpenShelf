import { Icon } from '@iconify-icon/react'
import { useEffect, useRef, useState } from 'react'

export default function MultiSelect({
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
  const [selected, setSelected] = useState([])
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

  useEffect(() => {
    setValue(name, selected)
  }, [selected, name, setValue])

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
      <div className="flex flex-col gap-2 relative" ref={dropdownRef}>
        <button
          type="button"
          className={`${error ? 'border-red' : 'border-stroke-weak'} border-1 ${
            selected ? 'px-4 py-3' : 'pl-2 pr-4 py-2'
          } rounded-xl focus:outline-stroke-strong flex flex-row justify-between items-center w-full cursor-pointer`}
          onClick={() => {
            setOpened(prev => (prev === name ? null : name))
          }}
        >
          {selected.length
            ? (
                <div className="flex flex-row flex-wrap gap-2">
                  {selected.map(data => (
                    <div
                      className="px-3 py-1 bg-[#F4F4F4] flex justify-center items-center gap-1 rounded w-fit"
                      key={data}
                    >
                      <p>{data}</p>
                      <Icon
                        icon="heroicons:x-mark"
                        className="text-stroke-strong text-lg cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation() // Prevent dropdown from toggling
                          setSelected(prev => prev.filter(s => s !== data))
                        }}
                      />
                    </div>
                  ))}
                </div>
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
                  selected.includes(option) ? 'bg-[#F2F2F2]' : ''
                }`}
                onMouseDown={(e) => {
                  e.preventDefault() // Prevent focus loss
                  e.stopPropagation() // Prevent event bubbling
                  setSelected((prev) => {
                    if (prev.includes(option)) {
                      return prev.filter(data => data !== option)
                    }
                    else {
                      return [...prev, option]
                    }
                  })
                }}
              >
                <p className="text-left capitalize">{option.replace('-', ' ')}</p>
                {selected.includes(option) && <Icon icon="heroicons:check" />}
              </button>
            ))}
          </div>
        )}
      </div>

      <input
        value={JSON.stringify(selected)}
        name={name}
        {...register(name, rules)}
        type="hidden"
      />
    </div>
  )
}
