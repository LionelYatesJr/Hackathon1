import express, { Request, Response } from 'express';
import fs from 'fs';
import csvParser from 'csv-parser';
import { Book } from './models/book';
import { Potion } from './models/potion';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

// Define a generic type for the row data
type RowData = { id: number; title: string; author?: string; genre?: string; availability?: 'Available' | 'Checked Out' | 'Out of Stock'; waitlist?: string[]; effect?: string; numberOfCopies: number };

// Function to read data from CSV file and parse it into an array of objects
const readDataFromCSV = <T>(filePath: string): Promise<T[]> => {
  const data: T[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row: RowData) => {
        // Cast the row to type T
        const item = row as T;
        data.push(item);
      })
      .on('end', () => {
        resolve(data);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

// Books endpoint to retrieve data from CSV file
app.get('/api/books', async (req: Request, res: Response) => {
  try {
    const books = await readDataFromCSV<Book>('C:/Users/derpi/OneDrive/Documents/Hackathon/Source/repos/magical-library/server/datasheets/spell_books_random_names.csv');
    res.json(books);
  } catch (error) {
    console.error('Error reading books from CSV:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Potions endpoint to retrieve data from CSV file
app.get('/api/potions', async (req: Request, res: Response) => {
  try {
    const potions = await readDataFromCSV<Potion>('C:/Users/derpi/OneDrive/Documents/Hackathon/Source/repos/magical-library/server/datasheets/potions_random_names.csv');
    res.json(potions);
  } catch (error) {
    console.error('Error reading potions from CSV:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Express server listening on http://localhost:${port}`);
});
