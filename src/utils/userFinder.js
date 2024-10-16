const userFinder = (users, userTofindID) => {
  const user = users.find(user => user.id === userTofindID)
  return user.username
}

export default userFinder