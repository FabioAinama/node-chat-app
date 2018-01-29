let expect = require('expect');
let {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () => {
	it('should generate correct message object', () => {
		let from = 'Fabio';
		let text = 'Some message';
		let message = generateMessage(from, text);

		expect(typeof message.createdAt).toBe('number');
		expect(message).toMatchObject({from, text});
	});
});

describe('generateLocationMessage', () => {
	it('should generate correct location object', () => {
		let from = 'UserTest';
		let latitude = 50.89;
		let longitude = 31.5;
		let url = 'https://www.google.fr/maps/@50.89,31.5';
		let message = generateLocationMessage(from, latitude, longitude );

		expect(typeof message.createdAt).toBe('number');
		expect(message).toMatchObject({from, url});
		expect(typeof message.from).toBe('string');
		expect(message.url).toMatch(url);
	});
});