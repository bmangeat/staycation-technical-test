import { Client } from 'pg'

const client = new Client({
  user: 'staycation',
  host: 'localhost',
  database: 'staycation',
  password: 'password',
  port: 5432
})
await client.connect()

export default client
