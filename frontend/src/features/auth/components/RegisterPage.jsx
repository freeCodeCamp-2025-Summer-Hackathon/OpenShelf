import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import Input from '../../../components/Input'
import PasswordInput from '../../../components/PasswordInput'
import { register as registerUser } from '../api/register'
import AuthLayout from './AuthLayout'

export default function RegisterPage() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ name: '', email: '', password: '', passwordConfirm: '', phoneNum: '', address: '' })

  const onSubmit = async (data) => {
    try {
      const config = await registerUser(data)
      if (config.status !== 201) {
        throw new Error(config.request.responseText)
      }
      reset()
      navigate('/')
    }
    catch (err) {
      console.error(err)
    }
  }

  return (
    <AuthLayout>
      <AuthLayout.Nav>
        <Link to="/login" className=" text-stroke-strong underline">
          Log in
        </Link>
      </AuthLayout.Nav>

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
            <PasswordInput
              label="Confirm Password"
              register={register}
              name="passwordConfirm"
              error={errors.passwordConfirm}
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
              name="phoneNum"
              type="tel"
              error={errors.phoneNum}
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
      </AuthLayout.Body>
    </AuthLayout>
  )
}
