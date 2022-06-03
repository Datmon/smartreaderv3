export interface IBook {
  title: string;
  author: string;
  format: string;
  dateOfUploading: Date;
  dateOfTouched: Date;
  isLoaded: string;
  image: any;
  id: number;
  readed: number;
  pages: number;
}

export interface IApiBook {
  author: string | null;
  book: string | null;
  created_at: Date;
  // file: string | null;
  bookId: string;
  title: string | null;
  updatedDate: Date;
  createdDate: Date | null;
  isLoaded?: 'unloaded' | 'loaded';
}
