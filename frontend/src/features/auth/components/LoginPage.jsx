import { useForm } from "react-hook-form";
import Input from "../../../components/Input";
import PasswordInput from "../../../components/PasswordInput";
import AuthLayout from "./AuthLayout";

export default function LoginPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => data;

  return (
    <AuthLayout>
      <AuthLayout.Header>
        Log in to <span className="text-[#000000]">OpenShelf</span>
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
  );
}
