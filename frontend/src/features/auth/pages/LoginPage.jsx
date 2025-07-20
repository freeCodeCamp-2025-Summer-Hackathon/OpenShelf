
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useRevalidator } from 'react-router-dom'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import PasswordInput from '../../../components/PasswordInput'
import { login as loginUser } from '../api/login'
import AuthLayout from '../components/AuthLayout'
import { validation } from '../validation'

export default function LoginPage() {
  const navigate = useNavigate()
  const revalidtor = useRevalidator()
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { email: '', password: '' } })

  const [formMessage, setFormMessage] = useState({ success: null, message: '' })

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data)
      
      // Axios returns the data already parsed
      setFormMessage({ success: true, message: response.data.message || 'Login successful!' })
      navigate('/')
      revalidtor.revalidate()
    }
    catch (err) {
      console.error('Login error:', err)
      const errorMessage = err.response?.data?.message
        || err.response?.data?.error
        || err.message
        || 'Login failed. Please check your credentials and try again.'
      setFormMessage({ success: false, message: errorMessage })
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
              name="email"
              type="email"
              rules={validation.email}
              error={errors.email}
            />

            <PasswordInput
              label="Password"
              register={register}
              name="password"
              rules={{ required: 'Password is required.' }}
              error={errors.password}
            />

            {formMessage && (
              <p
                className={formMessage.success ? 'text-green-600' : 'text-red'}
              >
                {formMessage.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full py-3 mt-7"
          >
            Continue
          </Button>

          <AuthLayout.ButtonDivider />

          <Button
            variant="secondary"
            className="w-full mt-4"
            type="button"
            icon="google"
          >
            Sign in with Google
          </Button>
        </form>
      </AuthLayout.Body>
    </AuthLayout>
  )
}
