import { beforeEach, SpyInstance, spyOn } from 'vitest'
import { differBrowser, Browser } from "../browser";

const UAList = [
    [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:98.0) Gecko/20100101 Firefox/98.0",
        Browser.FireFox
    ],
    [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36',
        Browser.Chrome
    ]
]

describe('differBrowser', () => {
    let UAGetter: SpyInstance

    beforeEach(() => {
        UAGetter = spyOn(window.navigator, 'userAgent', 'get')
    })

    UAList.forEach(UA => {

        it(`should work when UA is ${UA[0]}`, () => {
            
            UAGetter.mockReturnValue(UA[0])

            expect(differBrowser(UA[1])).toBe(true)
        });

    })
});