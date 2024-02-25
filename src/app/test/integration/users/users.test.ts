import { saveUser } from "../../../controllers/users/users.controller"
import { UserSchema } from "../../../services/schemas/users.schema"

describe('Test function from users', () => {
    const schema = new UserSchema()
    schema.name = 'test' + Date.now()
    schema.document = '635.293.280-06'
    schema.password = '11111111'
    schema.email = schema.name + "@gmail.com"

    it('Sucess Save user', async () => {
        const user = await saveUser(schema)
        expect(user).toHaveProperty('id')
        expect(user).toHaveProperty('uuid')
    })

    it('Error Save user - Email already in use', async () => {
        try {
            await saveUser(schema)
        } catch (error) {
            expect(error).toHaveProperty('code', 'USR001')
        }
    })

    it('Error Save user - Document already in use', async () => {
        try {
            schema.email = 'test' + Date.now()
            await saveUser(schema)
        } catch (error) {
            expect(error).toHaveProperty('code', 'USR002')
        }
    })
})