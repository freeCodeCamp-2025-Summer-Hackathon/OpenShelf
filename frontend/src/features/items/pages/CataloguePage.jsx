import { useLoaderData } from 'react-router'
import { getItems } from '../api/getItems'
import Item from '../components/Item'

export async function catalogueLoader() {
  const items = await getItems()
  return { items }
}

export default function CataloguePage() {
  const { items } = useLoaderData()

  return (
    <div className="py-[10rem] container mx-auto">
      <div className="grid grid-cols-8">
        {items.map(item => <Item key={item.id} item={item} />)}
      </div>
    </div>
  )
}
