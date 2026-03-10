const { signup } = require('./api/src/services/auth');

async function testSignup() {
    try {
        const user = await signup({
            email: 'test' + Math.random() + '@example.com',
            firstName: 'Test',
            lastName: 'User',
            password: 'password123'
        });
        console.log('Signup Successful:', user);
    } catch (e) {
        console.error('Signup Failed:', e.message);
    }
}

testSignup();
