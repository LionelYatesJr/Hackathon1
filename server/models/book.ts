export interface Book {
  id: number;
  title: string; // Renamed from 'name' to 'title'
  author: string;
  genre: string;
  availability: 'Available' | 'Checked Out' | 'Out of Stock'; // Union type for availability
  waitlist?: string[]; // Optional array of users on waitlist
  numberOfCopies: number;
}

