export interface Book {
  id: number;
  title: string; 
  author: string;
  genre: string;
  availability: 'Available' | 'Checked Out' | 'Out of Stock'; // Union type for availability
  waitlist?: string[]; 
  numberOfCopies: number;
}

