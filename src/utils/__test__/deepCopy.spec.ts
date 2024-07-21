import { deepCopy } from "../public";

describe('deepCopy', () => {
    it('should work as expected', () => {
        const original = {
            a: 1,
            b: {
                c: [2,3,4,5],
                d: {
                    e: 3,
                    f: 4,
                },
            },
        }

        const copy = deepCopy(original)

        expect(copy).toEqual(original)
    });
});