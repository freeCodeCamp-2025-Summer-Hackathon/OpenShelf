import { useForm } from 'react-hook-form'
import Input from '../../../components/Input'
import Navbar from '../../../components/Navbar'
import Select from '../../../components/Select'
import MultiSelect from '../../../components/MultiSelect'
import ImageUpload from '../../../components/ImageUpload'
import { useState } from 'react'

export default function CreatePage() {
  const { register, handleSubmit } = useForm()
  const [opened, setOpened] = useState(null)

  const onSubmit = (data) => {
    data
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center py-30">
        <div className="flex flex-col justify-center items-center gap-1 mb-4 w-[400px] text-center">
          <h1 className="font-display-2xl">
            Create a new
            <i className="text-lavender-500">Item</i>
          </h1>
          <p>
            Once you've listed an item, it will be available for anyone to
            checkout.
          </p>
        </div>
        <div className="w-[360px]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <Input label="Title" register={register} name="title" type="text" />
            <Input
              label="Description"
              register={register}
              name="description"
              type="text"
            />

            <Select
              label="Category"
              options={['books', 'games', 'tools', 'outdoors']}
              name="category"
              opened={opened}
              setOpened={setOpened}
            />

            <Select
              label="Condition"
              options={['new', 'used']}
              name="condition"
              opened={opened}
              setOpened={setOpened}
            />

            <ImageUpload label="Images" name="images" />

            <MultiSelect
              label="Tags"
              options={['books', 'programming', 'python']}
              name="tags"
              opened={opened}
              setOpened={setOpened}
            />

            <input
              type="submit"
              className="bg-lavender-500 text-white rounded-xl w-full py-3 mt-5 cursor-pointer"
              value="Create"
            />
          </form>
        </div>
      </div>
    </div>
  )
}
