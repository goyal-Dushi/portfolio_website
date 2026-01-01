import { Router, Request, Response } from 'express';
import path from 'path';
import { dataService } from '../services/dataService';
import { emailService } from '../services/emailService';

const router = Router();

// Download Route
router.get('/download', (req: Request, res: Response) => {
    const filePath = path.join(process.cwd(), 'upload_folder', 'Resume.pdf');
    res.download(filePath, 'Dushyant_Resume.pdf');
});

// Data Route
router.get('/data/:filename', async (req: Request, res: Response) => {
    try {
        const { filename } = req.params;
        const data = await dataService.getData(filename);
        res.json(data);
    } catch (error) {
        res.status(404).json({ error: 'Data not found' });
    }
});

// Contact Route
router.post('/contact', async (req: Request, res: Response) => {
    try {
        await emailService.sendEmail(req.body);
        res.json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send email' });
    }
});

export default router;
