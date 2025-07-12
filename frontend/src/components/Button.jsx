import GoogleIcon from 'frontend\public\google.png'

const Icon = {
  google: GoogleIcon,
}

function Button({ label, variant = 'primary', icon, onClick }) {
  const baseStyles = `
    relative
    cursor-pointer
    rounded-[10px]
    w-[400px]
    h-[40px]
    overflow-hidden
    p-0
    max-[500px]:w-[70%]
    max-[500px]:min-w-[180px]
  `

  const variantStyles
    = variant === 'primary'
      ? 'bg-[#575799] text-white border-none'
      : 'bg-transparent text-black border-[2px] border-white'

  const iconStyles = `
    absolute
    left-[5px]
    top-[50%]
    translate-y-[-50%]
    h-[30px]
    aspect-[1/1]
    object-contain
  `

  const textStyles = `
    absolute
    top-[50%]
    left-[50%]
    translate-x-[-50%]
    translate-y-[-50%]
    white-space-nowrap
    pointer-events-none
    ${variant === 'outline' ? 'max-[400px]:left-[calc(50%+15px)]' : ''}
  `

  return (
    <button type="button" className={`${baseStyles} ${variantStyles}`} onClick={onClick}>
      {icon && <img src={Icon[icon]} className={iconStyles} />}
      <span className={textStyles}>{label}</span>
    </button>
  )
}

export default Button
