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
  author: string;
  book: string;
  created_at: Date;
  file: string;
  id: string;
  title: string;
  updated_at: Date;
  isLoaded?: 'unloaded' | 'loaded';
}
