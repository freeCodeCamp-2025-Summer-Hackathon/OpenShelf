import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useRevalidator } from 'react-router'
import Input from '../../../components/Input'
import PasswordInput from '../../../components/PasswordInput'
import { login as loginUser } from '../api/login'
import AuthLayout from './AuthLayout'

export default function LoginPage() {
  const navigate = useNavigate()
  const revalidtor = useRevalidator()
  const { register, handleSubmit } = useForm({ defaultValues: { email: '', password: '' } })

  const [formMessage, setFormMessage] = useState({ success: null, message: '' })

  const onSubmit = async (data) => {
    try {
      const config = await loginUser(data)
      if (config.status !== 200) {
        throw new Error(config.request.responseText)
      }

      const responseJSON = JSON.parse(config.request.responseText)
      setFormMessage({ success: true, message: responseJSON.message })
      navigate('/')
      revalidtor.revalidate()
    }
    catch (err) {
      setFormMessage({ success: false, message: err.message })
    }
  }

  return (
    <AuthLayout>
      <AuthLayout.Nav>
        <Link to="/register" className=" text-stroke-strong underline">
          Sign up
        </Link>
      </AuthLayout.Nav>

      <AuthLayout.Header>
        Log in to
        {' '}
        <span className="text-[#000000]">OpenShelf</span>
      </AuthLayout.Header>

      <AuthLayout.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
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

            {formMessage && (
              <p
                className={formMessage.success ? 'text-green-600' : 'text-red'}
              >
                {formMessage.message}
              </p>
            )}
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
      </AuthLayout.Body>
    </AuthLayout>
  )
}
