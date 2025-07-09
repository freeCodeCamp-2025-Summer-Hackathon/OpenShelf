import { useState } from 'react'

import { useForm } from 'react-hook-form'
import Input from '../../../components/Input'
import PasswordInput from '../../../components/PasswordInput'
import AuthLayout from './AuthLayout'

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const onSubmit = () => {
    setShowSuccessMessage(true)
  }

  return (
    <AuthLayout>
      <AuthLayout.Header>
        Welcome to
        {' '}
        <span className="text-[#000000]">OpenShelf</span>
      </AuthLayout.Header>
      <AuthLayout.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <Input
              label="Display Name"
              register={register}
              name="name"
              info="You can always change this later!"
              type="text"
              error={errors.name}
              rules={{
                required: 'Display name is required!',
                minLength: {
                  value: 3,
                  message: 'At least 3 characters, please...',
                },
              }}
            />
            <Input
              label="Email Address"
              register={register}
              name="email"
              type="email"
              error={errors.email}
              rules={{
                required: 'Email address is required!',
                pattern: {
                  value: /^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
                  message: 'Your email address seems invalid.',
                },
              }}
            />
            {/* <Input
            label="Password"
            register={register}
            required
            name="password"
          /> */}
            <PasswordInput
              label="Password"
              register={register}
              name="password"
              error={errors.password}
              rules={{
                required: 'Password is required!',
                minLength: {
                  value: 8,
                  message: 'At least 8 characters, please...',
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
                  message:
                    'Password must include uppercase, lowercase, numbers and special characters.',
                },
              }}
            />
            <Input
              label="Phone Number"
              register={register}
              name="phoneNo"
              type="tel"
              error={errors.phoneNo}
              rules={{
                maxLength: {
                  value: 15,
                  message: 'At most 15 numbers, please...',
                },
              }}
            />
            <Input
              label="Address"
              register={register}
              required={false}
              name="address"
            />
          </div>

          <input
            type="submit"
            className="bg-lavender-500 text-white rounded-xl w-full py-3 mt-7 cursor-pointer"
            value="Continue"
          />

          <AuthLayout.ButtonDivider />

          <button
            className="border-stroke-weak border-1 px-4 py-3 rounded-xl flex flex-row items-center w-full mt-4 cursor-pointer"
            type="button"
          >
            <img src="google.png" className="size-6" />
            <p className="w-full">Sign in with Google</p>
          </button>
        </form>
        {showSuccessMessage && (
          <div className="flex flex-col justify-center items-center w-1/4 h-1/4 absolute top-8 right-8 bg-lavender-500 rounded-xl">
            <p className="text-xl text-white">
              You've successfully registered!
            </p>
          </div>
        )}
      </AuthLayout.Body>
    </AuthLayout>
  )
}
