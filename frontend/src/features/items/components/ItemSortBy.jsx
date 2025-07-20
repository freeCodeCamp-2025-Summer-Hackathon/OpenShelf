import PropTypes from 'prop-types'

/**
 * A reusable sort selector component for item listings
 *
 * @param {object} props - Component properties
 * @param {string} props.value - The current sort value
 * @param {Function} props.onChange - Callback function when sort changes
 * @param {string} [props.className] - Optional additional CSS classes
 */
function ItemSortBy({ value, onChange, className = '' }) {
  // Sort options that can be used across the application
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'title_asc', label: 'Title: A to Z' },
    { value: 'title_desc', label: 'Title: Z to A' },
  ]

  return (
    <div className={className}>
      <label htmlFor="item-sort-by" className="block mb-2 font-medium">Sort By</label>
      <select
        id="item-sort-by"
        value={value}
        onChange={e => onChange('sort_by', e.target.value)}
        className="p-2 border border-stroke-weak rounded min-w-[180px] focus:border-lavender-500 focus:outline-none focus:ring-1 focus:ring-lavender-500"
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

ItemSortBy.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
}

export default ItemSortBy
