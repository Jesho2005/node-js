import express from 'express';
import cookieParser from 'cookie-parser';
const app = express();
app.use(cookieParser('mysecret'));
const PORT = 3000;
const user=[{username: 'testuser', password: 'testpass'},
{username: 'alice', password: 'alicepass'},
{username: 'bob', password: 'bobpass'}]

app.get('/v/:id', (req, res) => {
    const findu=user.find(u=>u.username===req.params.id);
    if(findu){
        const { id } = req.params;
    res.cookie('username', id, { maxAge: 900000, httpOnly: true,signed: true });
    res.send('Cookie has been set');
    }
});
app.get('/getcookie', (req, res) => {
    console.log(req.signedCookies);
    const cookies = req.signedCookies;
    res.json( cookies);
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});