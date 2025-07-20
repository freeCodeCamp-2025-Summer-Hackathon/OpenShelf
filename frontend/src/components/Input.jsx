import { Icon } from '@iconify-icon/react'

export default function Input({
  label,
  register,
  name,
  info,
  rules,
  error,
  type = 'text',
  placeholder,
  value,
  onChange,
  id,
  required,
}) {
  // Create placeholder if not provided
  const defaultPlaceholder = placeholder || (label ? `Enter your ${label.toLowerCase()}...` : '')
  
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
      <div className="flex flex-row gap-2 items-center">
        <label className="font-sans" htmlFor={id || name}>
          {label}
          {(rules?.required || required) && <span className="text-red">*</span>}
        </label>
        {info && (
          <div className="relative">
            <Icon
              icon="heroicons:information-circle"
              className="text-stroke-strong peer text-xl mt-1 cursor-pointer"
            />

            <div className="rounded border-1 border-stroke-weak px-2 py-[6px] bg-white text-center w-44 absolute top-[-64px] left-[-72px] shadow-2xs peer-hover:opacity-100 opacity-0 transition-opacity">{info}</div>
          </div>
        )}
      </div>
      <input
        {...inputProps}
        type={type}
        placeholder={defaultPlaceholder}
        className={`${error ? 'border-red' : 'border-stroke-weak'} border-1 px-4 py-3 rounded-xl focus:outline-stroke-strong`}
      />
      {error && (
        <p className="text-red">{typeof error === 'string' ? error : error.message}</p>
      )}
    </div>
  )
}
