import { Icon } from '@iconify-icon/react'
import { useState } from 'react'

export default function PasswordInput({ label, register, name, rules, error }) {
  const [type, setType] = useState('password')
  const icon = type === 'password' ? 'heroicons:eye-slash' : 'heroicons:eye'

  const handleType = () => {
    setType(prevType => prevType === 'password' ? 'text' : 'password')
  }

  return (
    <div className="flex flex-col gap-1">
      <label className="font-sans">
        {label}
        {rules?.required && <span className="text-red">*</span>}
      </label>
      <div className="relative flex items-center">
        <input
          {...register(name, rules)}
          type={type}
          placeholder={`Enter your ${label.toLowerCase()}...`}
          className={`${error ? 'border-red' : 'border-stroke-weak'} border-1 pl-4 pr-12 py-3 w-full rounded-xl focus:outline-stroke-strong`}
        />
        <button type="button" className="cursor-pointer">
          <Icon
            icon={icon}
            className="absolute right-3 text-xl -translate-y-1/2 top-1/2 bottom-0"
            onClick={handleType}
          />
        </button>
      </div>
      {error && (
        <p className="text-red">{error.message}</p>
      )}
    </div>
  )
}
