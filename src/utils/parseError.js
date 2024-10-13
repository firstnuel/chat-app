const parseError = (error) => {
  const status = error.status

  if (status === 500) return { status: true, msg: 'An account with this username or email already exists. Please log in.' }
  if (status === 400) return { status: true, msg: 'Username and name must be at least 3 characters long.' }
  if (status === 401) return { status: true, msg: 'Invalid username or password. Please try again.' }

  return { status: true, msg: 'An unexpected error occurred. Please try again later.' }
}

export default parseError
