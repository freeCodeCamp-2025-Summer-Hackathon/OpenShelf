import { Icon } from '@iconify-icon/react'
import { useState } from 'react'

export default function Select({
  label,
  name,
  info,
  options,
  opened,
  setOpened,
}) {
  const [selected, setSelected] = useState(null)

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row gap-2 items-center">
        <label className="font-sans">
          {label}
          {/* {rules?.required && <span className="text-red">*</span>} */}
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
      <div className="relative">
        <button
          type="button"
          className="border-stroke-weak border-1 px-4 py-3 rounded-xl focus:outline-stroke-strong flex flex-row justify-between items-center w-full cursor-pointer"
          onClick={() => {
            setOpened((prev) => (prev === name ? null : name))
          }}
        >
          {selected ? (
            <p>{selected}</p>
          ) : (
            <p className="text-stroke-strong">
              Select {label.toLowerCase()}
              ...
            </p>
          )}
          <Icon icon="heroicons:chevron-down" className="text-stroke-strong" />
        </button>

        {opened === name && (
          <div className="absolute top-14 border-1 border-stroke-weak px-2 py-3 rounded-lg w-[200px] bg-white z-10">
            {options.map((option) => (
              <button
                type="button"
                key={option}
                className={`p-3 rounded-lg w-full flex flex-row justify-between items-center cursor-pointer ${
                  selected === option ? 'bg-[#F2F2F2]' : ''
                }`}
                onClick={() => {
                  setSelected(option)
                }}
              >
                <p>{option}</p>
                {selected === option && <Icon icon="heroicons:check" />}
              </button>
            ))}
          </div>
        )}
      </div>

      <input hidden value={selected} name={name}></input>
    </div>
  )
}
