import { Icon } from '@iconify-icon/react'
import { useState } from 'react'

export default function PasswordInput({
  label,
  register,
  name,
  rules,
  error,
  value,
  onChange,
  id,
  required,
}) {
  const [type, setType] = useState('password')
  const icon = type === 'password' ? 'heroicons:eye-slash' : 'heroicons:eye'

  const handleType = () => {
    setType(prevType => prevType === 'password' ? 'text' : 'password')
  }
  
  // Default placeholder
  const defaultPlaceholder = `Enter your ${label.toLowerCase()}...`
  
  // Support both react-hook-form register and regular onChange pattern
  const inputProps = register
    ? { ...register(name, rules) }
    : {
        name,
        value,
        onChange,
        id: id || name,
        required: required || rules?.required,
      }

  return (
    <div className="flex flex-col gap-1">
      <label className="font-sans" htmlFor={id || name}>
        {label}
        {(rules?.required || required) && <span className="text-red">*</span>}
      </label>
      <div className="relative flex items-center">
        <input
          {...inputProps}
          type={type}
          placeholder={defaultPlaceholder}
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
        <p className="text-red">{typeof error === 'string' ? error : error.message}</p>
      )}
    </div>
  )
}
