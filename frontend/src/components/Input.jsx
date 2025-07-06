export default function Input({ label, register, required, name }) {
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