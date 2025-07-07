import { Icon } from '@iconify-icon/react'
import { useState } from 'react'

export default function PasswordInput({ label, required, register, name }) {
  const [type, setType] = useState('password')
  const icon = type === 'password' ? 'heroicons:eye-slash' : 'heroicons:eye'

  const handleType = () => {
    setType(prevType => prevType === 'password' ? 'text' : 'password')
  }

  return (
    <div className="flex flex-col gap-1">
      <label className="font-sans">
        {label}
        {required && <span className="text-red">*</span>}
      </label>
      <div className="relative flex items-center">
        <input
          {...register(name, { required })}
          type={type}
          placeholder={`Enter your ${label.toLowerCase()}...`}
          className="border-stroke-weak border-1 pl-4 pr-12 py-3 w-full rounded-xl mb-3 focus:outline-stroke-strong"
        />
        <button type="button" className="cursor-pointer">
          <Icon
            icon={icon}
            className="absolute right-3 text-xl -translate-y-1/2 top-1/2 bottom-0"
            onClick={handleType}
          />
        </button>
      </div>
    </div>
  )
}
