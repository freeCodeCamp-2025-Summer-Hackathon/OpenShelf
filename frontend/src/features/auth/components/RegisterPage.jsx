import { useForm } from 'react-hook-form'

import Input from '../../../components/Input'
import PasswordInput from '../../../components/PasswordInput'

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
  } = useForm()

  const onSubmit = data => data

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
            required
            name="name"
            info="You can always change this later!"
          />
          <Input
            label="Email Address"
            register={register}
            required
            name="email"
          />
          {/* <Input
            label="Password"
            register={register}
            required
            name="password"
          /> */}
          <PasswordInput label="Password" register={register} name="password" required={true} />
          <Input
            label="Phone Number"
            register={register}
            required={false}
            name="phoneNo"
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

      <p className="text-sm text-stroke-strong absolute bottom-24">Made by Team Lavender 💜</p>
    </div>
  )
}
