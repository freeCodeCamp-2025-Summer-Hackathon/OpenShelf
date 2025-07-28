import { Icon } from '@iconify-icon/react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useRevalidator } from 'react-router'
import Input from '../../../components/Input'
import PasswordInput from '../../../components/PasswordInput'
import { login } from '../api/login'
import { register as registerUser } from '../api/register'
import AuthLayout from '../components/AuthLayout'

export default function RegisterPage() {
  const navigate = useNavigate()
  const revalidator = useRevalidator()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { name: '', email: '', password: '', passwordConfirm: '', phoneNum: '', address: '' } })

  const validator = {
    name: {
      required: 'Display name is required!',
      minLength: {
        value: 3,
        message: 'At least 3 characters, please...',
      },
    },
    password: {
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
    },
    email: {
      required: 'Email address is required!',
      pattern: {
        value: /^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
        message: 'Your email address seems invalid.',
      },
    },
    phoneNum: {
      required: "Phone number is required!",
      maxLength: {
        value: 15,
        message: 'At most 15 numbers, please...',
      },
    },
  }

  const onSubmit = async (data) => {
    try {
      const registerConfig = await registerUser(data)
      if (registerConfig.status !== 201) {
        throw new Error(registerConfig.request.responseText)
      }

      const loginConfig = await login({ email: data.email, password: data.password })

      if (loginConfig.status !== 200) {
        throw new Error(loginConfig.request.responseText)
      }

      reset()
      navigate('/')
      revalidator.revalidate()
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
              rules={validator.name}
            />
            <Input
              label="Email Address"
              register={register}
              name="email"
              type="email"
              error={errors.email}
              rules={validator.email}
            />
            <PasswordInput
              label="Password"
              register={register}
              name="password"
              error={errors.password}
              rules={validator.password}
            />
            <PasswordInput
              label="Confirm Password"
              register={register}
              name="passwordConfirm"
              error={errors.passwordConfirm}
              rules={validator.password}
            />
            <Input
              label="Phone Number"
              register={register}
              name="phoneNum"
              type="tel"
              error={errors.phoneNum}
              rules={validator.phoneNum}
            />
            <Input
              label="Address"
              register={register}
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
            <Icon icon="logos:google-icon" />
            <p className="w-full">Sign in with Google</p>
          </button>
        </form>
      </AuthLayout.Body>
    </AuthLayout>
  )
}
