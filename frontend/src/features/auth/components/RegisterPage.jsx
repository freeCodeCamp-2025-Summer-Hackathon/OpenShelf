import { useForm } from 'react-hook-form'
import Input from '../../../components/Input'
import PasswordInput from '../../../components/PasswordInput'
import AuthLayout from './AuthLayout'

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
  } = useForm()

  const onSubmit = data => data

  return (
    <AuthLayout>
      <AuthLayout.Header>
        Welcome to
        {' '}
        <span className="text-[#000000]">OpenShelf</span>
      </AuthLayout.Header>
      <AuthLayout.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Display Name"
            register={register}
            required
            name="name"
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

          <AuthLayout.ButtonDivider />
        </form>

        <button className="border-stroke-weak border-1 px-4 py-3 rounded-xl flex flex-row items-center w-full mt-4 cursor-pointer" type="submit">
          <img src="google.png" className="size-6" />
          <p className="w-full">Sign in with Google</p>
        </button>
      </AuthLayout.Body>
    </AuthLayout>
  )
}
