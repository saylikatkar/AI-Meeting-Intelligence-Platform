
const API_URL = 'http://127.0.0.1:8000/api/auth'
const SESSION_KEY = 'meetingintel_session_v2'
const ACCESS_KEY = 'meetingintel_access_token'
const REFRESH_KEY = 'meetingintel_refresh_token'

async function apiRequest(endpoint, data) {
  let response

  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  } catch {
    throw new Error(
      'Cannot connect to Django. Make sure the backend is running.'
    )
  }

  const result = await response.json().catch(() => ({}))

  if (!response.ok) {
    const error =
      result.error ||
      result.detail ||
      result.message ||
      Object.values(result).flat().join(' ')

    throw new Error(
      Array.isArray(error)
        ? error.join(' ')
        : typeof error === 'string'
          ? error
          : 'The request failed. Please try again.'
    )
  }

  return result
}

function saveSession(user, access, refresh, remember) {
  auth.logout()

  const storage = remember ? localStorage : sessionStorage

  storage.setItem(SESSION_KEY, JSON.stringify(user))
  storage.setItem(ACCESS_KEY, access)
  storage.setItem(REFRESH_KEY, refresh)
}

export const auth = {
  async register({ name, email, password, confirm_password }) {
    const result = await apiRequest('/register/', {
      full_name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      confirm_password,
    })

    return {
      id: result.user.id,
      name: result.user.full_name,
      email: result.user.email,
      role: 'Member',
    }
  },

  async login({ email, password, role, remember = false }) {
    const result = await apiRequest('/login/', {
      email: email.trim().toLowerCase(),
      password,
    })

    const user = {
      id: result.user.id,
      name: result.user.full_name,
      email: result.user.email,
      role: result.user.role || 'Member',
    }

    if (role && user.role !== role) {
      throw new Error(
        `This account is registered as ${user.role}. Select ${user.role} to continue.`
      )
    }

    saveSession(
      user,
      result.access,
      result.refresh,
      remember
    )

    return user
  },

  current() {
    try {
      const raw =
        sessionStorage.getItem(SESSION_KEY) ||
        localStorage.getItem(SESSION_KEY)

      return JSON.parse(raw || 'null')
    } catch {
      return null
    }
  },

  logout() {
    for (const storage of [localStorage, sessionStorage]) {
      storage.removeItem(SESSION_KEY)
      storage.removeItem(ACCESS_KEY)
      storage.removeItem(REFRESH_KEY)
    }
  },

  accessToken() {
    return (
      sessionStorage.getItem(ACCESS_KEY) ||
      localStorage.getItem(ACCESS_KEY)
    )
  },
}
