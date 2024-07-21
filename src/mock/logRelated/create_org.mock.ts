import { rest } from 'msw'
const baseURL = "http://data.reachplatform.org"
const orgPage = rest.get(baseURL + '/community/organization/userList', (req, res, ctx) => {
    const userName = req.url.searchParams.get('userName')
    //https://stackoverflow.com/questions/69134087/why-the-req-url-searchparams-parameters-object-is-empty-when-i-test-two-get-requ
    if (userName && /[jhon]/.test(userName))
        return res(
            ctx.json([{
                userId: '558849944489',
                userName: 'jhon#885s',
            }, {
                userId: '558899444458',
                userName: 'onjh#885s',
            }, {
                userId: '5588495514528',
                userName: 'hjon#885s',
            }, {
                userId: '5588228442388',
                userName: 'nojh#885s',
            }, {
                userId: '5588228442788',
                userName,
            }
            ])
        )
    return res(ctx.json([]))
})

export {
    orgPage
}