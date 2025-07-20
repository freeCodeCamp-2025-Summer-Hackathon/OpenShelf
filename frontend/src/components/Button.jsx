import { Icon } from '@iconify-icon/react'

function Button({
  children,
  label,
  variant = 'primary',
  icon,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  isLoading = false,
}) {
  const baseStyles = `
    relative
    cursor-pointer
    rounded-[10px]
    py-2
    px-4
    flex
    items-center
    justify-center
    font-medium
    disabled:opacity-70
    disabled:cursor-not-allowed
  `

  const variantStyles = variant === 'primary'
    ? 'bg-lavender-500 text-white border-none hover:bg-lavender-600'
    : variant === 'secondary'
      ? 'bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-100'
      : 'bg-transparent text-lavender-500 border border-lavender-500 hover:bg-lavender-50'

  // If children is provided, use that instead of label
  const content = children || label

  return (
    <button

      type={type}
      className={`${baseStyles} ${variantStyles} ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading
        ? (<Icon icon="eos-icons:loading" className="animate-spin mr-2" />)
        : icon === 'google'
          ? (
              <div className="mr-2 flex items-center justify-center bg-white rounded-full w-5 h-5">
                <span className="text-sm font-bold text-blue-500">G</span>
              </div>
            )
          : null}
      {content}
    </button>
  )
}

export default Button
