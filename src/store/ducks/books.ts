import {
  createReducer,
  createAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { books } from 'api';
import moment from 'moment';
import { RootState } from 'store';
import { IApiBook, IBook } from 'types/interfaces';

const addTypeFilter = createAction<string>('books/addTypeFilter');
const setDownloaded = createAction<string>('books/addTypeFilter');

const getBooks = createAsyncThunk('books/getBooks', async () => {
  try {
    const response = await books.getBooks();
    if (response.data.error) {
      throw new Error(response.data.message);
    }
    console.log('response.data', response.data);
    return response.data;
  } catch (err) {
    return err;
  }
});

export const reducer = createReducer(
  {
    defaultBooks: [
      {
        title: 'Non fermentum varius neciler...',
        author: 'Jamees Fray',
        format: 'PDF',
        dateOfUploading: new Date(2014, 1, 1),
        dateOfTouched: new Date(2013, 1, 1),
        isLoaded: 'loaded',
        image: require('../../assets/books/images/0.png'),
        id: 0,
        readed: 0,
        pages: 300,
      },
      {
        title: 'Quam duis commod...',
        author: 'Fray Jamees',
        format: 'TXT',
        dateOfUploading: new Date(2011, 1, 1),
        dateOfTouched: new Date(2018, 1, 1),
        isLoaded: 'unloaded',
        image: require('../../assets/books/images/1.png'),
        id: 1,
        readed: 10,
        pages: 300,
      },
      {
        title: 'Neciler non fermentum varius...',
        author: 'Jamees Fray',
        format: 'PDF',
        dateOfUploading: new Date(2020, 1, 1),
        dateOfTouched: new Date(2004, 1, 1),
        isLoaded: 'loaded',
        image: require('../../assets/books/images/2.png'),
        id: 2,
        readed: 0,
        pages: 300,
      },
    ] as Array<IBook>,
    getBooksStatus: 'idle',
    allBooksMeta: [] as Array<IApiBook>,
  },

  builder => {
    builder
      .addCase(getBooks.pending, state => {
        state.getBooksStatus = 'pending';
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.allBooksMeta = action.payload;
        console.log('state.allBooksMeta', state.allBooksMeta);
        state.getBooksStatus = 'fulfilled';
      })
      .addCase(getBooks.rejected, state => {
        state.getBooksStatus = 'rejected';
      });

    builder.addCase(setDownloaded, (state, action) => {
      const index = state.allBooksMeta.findIndex(
        book => book.id === action.payload,
      );
      state.allBooksMeta[index].isLoaded = 'loaded';
    });
  },
);

export const actions = {
  addTypeFilter,
  getBooks,
  setDownloaded,
};

export const selectors = {
  selectAllBooks: (state: RootState) => state.books.allBooksMeta,
  //selectBooksWithFilters: (state: RootState) => state.books.allBooksMeta,

  selectBooksWithFilters: (state: RootState) => {
    if (state.books.allBooksMeta && state.books.allBooksMeta.length > 0) {
      let filtredArray = state.books.allBooksMeta;

      if (state.filters.typeFilters[0] !== 'All') {
        filtredArray = state.books.allBooksMeta.filter(book => {
          const format = book.file.split('.').slice(-1)[0].toUpperCase();

          return state.filters.typeFilters.some(
            bookFormat => bookFormat === format,
          );
        });
      }
      if (state.filters.customFilters.length > 0) {
        filtredArray = filtredArray.filter(book =>
          state.filters.customFilters.some(filter => {
            if (book.isLoaded === filter) {
              return true;
            }
            if (filter === 'unloaded' && book.isLoaded === undefined) {
              return true;
            }
          }),
        );
      }
      if (state.filters.sortFilter === 'interaction') {
        return [...filtredArray].sort((a, b) =>
          moment(a.updated_at).diff(moment(b.updated_at)),
        );
      } else {
        return [...filtredArray].sort((a, b) =>
          moment(a.created_at).diff(moment(b.created_at)),
        );
      }
    } else {
      return state.books.allBooksMeta;
    }
  },
};
