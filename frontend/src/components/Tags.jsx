import clsx from 'clsx'

function Tags({ label, type }) {
  return (
    <span
      className={clsx(
        'bg-lavender-200' && type === 'condition',
        'bg-[#FFD3D3]' && type === 'category',
        'bg-[#D3D3F1]' && type === 'genre',
        'font-sans-sm py-1 px-3 rounded-md'
      )}
    >
      {label}
    </span>
  )
}

export default Tags
