const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
    it('should add new user', () => {
        let users = new Users();
        let user = {
            id: '12',
            name: 'Fabio',
            room: 'NodeJS'
        };
        let resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });
});