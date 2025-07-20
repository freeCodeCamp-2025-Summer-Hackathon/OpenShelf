import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify-icon/react'
import Input from '../../../components/Input'
import Button from '../../../components/Button'

export default function AddItemPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    condition: 'good',
    availability: true,
    image: null,
    tags: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target
    
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0]
      })
      
      // Create image preview
      if (files[0]) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setImagePreview(e.target.result)
        }
        reader.readAsDataURL(files[0])
      } else {
        setImagePreview(null)
      }
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Create form data for file upload
      const itemData = new FormData()
      itemData.append('title', formData.title)
      itemData.append('description', formData.description)
      itemData.append('category', formData.category)
      itemData.append('condition', formData.condition)
      itemData.append('available', formData.availability)
      
      if (formData.tags) {
        const tagsArray = formData.tags.split(',').map(tag => tag.trim())
        itemData.append('tags', JSON.stringify(tagsArray))
      }
      
      if (formData.image) {
        itemData.append('image', formData.image)
      }
      
      // TODO: Replace with actual API call when backend is ready
      // const response = await createItem(itemData)
      
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Navigate to the user's items page after successful creation
      navigate('/profile/items', { 
        replace: true,
        state: { message: 'Item added successfully!' } 
      })
    } catch (error) {
      console.error('Error adding item:', error)
      setErrors({
        submit: 'Failed to add item. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="font-display-3xl mb-2 text-2xl sm:text-3xl">Add New Item</h1>
        <p className="text-gray-600">Share an item with your community</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Left column */}
          <div className="space-y-6">
            <div>
              <Input
                label="Title"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter item title"
                error={errors.title}
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your item, including relevant details about its features and condition"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-lavender-500 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">{errors.description}</p>
              )}
            </div>
            
            <div>
              <Input
                label="Category"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. Books, Tools, Games"
                error={errors.category}
                required
              />
            </div>
            
            <div>
              <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                Condition
              </label>
              <select
                id="condition"
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-lavender-500"
              >
                <option value="new">Like New</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>
          </div>
          
          {/* Right column */}
          <div className="space-y-6">
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Item Image
              </label>
              <div className={`border-2 border-dashed rounded-md p-4 text-center ${
                imagePreview ? 'border-lavender-300' : 'border-gray-300 hover:border-lavender-300'
              }`}>
                {imagePreview ? (
                  <div className="relative">
                    <img 
                      src={imagePreview} 
                      alt="Item preview" 
                      className="mx-auto h-48 object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({...formData, image: null})
                        setImagePreview(null)
                      }}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                    >
                      <Icon icon="heroicons:x-mark" className="text-lg" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Icon icon="heroicons:photo" className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="text-sm text-gray-600">
                      <label htmlFor="file-upload" className="cursor-pointer text-lavender-600 hover:underline">
                        Upload an image
                      </label>
                      <input
                        id="file-upload"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <p>or drag and drop</p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <Input
                label="Tags (separated by commas)"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="e.g. fiction, mystery, hardcover"
              />
              <p className="text-xs text-gray-500 mt-1">
                Add relevant tags to help others find your item
              </p>
            </div>
            
            <div className="flex items-center">
              <input
                id="availability"
                name="availability"
                type="checkbox"
                checked={formData.availability}
                onChange={handleChange}
                className="h-4 w-4 text-lavender-600 focus:ring-lavender-500 border-gray-300 rounded"
              />
              <label htmlFor="availability" className="ml-2 block text-sm text-gray-700">
                This item is currently available for borrowing
              </label>
            </div>
          </div>
        </div>
        
        {errors.submit && (
          <div className="text-red-500 text-sm">{errors.submit}</div>
        )}
        
        <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto order-2 sm:order-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
            className="w-full sm:w-auto order-1 sm:order-2"
          >
            Add Item
          </Button>
        </div>
      </form>
    </div>
  )
}
