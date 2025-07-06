import { useForm } from "react-hook-form";

const Input = ({ label, register, required, name }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-sans">
        {label}
        {required && <span className="text-red">*</span>}
      </label>
      <input
        {...register(name, { required })}
        placeholder={`Enter your ${label.toLowerCase()}...`}
        className="border-stroke-weak border-1 px-4 py-3 rounded-xl mb-3 focus:outline-stroke-strong"
      ></input>
    </div>
  );
};

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className="flex flex-col justify-center items-center h-dvh">
      <div className="flex flex-col justify-center items-center">
        <img src="logo.svg" className="size-12"></img>
        <h1 className="font-display-3xl text-[#949494]">
          Welcome to <span className="text-[#000000]">OpenShelf</span>
        </h1>
      </div>
      <div className="w-96 mt-8">
        <form onSubmit={handleSubmit(onSubmit)} >
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
          <Input
            label="Password"
            register={register}
            required
            name="password"
          />
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

          <input type="submit" className="bg-lavender-500 text-white rounded w-full py-2 mt-7" value="Continue"/>

          <div className="mt-4 flex flex-row items-center gap-8">
            <hr className="border-stroke-weak w-full"></hr>
            <p className="text-[#CACACA] text-lg">Or</p>
            <hr className="border-stroke-weak w-full"></hr>
          </div>
        </form>
      </div>
    </div>
  );
}
