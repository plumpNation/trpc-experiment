import PocketBase from 'pocketbase'

export const db = new PocketBase('http://127.0.0.1:8090')

// Since we are using this from the backend, we may often have multiple requests
// happening at the same time, which we don't want to be autocancelled.
// Easier to just configure it this way rather than add this to every model function.
db.autoCancellation(false)

/**
 * This is a bit silly really, using pocketbase like this.
 * Oh well, it's a learning project anyway.
 */
const connect = async () => {
  console.log('connecting')
  await db.admins.authWithPassword('plumpnation@gmail.com', 'safe123456')
  console.log('connected')
}

connect()
