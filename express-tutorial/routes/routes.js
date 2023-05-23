
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).send('Hello World!')
});


const mockUser = [{
    id: 1,
    username: 'jane@email.com',
    password: 'Jane123'
}]


const {
    body,
    check,
    validationResult
} = require('express-validator');

router.post('/login',
    body('username').isEmail(),
    check('password')
        .isLength({ min: 5 })
        .withMessage('must be at least 5 chars long'),
    (req, res) => {
        const { username, password } = req.body;
        const errors = validationResult(req);

        // validation
        if (!errors.isEmpty()) {
            return res.status(400).json(
                { errors: errors.array() }
            );
        }

        const user = mockUser.find(users => {
            return users.username === username
                && users.password === password
        })

        if (!user) {
            return res.status(404).send('User Not Found!')
        }

        return res.status(200).send(`Welcome ${username}`)
    })


module.exports = router;
