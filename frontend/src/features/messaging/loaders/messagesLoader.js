import { getConversations } from '../api/messaging'

export async function messagesLoader() {
  const conversations = await getConversations()
  return { conversations }
}
