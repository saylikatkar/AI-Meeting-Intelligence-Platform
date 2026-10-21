const USERS_KEY = 'meetingintel_users_v2'
const SESSION_KEY = 'meetingintel_session_v2'

const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : {}
// Admin and Manager accounts come ONLY from your local .env file (never committed).
// If they are not set, no Admin/Manager account exists and only Member sign-up works.
const STARTER_ACCOUNTS = [
  {
    id: 'configured-admin',
    name: 'Administrator',
    email: (env.VITE_ADMIN_EMAIL || '').trim().toLowerCase(),
    password: env.VITE_ADMIN_PASSWORD || '',
    role: 'Admin',
  },
  {
    id: 'configured-manager',
    name: 'Meeting Manager',
    email: (env.VITE_MANAGER_EMAIL || '').trim().toLowerCase(),
    password: env.VITE_MANAGER_PASSWORD || '',
    role: 'Manager',
  },
].filter(account => account.email && account.password)

function getStorage() {
  if (typeof localStorage !== 'undefined') return localStorage
  return {
    _data: {},
    getItem(k) { return this._data[k] || null },
    setItem(k, v) { this._data[k] = String(v) },
    removeItem(k) { delete this._data[k] }
  }
}

function readUsers() {
  const storage = getStorage()
  let users
  try {
    const raw = storage.getItem(USERS_KEY) || '[]'
    users = JSON.parse(raw)
    if (!Array.isArray(users)) users = []
  } catch {
    users = []
  }

  let changed = false
  for (const account of STARTER_ACCOUNTS) {
    const index = users.findIndex(user => user.email?.toLowerCase() === account.email)
    if (index === -1) {
      users.push(account)
      changed = true
    } else {
      users[index] = { ...users[index], ...account }
      changed = true
    }
  }
  if (changed) saveUsers(users)
  return users
}

function saveUsers(users) {
  const storage = getStorage()
  storage.setItem(USERS_KEY, JSON.stringify(users))
}

export const auth = {
  async register({ name, email, password }) {
    const users = readUsers()
    const normalized = email.trim().toLowerCase()
    if (users.some(user => user.email === normalized)) {
      throw new Error('An account with this email already exists.')
    }
    const user = {
      id: (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()),
      name: name.trim(),
      email: normalized,
      password,
      role: 'Member',
    }
    saveUsers([...users, user])
    return this.login({ email: normalized, password, role: 'Member' })
  },

  async login({ email, password, role }) {
    const user = readUsers().find(
      item => item.email === email.trim().toLowerCase() && item.password === password
    )
    if (!user) throw new Error('Email or password is incorrect.')
    if (user.role !== role) {
      throw new Error(`This account is registered as ${user.role}. Select ${user.role} to continue.`)
    }
    const session = { id: user.id, name: user.name, email: user.email, role: user.role }
    const storage = getStorage()
    storage.setItem(SESSION_KEY, JSON.stringify(session))
    return session
  },

  current() {
    try {
      const storage = getStorage()
      const raw = storage.getItem(SESSION_KEY)
      return JSON.parse(raw || 'null')
    } catch {
      return null
    }
  },

  logout() {
    const storage = getStorage()
    storage.removeItem(SESSION_KEY)
  },
}
