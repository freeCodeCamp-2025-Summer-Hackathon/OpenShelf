import { useForm } from 'react-hook-form'
import Input from '../../../components/Input'
import PasswordInput from '../../../components/PasswordInput'

export default function LoginPage() {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => data

  return (
    <div className="flex flex-col justify-center items-center h-dvh">
      <div className="w-96 mt-8">
        <img src="logo.svg" className="size-12" />

        <h1>
          <span className="text-[#000000]">Welcome to </span>
          <span className="text-[#000000]">OpenShelf</span>
        </h1>

        <div className="w-96 mt-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Email Address"
              register={register}
              required
              name="email"
              type="email"
            />

            <PasswordInput
              label="Password"
              register={register}
              required
              name="password"
            />

            <input
              type="submit"
              className="bg-lavender-500 text-white rounded w-full py-3 mt-6 font-medium cursor-pointer hover:bg-lavender-600 transition-colors"
              value="Sign In"
            />

            <div className="mt-4 flex flex-row items-center gap-8">
              <hr className="border-stroke-weak w-full" />
              <p className="text-[#CACACA] text-1g">Or</p>
              <hr className="border-stroke-weak w-full" />
            </div>

            <button className="border-stroke-weak border-1 px-4 py-3 rounded-xl flex flex-row items-center justify-center gap-4 w-full mt-4 hover:bg-gray-50 transition-colors">
              <img src="google.png" className="size-6" />
              <p className="text-sm text-stroke-strong">Sign in with Google</p>
            </button>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?
                <a
                  href="/register"
                  className="text-lavender-500 hover:text-lavender-600 ml-1 font-medium"
                >
                  Sign up
                </a>
              </p>
            </div>
          </form>
        </div>

        <p className="text-sm text-stroke-strong absolute bottom-24 text-center w-full left-0">
          Made by Team_Lavender 💜
        </p>
      </div>
    </div>
  )
}
