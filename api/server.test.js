const request=require('supertest')
const db=require("./../data/dbConfig")
const server=require('./server')

beforeAll(async()=>{
  await db.migrate.rollback()
  await db.migrate.latest()

})
beforeEach(async()=>{
  await db('users').truncate()
})
afterAll(async()=>{
  await db.destroy()
})

test('test the environment', () => {
  expect(process.env.NODE_ENV).toBe("testing")
})

describe("check the register part",()=>{
  test('register success',async()=>{
    const item = { username: 'foo', password: '1234' }
    
    const result = await request(server).post("/api/auth/register").send(item)
   
    expect(result.status).toBe(201)

  })
  test('register without password', async () => {
    const item = { username: 'foo' }

    const result = await request(server).post("/api/auth/register").send(item)

    expect(result.status).toBe(422)
    expect(result.body).toEqual({ message: 'username and password required' })
  })

})
describe("check the login part", () => {
  test('login success', async () => {
    const item = { username: 'foo', password: '1234' }
    const result = await request(server).post("/api/auth/register").send(item)
    expect(result.status).toBe(201)
    const user = await request(server).post("/api/auth/login").send(item)
    expect(user.body).toMatchObject({ message:'welcome, foo' })

  })

})