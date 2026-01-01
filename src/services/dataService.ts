// In a real app, this might fetch from a DB. 
// For now, we are porting the local JSON files.

import fs from 'fs';
import path from 'path';

// Define types for our data
export interface Project { /* define structure */ }
export interface Skill { /* define structure */ }

export class DataService {
  private dataPath: string;

  constructor() {
    const isProd = process.env.NODE_ENV === 'production' || process.argv.includes('--start-prod');
    this.dataPath = isProd 
        ? path.join(process.cwd(), 'dist/client/data')
        : path.join(process.cwd(), 'client/public/data');
  }

  async getData(filename: string): Promise<any> {
    try {
        // Prevent directory traversal
        const safeName = path.basename(filename).replace(/[^a-zA-Z0-9.-]/g, ''); 
        const filePath = path.join(this.dataPath, safeName);
        
        // Add .json if missing
        const finalPath = filePath.endsWith('.json') ? filePath : `${filePath}.json`;
        
        if (!fs.existsSync(finalPath)) {
            throw new Error(`Data file ${safeName} not found`);
        }

        const raw = fs.readFileSync(finalPath, 'utf-8');
        return JSON.parse(raw);
    } catch (error) {
        console.error(`Error reading data ${filename}:`, error);
        throw error;
    }
  }
}

export const dataService = new DataService();
