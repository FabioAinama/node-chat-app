const expect = require('expect');
const {isRealString} = require('./validation.js');


describe('isRealString', () =>{
    it('should reject non-string values', () => {
        let res = isRealString(98);
        expect(res).toBe(false);
    });

    it('should reject string with only spaces', () => {
        let res = isRealString('     ');
        expect(res).toBe(false);
    });

    it('should allowstring with non-spaces characters', () => {
        let res = isRealString('   test   ');
        expect(res).toBe(true);
    });
});