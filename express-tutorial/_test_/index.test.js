
const axios = require('axios');

const url = 'http://127.0.0.1:3000/router';

describe('The router', () => {
    test('The get route', async () => {
        const res = await axios.get(url)

        expect(res).toBeTruthy()
        expect(res.status).toBe(200)
        expect(res.data).toEqual('Hello World!')
    })
})


describe('The router', () => {
    test('The login route with the user', async () => {
        const res = await axios.post(`${url}/login`, {
            username: 'jane@email.com',
            password: 'Jane123'
        })
        expect(res.status).toBe(200)
        expect(res.data).toEqual('Welcome jane@email.com')
    });

    test('The login route with the wrong user', async () => {
        try {
            await axios.post(`${url}/login`, {
                username: 'john@email.com',
                password: 'john123'
            })

        } catch (error) {
            expect(error.response.status).toBe(404)
            expect(error.message).toEqual(
                'Request failed with status code 404'
            )
        }
    })
})


describe('Validation', () => {
    test('Username (email) validation fail', async () => {
        try {
            await axios.post(`${url}/login`, {
                username: 'jane',
                password: 'Jane123'
            })

        } catch (error) {
            // Retrieve the message from the validator.
            const message = error.response.data.errors[0].msg;

            expect(error.response.data).toBeTruthy()
            expect(error.response.status).toBe(400);
            expect(message).toEqual('Invalid value')
            expect(error.message).toEqual(
                'Request failed with status code 400'
            )
        }
    })

    test('Password validation fail', async () => {
        try {
            await axios.post(`${url}/login`, {
                username: 'jane@email.com',
                password: 'Jan'
            })

        } catch (error) {
            const message = error.response.data.errors[0].msg;

            expect(error.response.data).toBeTruthy()
            expect(error.response.status).toBe(400);
            expect(message).toEqual('must be at least 5 chars long')
        }
    })
})

