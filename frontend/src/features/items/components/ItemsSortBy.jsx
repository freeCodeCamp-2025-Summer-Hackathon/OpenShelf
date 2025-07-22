import { Icon } from '@iconify-icon/react'
import clsx from 'clsx'
import { useState } from 'react'

export default function ItemsSortBy() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedOption, setSelectedOption] = useState('alphabetical-asc')

  const options = [
    { label: 'Title (A to Z)', value: 'alphabetical-asc' },
    { label: 'Title (Z to A)', value: 'alphabetical-dsc' },
  ]

  const handleModalVisibility = () => {
    setIsModalVisible(prevIsModalVisibility => !prevIsModalVisibility)
  }

  const handleOptionSelection = (option) => {
    setSelectedOption(option)
    setIsModalVisible(false)
  }

  return (
    <div className="relative">
      <div
        className="flex cursor-pointer items-center gap-1 py-[0.375rem] px-[0.75rem] rounded-[0.375rem] border-2 border-[#858585] max-w-[content] w-full"
        onClick={handleModalVisibility}
      >
        Sort by
        <Icon icon="heroicons:funnel" />
      </div>

      <ul className={
        clsx({
          'rounded border-2 border-[#858585] absolute w-[max-content] p-2 top-[3rem] bg-white': true,
          'block': isModalVisible,
          'hidden': !isModalVisible,
        })
      }
      >
        {options.map(option => (
          <li
            key={option.value}
            className={clsx({
              'cursor-pointer p-2 gap-[4.25rem] rounded flex items-center justify-between': true,
              'bg-[#F2F2F2]': option.value === selectedOption,
            })}
            onClick={() => handleOptionSelection(option.value)}
          >
            <span>{option.label}</span>
            <Icon
              icon="heroicons:check"
              className={clsx({
                'text-[#858585]': true,
                'hidden': selectedOption !== option.value,
              })}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
