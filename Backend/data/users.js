import bcrypt from 'bcrypt'

const users = [
    {
        name: 'Test Instructor',
        email: 'test@gmail.com',
        password: bcrypt.hashSync('test123', 10),
        isInstructor: true  
    },

    {
        name: 'Ian Lombu',
        email: 'ian@gmail.com',
        password: bcrypt.hashSync('ian123', 10),
    },
]

export default users