import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRevalidator } from 'react-router'
import ImageUpload from '../../../components/ImageUpload'
import Input from '../../../components/Input'
import MultiSelect from '../../../components/MultiSelect'
import Navbar from '../../../components/Navbar'
import Select from '../../../components/Select'
import { createItem } from '../api/createItem'

export default function CreatePage() {
  const revalidator = useRevalidator()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      category: '',
      condition: '',
      image_urls: [],
      tags: [],
    },
  })

  const validator = {
    title: {
      required: 'Title is required!',
      minLength: {
        value: 3,
        message: 'Title must have at least 3 characters.',
      },
    },
    category: {
      required: 'Category is required!',
    },
  }

  const [formMessage, setFormMessage] = useState({ success: null, message: '' })
  const [opened, setOpened] = useState(null)

  const onSubmit = async (data) => {
    try {
      const createItemConfig = await createItem({
        ...data,
        image_urls: data.image_urls,
        tags: data.tags,
      })

      if (createItemConfig.status !== 201) {
        throw new Error(createItemConfig.request.responseText)
      }

      reset()
      setFormMessage({ success: true, message: 'Item created successfully.' })
      revalidator.revalidate()
    }
    catch (err) {
      setFormMessage({ success: false, message: err.message })
    }
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
            <Input
              label="Title"
              register={register}
              name="title"
              type="text"
              error={errors.title}
              rules={validator.title}
            />

            <Input
              label="Description"
              register={register}
              name="description"
              type="text"
              error={errors.description}
              rules={validator.description}
            />

            <Select
              label="Category"
              options={['books', 'games', 'tools', 'outdoors']}
              name="category"
              opened={opened}
              setOpened={setOpened}
              register={register}
              setValue={setValue}
              error={errors.category}
              rules={validator.category}
            />

            <Select
              label="Condition"
              options={['New', 'Used']}
              name="condition"
              opened={opened}
              setOpened={setOpened}
              register={register}
              setValue={setValue}
              error={errors.condition}
              rules={validator.condition}
            />

            <ImageUpload
              label="Images"
              name="image_urls"
              register={register}
              setValue={setValue}
              error={errors.images}
              rules={validator.images}
            />

            <MultiSelect
              label="Tags"
              options={['books', 'programming', 'python']}
              name="tags"
              opened={opened}
              setOpened={setOpened}
              register={register}
              setValue={setValue}
              error={errors.tags}
              rules={validator.tags}
            />

            {formMessage && (
              <p
                className={formMessage.success ? 'text-green-600' : 'text-red'}
              >
                {formMessage.message}
              </p>
            )}

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
