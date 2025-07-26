import { Icon } from '@iconify-icon/react'
import { useState } from 'react'

export default function MultiSelect({
  label,
  name,
  info,
  options,
  opened,
  setOpened,
}) {
  const [selected, setSelected] = useState([])

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row gap-2 items-center">
        <label className="font-sans">{label}</label>
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
      <div className="flex flex-col gap-2">
        <button
          type="button"
          className={`border-stroke-weak border-1 ${
            selected ? 'px-4 py-3' : 'pl-2 pr-4 py-2'
          } rounded-xl focus:outline-stroke-strong flex flex-row justify-between items-center w-full cursor-pointer`}
          onClick={() => {
            setOpened((prev) => (prev === name ? null : name))
          }}
        >
          {selected.length ? (
            <div className="flex flex-row flex-wrap gap-2">
              {selected.map((data) => (
                <div
                  className="px-3 py-1 bg-[#F4F4F4] flex justify-center items-center gap-1 rounded w-fit"
                  key={data}
                >
                  <p>{data}</p>
                  <Icon
                    icon="heroicons:x-mark"
                    className="text-stroke-strong text-lg"
                    onClick={() => {
                      setSelected((prev) => prev.filter((s) => s !== data))
                      setOpened((prev) => (prev === name ? null : name))
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-stroke-strong">
              Select {label.toLowerCase()}
              ...
            </p>
          )}
          <Icon icon="heroicons:chevron-down" className="text-stroke-strong" />
        </button>

        {opened === name && (
          <div className="border-1 border-stroke-weak px-2 py-3 rounded-lg w-[200px] bg-white z-10 flex flex-col gap-1">
            {options.map((option) => (
              <button
                type="button"
                key={option}
                className={`p-3 rounded-lg w-full flex flex-row justify-between items-center cursor-pointer ${
                  selected.includes(option) ? 'bg-[#F2F2F2]' : ''
                }`}
                onClick={() => {
                  setSelected((prev) => {
                    if (prev.includes(option)) {
                      return prev.filter((data) => data !== option)
                    } else {
                      return [...prev, option]
                    }
                  })
                }}
              >
                <p>{option}</p>
                {selected.includes(option) && <Icon icon="heroicons:check" />}
              </button>
            ))}
          </div>
        )}
      </div>

      <input hidden value={JSON.stringify(selected)} name={name}></input>
    </div>
  )
}
