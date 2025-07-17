function Tags({ label, type }) {
  const tagStyles = {
    condition: 'bg-lavender-200',
    category: 'bg-[#FFD3D3]',
    genre: 'bg-[#D3D3F1]',
  }

  const typeClass = tagStyles[type]
  return (
    <span className={`${typeClass} font-sans-sm py-1 px-3 rounded-md`}>
      {label}
    </span>
  )
}

export default Tags
