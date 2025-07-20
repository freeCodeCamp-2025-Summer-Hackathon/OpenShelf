import { useState } from 'react'
import { useLoaderData, useRevalidator } from 'react-router-dom'
import { getProfile } from '../api/getProfile'
import { updateProfile } from '../api/updateProfile'
import ProfileMenu from '../../../components/ProfileMenu'

export async function profileLoader() {
  try {
    const response = await getProfile()
    return { profile: response.data || null }
  } catch (error) {
    console.error('Error loading profile:', error)
    return { profile: null }
  }
}

export default function ProfilePage() {
  const { profile } = useLoaderData()
  const revalidator = useRevalidator()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(profile || { 
    name: '',
    email: '',
    bio: '',
    location: '' 
  })
  const [isSaving, setIsSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    setErrorMessage('')

    try {
      const response = await updateProfile(formData)
      
      if (response.status === 200) {
        setIsSaving(false)
        setIsEditing(false)
        setSuccessMessage('Profile updated successfully!')
        revalidator.revalidate() // Refresh data
        
        // Hide success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000)
      } else {
        setIsSaving(false)
        setErrorMessage(response.error || 'Failed to update profile. Please try again.')
      }
    } catch (error) {
      setIsSaving(false)
      setErrorMessage('An unexpected error occurred. Please try again.')
      console.error('Profile update error:', error)
    }
  }

  if (!profile) {
    return (
      <div className="flex flex-row justify-center mt-12">
        <div className="w-[1280px] p-6">
          <h1 className="font-display-3xl mb-6">Your Profile</h1>
          <p className="text-lg">Please log in to view your profile.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-row justify-center mt-12">
      <div className="w-[1280px] p-6 grid grid-cols-12 gap-8">
        <div className="col-span-3">
          <div className="sticky top-24">
            <ProfileMenu />
          </div>
        </div>
        <div className="col-span-9">
          <h1 className="font-display-3xl mb-6">Your Profile</h1>
          
          {successMessage && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
              {successMessage}
            </div>
          )}
          
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
              {errorMessage}
            </div>
          )}
        
        {isEditing ? (
          <form onSubmit={handleSubmit} className="max-w-md">
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 font-medium">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 font-medium">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="bio" className="block mb-2 font-medium">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio || ''}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                rows={4}
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="location" className="block mb-2 font-medium">Location</label>
              <input
                id="location"
                type="text"
                name="location"
                value={formData.location || ''}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>
            
            <div className="flex gap-4">
              <button 
                type="submit"
                className="bg-lavender-800 text-white px-5 py-3 rounded-lg disabled:opacity-50"
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
              <button 
                type="button"
                onClick={() => setIsEditing(false)}
                className="border border-lavender-800 text-lavender-800 px-5 py-3 rounded-lg"
                disabled={isSaving}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="max-w-md">
            <div className="mb-4">
              <label className="block mb-2 font-medium">Name</label>
              <p className="p-3 bg-gray-50 rounded-lg">{profile.name}</p>
            </div>
            
            <div className="mb-4">
              <label className="block mb-2 font-medium">Email</label>
              <p className="p-3 bg-gray-50 rounded-lg">{profile.email}</p>
            </div>
            
            {profile.bio && (
              <div className="mb-4">
                <label className="block mb-2 font-medium">Bio</label>
                <p className="p-3 bg-gray-50 rounded-lg">{profile.bio}</p>
              </div>
            )}
            
            {profile.location && (
              <div className="mb-6">
                <label className="block mb-2 font-medium">Location</label>
                <p className="p-3 bg-gray-50 rounded-lg">{profile.location}</p>
              </div>
            )}
            
            <button 
              type="button"
              onClick={() => setIsEditing(true)}
              className="bg-lavender-800 text-white px-5 py-3 rounded-lg"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
  )
}
