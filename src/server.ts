import express from 'express';
import path from 'path';
import { env } from './config/env';
import apiRoutes from './routes';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', apiRoutes);

// Serve Static Frontend (Production)
// In local production, we serve 'dist/client'. 
// On Vercel, we let Vercel serve static files from the 'dist/client' directory via vercel.json.
if ((process.env.NODE_ENV === 'production' || process.argv.includes('--start-prod')) && !process.env.VERCEL) {
    const clientPath = path.join(__dirname, '../client');
    app.use(express.static(clientPath));
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(clientPath, 'index.html'));
    });
}

// Start Server (only if not running on Vercel)
if (!process.env.VERCEL) {
    app.listen(env.PORT, () => {
        console.log(`Server running on port ${env.PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
}

export default app;
