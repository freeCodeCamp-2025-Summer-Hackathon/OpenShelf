import { useForm } from 'react-hook-form'
import Input from '../../../components/Input'
import Navbar from '../../../components/Navbar'
import Select from '../../../components/Select'

export default function CreatePage() {
  const {
    register,
    handleSubmit,
  } = useForm()

  const onSubmit = (data) => { data }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-1">
          <h1 className="font-display-2xl">
            Create a new
            <i className="text-lavender-500">Item</i>
          </h1>
          <p>Once you've listed an item, it will be available for anyone to checkout.</p>
        </div>
        <div className="w-[300px]">

          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Title"
              register={register}
              name="title"
              type="text"
            />
            <Input
              label="Description"
              register={register}
              name="description"
              type="text"
            />
            <Select
              label="Condition"
              options={['new', 'used']}
            />
          </form>
        </div>
      </div>
    </div>
  )
}
