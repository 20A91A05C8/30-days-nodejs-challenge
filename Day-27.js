const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

const users = [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
    { id: 2, username: 'user', password: 'user123', role: 'user' }
];

const secretKey = 'your_secret_key';

function authenticateAndAuthorize(role) {
    return function(req, res, next) {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }
        try {
            const decoded = jwt.verify(token, secretKey);
            const user = users.find(u => u.id === decoded.userId);
            if (!user) {
                return res.status(401).json({ message: 'Unauthorized: Invalid token' });
            }
            req.user = user;
            if (role && user.role !== role) {
                return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
            }
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
    };
}

app.get('/admin', authenticateAndAuthorize('admin'), (req, res) => {
    res.json({ message: 'Admin route accessed successfully' });
});

app.get('/user', authenticateAndAuthorize('user'), (req, res) => {
    res.json({ message: 'User route accessed successfully' });
});


app.get('/admin', authenticateAndAuthorize, (req, res) => {
    res.json({ message: 'Admin route accessed successfully' });
});

app.get('/user', authenticateAndAuthorize('user'), (req, res) => {
    res.json({ message: 'User route accessed successfully' });
});

app.listen(3000,()=>console.log('Server is running on port 3000'));
