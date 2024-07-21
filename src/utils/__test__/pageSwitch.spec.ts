import { beforeEach, SpyInstance, spyOn } from 'vitest'
import { identifyPage } from '../pageSwitch'

const stateList = [
    {
        state: 'home'
    }, {
        state: 'info'
    }, {
        state: 'detail'
    }, {
        state: 'default'
    }
]

describe('identifyPage', () => {
    let URLGetter: SpyInstance

    beforeEach(() => {
        URLGetter = spyOn((window.location.href as unknown as URL).hash, 'userAgent', 'get')
    })

    stateList.forEach(item => {

        it(`should work when earthState is ${item.state}`, () => {

            URLGetter.mockReturnValue(item.state)

            expect(identifyPage(item.state)).toBe(item.state)
        });

    })
});