import { Icon } from "@iconify-icon/react";

export default function Input({ label, register, required, name, info }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row gap-2 items-center">
        <label className="font-sans">
          {label}
          {required && <span className="text-red">*</span>}
        </label>
        {info && (
          <div className="relative">
            <Icon
              icon="heroicons:information-circle"
              className="text-stroke-strong peer text-xl mt-1 cursor-pointer"
            />

            <div className="rounded border-1 border-stroke-weak px-2 py-[6px] bg-white text-center w-44 absolute top-[-68px] left-[-72px] shadow-2xs peer-hover:opacity-100 opacity-0 transition-opacity">{info}</div>
          </div>
        )}
      </div>
      <input
        {...register(name, { required })}
        placeholder={`Enter your ${label.toLowerCase()}...`}
        className="border-stroke-weak border-1 px-4 py-3 rounded-xl mb-3 focus:outline-stroke-strong"
      />
    </div>
  );
}
