import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLoaderData, useRevalidator } from 'react-router'
import { Icon } from '@iconify-icon/react'
import { updateProfile } from '../api/updateProfile'
import Input from '../../../components/Input'

export default function ProfilePage() {
  const { profile } = useLoaderData()
  const [isEditing, setIsEditing] = useState(false)
  const [message, setMessage] = useState(null)
  const revalidator = useRevalidator()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      name: profile?.name || '',
      phone_num: profile?.phone_num || '',
      address: profile?.address || '',
      password: '',
      password_confirm: '',
    },
  })

  const profileAvatar = profile
    ? `https://eu.ui-avatars.com/api/?name=${profile.name}&size=120&background=6565C9&color=fff`
    : ''

  const onSubmit = async (data) => {
    try {
      console.log('Submitting profile data:', data)
      
      // Create the update payload
      const updatePayload = {
        name: data.name,
        phone_num: data.phone_num,
        address: data.address,
      }
      
      // Only include password if it was provided
      if (data.password && data.password.trim()) {
        updatePayload.password = data.password
        updatePayload.password_confirm = data.password_confirm
      }
      
      const response = await updateProfile(updatePayload)
      console.log('Profile update response:', response)
      
      if (response.status === 200) {
        setMessage({ 
          type: 'success', 
          text: data.password ? 'Profile and password updated successfully!' : 'Profile updated successfully!' 
        })
        setIsEditing(false)
        revalidator.revalidate()
        
        // Clear password fields after successful update
        reset({
          name: response.data?.name || data.name,
          phone_num: response.data?.phone_num || data.phone_num,
          address: response.data?.address || data.address,
          password: '',
          password_confirm: '',
        })
      } else {
        console.error('Profile update failed with status:', response.status)
        setMessage({ type: 'error', text: 'Failed to update profile' })
      }
    } catch (error) {
      console.error('Profile update error:', error)
      setMessage({ type: 'error', text: 'An error occurred while updating profile' })
    }
  }

  const handleCancel = () => {
    reset({
      name: profile?.name || '',
      phone_num: profile?.phone_num || '',
      address: profile?.address || '',
      password: '',
      password_confirm: '',
    })
    setIsEditing(false)
    setMessage(null)
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-600">Please log in to view your profile</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="bg-lavender-500 text-white p-6 rounded-t-lg">
          <div className="flex items-center space-x-4">
            <img
              src={profileAvatar}
              alt="Profile"
              className="w-20 h-20 rounded-full border-4 border-white"
            />
            <div>
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <p className="text-lavender-100">{profile.email}</p>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Profile Information</h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 bg-lavender-500 text-white px-4 py-2 rounded-lg hover:bg-lavender-600 transition-colors"
              >
                <Icon icon="heroicons:pencil" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>

          {message && (
            <div
              className={`mb-4 p-3 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-red-100 text-red-700 border border-red-300'
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                {isEditing ? (
                  <Input
                    label="Full Name"
                    register={register}
                    name="name"
                    rules={{ required: 'Name is required' }}
                    error={errors.name}
                    className="w-full"
                  />
                ) : (
                  <>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      {profile.name}
                    </div>
                  </>
                )}
              </div>

              {/* Email Field (Read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="p-3 bg-gray-100 rounded-lg border">
                  {profile.email}
                  <span className="text-sm text-gray-500 ml-2">(Cannot be changed)</span>
                </div>
              </div>

              {/* Phone Number Field */}
              <div>
                {isEditing ? (
                  <Input
                    label="Phone Number"
                    register={register}
                    name="phone_num"
                    type="tel"
                    rules={{
                      pattern: {
                        value: /^[0-9]{10,15}$/,
                        message: 'Please enter a valid phone number (10-15 digits)',
                      },
                    }}
                    error={errors.phone_num}
                    className="w-full"
                  />
                ) : (
                  <>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      {profile.phone_num || 'Not provided'}
                    </div>
                  </>
                )}
              </div>

              {/* Address Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    {...register('address')}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
                    placeholder="Enter your address"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg border min-h-[80px]">
                    {profile.address || 'Not provided'}
                  </div>
                )}
              </div>

              {/* Password Field - Only show when editing */}
              {isEditing && (
                <>
                  <div>
                    <Input
                      label="New Password"
                      register={register}
                      name="password"
                      type="password"
                      rules={{
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters',
                        },
                      }}
                      error={errors.password}
                      className="w-full"
                    />
                    <p className="text-sm text-gray-500 mt-1">Leave empty to keep current password</p>
                  </div>
                  
                  <div>
                    <Input
                      label="Confirm New Password"
                      register={register}
                      name="password_confirm"
                      type="password"
                      rules={{
                        validate: (value, formData) => {
                          if (formData.password && !value) {
                            return 'Please confirm your password'
                          }
                          if (value && value !== formData.password) {
                            return 'Passwords do not match'
                          }
                          return true
                        },
                      }}
                      error={errors.password_confirm}
                      className="w-full"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex space-x-4 mt-8">
                <button
                  type="submit"
                  className="flex items-center space-x-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Icon icon="heroicons:check" />
                  <span>Save Changes</span>
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center space-x-2 bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <Icon icon="heroicons:x-mark" />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
