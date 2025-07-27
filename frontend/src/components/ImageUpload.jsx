import { useState } from 'react'

export default function ImageUpload({
  label,
  info,
  name,
  register,
  error,
  rules,
}) {
  const [images, setImages] = useState([])
  function handleFileChange(e) {
    const files = Array.from(e.target.files)
    setImages(files.map(file => URL.createObjectURL(file)))
    // not sure how to upload the image to the server
    e.target.value = null
  }

  return (
    <div>
      <div className="flex flex-row gap-2 items-center">
        <label className="font-sans">
          {label}
          {rules?.required && <span className="text-red">*</span>}
        </label>
        {info && (
          <div className="relative">
            <Icon
              icon="heroicons:information-circle"
              className="text-stroke-strong peer text-xl mt-1 cursor-pointer"
            />

            <div className="rounded border-1 border-stroke-weak px-2 py-[6px] bg-white text-center w-44 absolute top-[-64px] left-[-72px] shadow-2xs peer-hover:opacity-100 opacity-0 transition-opacity text-stroke-strong">
              {info}
            </div>
          </div>
        )}
      </div>
      <input
        id="images"
        type="file"
        name={name}
        multiple
        accept="images/*"
        onInput={handleFileChange}
        {...register(name, rules)}
        hidden
        defaultValue=""
      />

      <label htmlFor="images" className="cursor-pointer">
        {images.length > 0
          ? (
              <div
                className={`border-1 ${
                  error ? 'border-red' : 'border-stroke-weak'
                } rounded-xl flex flex-col justify-center items-center gap-2 h-[190px]`}
              >
                <img src="undraw-images-selected.svg"></img>
                <p className="text-sm text-stroke-strong text-center">
                  You have selected
                  {' '}
                  <span>{images.length}</span>
                  {' '}
                  images.
                  <br></br>
                  <u className="text-lavender-500">Choose again.</u>
                </p>
              </div>
            )
          : (
              <div
                className={`border-1 ${
                  error ? 'border-red' : 'border-stroke-weak'
                } rounded-xl flex flex-col justify-center items-center gap-2 h-[190px]`}
              >
                <img src="undraw-images-empty.svg"></img>
                <p className="text-sm text-stroke-strong text-center">
                  <u className="text-lavender-500">Choose</u>
                  {' '}
                  images from your
                  computer
                  <br></br>
                  {' '}
                  for your item.
                </p>
              </div>
            )}
      </label>
    </div>
  )
}
