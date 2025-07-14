export async function loginUser(email, password) {
  const url = 'http://localhost:8000/api/users/login/'
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    if (!response.ok) {
      if (response.status == '401') {
        const json = await response.json()
        throw new Error(`Error: ${json.error}`)
      }
    }

    const json = await response.json()
    return {
      success: true,
      ...json,
    }
  }
  catch (error) {
    return {
      success: false,
      message: error.message,
    }
  }
}
