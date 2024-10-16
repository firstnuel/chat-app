const truncateMessage = (msg, maxLength = 50) => {

  if (!msg) return ''
  return msg.length > maxLength ? `${msg.slice(0, maxLength)}...` : msg
}

export const lastMsgTime = (sentMessage, receivedMessage=null) => {
  const sentMsg = sentMessage[0]
  const receivedMsg = receivedMessage[0]

  if (!sentMsg) return new Date(receivedMsg.createdAt).getTime()
  if (!receivedMsg) return new Date(sentMsg.createdAt).getTime()

  const sentTime = new Date(sentMsg.createdAt)
  const receivedTime = new Date(receivedMsg.createdAt)

  if (sentTime > receivedTime) return new Date(sentMsg.createdAt).getTime()
  return new Date(receivedMsg.createdAt).getTime()
}


export const lastMsg = (sentMessage, receivedMessage=null) => {
  const sentMsg = sentMessage[0]
  const receivedMsg = receivedMessage[0]

  if (!sentMsg) return truncateMessage(receivedMsg.content)
  if (!receivedMsg) return truncateMessage(sentMsg.content)

  const sentTime = new Date(sentMsg.createdAt)
  const receivedTime = new Date(receivedMsg.createdAt)

  if (sentTime > receivedTime) return truncateMessage(sentMsg.content)
  return truncateMessage(receivedMsg.content)
}

