import express from 'express';
import { handler } from '../build/handler.js'; // This is the SvelteKit handler after build
import cookieParser from 'cookie-parser';

const app = express();

// Use middleware like cookieParser to handle cookies
app.use(cookieParser());








app.get('/api/logout', (req, res) => {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    res.json({ message: 'Logged out' });
});

// Everything else (static files, SSR) is handled by SvelteKit
app.use(handler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
