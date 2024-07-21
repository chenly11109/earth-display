import { rest } from 'msw'

const login = rest.post('/login', (req: any, res, ctx) => {
    const { username } = req.body

    return res(
        ctx.json({
            id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
            username,
            firstName: 'John',
            lastName: 'Maverick',
        })
    )
})

export {
    login
}