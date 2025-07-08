import { useForm } from 'react-hook-form'

import Input from '../../../components/Input'
import PasswordInput from '../../../components/PasswordInput'
import { useState } from "react"

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const onSubmit = () => {
    setShowSuccessMessage(true)
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-dvh">
      <div className="flex flex-col justify-center items-center">
        <img src="logo.svg" className="size-12"></img>
        <h1 className="font-display-3xl text-[#949494]">
          Welcome to
          {' '}
          <span className="text-[#000000]">OpenShelf</span>
        </h1>
      </div>
      <div className="w-96 mt-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Display Name"
            register={register}
            name="name"
            info="You can always change this later!"
            type="text"
            error={errors.name}
            rules={{
              required: "Display name is required!",
              minLength: {
                value: 3,
                message: "At least 3 characters, please..."
              }
            }}
          />
          <Input
            label="Email Address"
            register={register}
            name="email"
            type="email"
            error={errors.email}
            rules={{
              required: "Email address is required!",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Your email address seems invalid."
              }
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
              required: "Password is required!",
              minLength: {
                value: 8,
                message: "At least 8 characters, please..."
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
                message: "Password must include uppercase, lowercase, numbers and special characters."
              }
            }}
          />
          <Input
            label="Phone Number"
            register={register}
            name="phoneNo"
            type="tel"
            error={errors.phoneNo}
            rules={{
              maxLength: "At most 15 numbers, please..."
            }}
          />
          <Input
            label="Address"
            register={register}
            required={false}
            name="address"
          />

          <input type="submit" className="bg-lavender-500 text-white rounded w-full py-2 mt-7 cursor-pointer" value="Continue" />

          <div className="mt-4 flex flex-row items-center gap-8">
            <hr className="border-stroke-weak w-full"></hr>
            <p className="text-[#CACACA] text-lg">Or</p>
            <hr className="border-stroke-weak w-full"></hr>
          </div>
        </form>

        <button className="border-stroke-weak border-1 px-4 py-3 rounded-xl flex flex-row items-center w-full mt-4 cursor-pointer" type="submit">
          <img src="google.png" className="size-6" />
          <p className="w-full">Sign in with Google</p>
        </button>
      </div>

      {showSuccessMessage && (
        <div className="flex flex-col justify-center items-center w-1/4 h-1/4 absolute top-8 right-8 bg-lavender-500 rounded-xl">
          <p className="text-xl text-white">You've successfully registered!</p>
        </div>
      )}

      <p className="text-sm text-stroke-strong absolute bottom-24">Made by Team Lavender 💜</p>
    </div>
  )
}
