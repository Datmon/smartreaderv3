import {
  createReducer,
  createAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { books } from 'api';
import moment from 'moment';
import { Alert } from 'react-native';
import { RootState } from 'store';
import { IApiBook, IBook } from 'types/interfaces';

export interface IAnnotation {
  id: string;
  pageNumber: number;
  type: string;
}

export interface IBookmark {
  bookmark: object;
  bookmarkJSON: string;
  document: string;
}

const addAnnotation = createAction<IAnnotation>('books/addAnnotation');
const addBookmark = createAction<IBookmark>('books/addBookmark');

const addTypeFilter = createAction<string>('books/addTypeFilter');
const setDownloaded = createAction<string>('books/setDownloaded');
const setLastPage = createAction<{
  id: string;
  page: number;
}>('books/setLastPage');

const setPages = createAction<{ id: string; page: number }>('books/setPages');

const setNotes =
  createAction<{ id: string; saveNote: string; saveBookmark: string }>(
    'books/setNotes',
  );

const getBooks = createAsyncThunk('books/getBooks', async () => {
  try {
    const response = await books.getBooks();
    if (response.data && response.data.error) {
      throw new Error(response.data.message);
    }
    console.log('response.data', response.data);
    if (response.data) {
      return response.data;
    }
  } catch (err) {
    return err;
  }
});

// const getBBookmarks = createAsyncThunk('')

// const downloadBook = createAsyncThunk(
//   'books/downloadBook',
//   async (bookId: string) => {
//     try {
//       const response = await books.downloadBook(bookId);
//       if (response.data.error) {
//         throw new Error(response.data.message);
//       }
//       console.log('response.data', response.data);
//       return response.data;
//     } catch (err) {
//       return err;
//     }
//   },
// );

export const reducer = createReducer(
  {
    getBooksStatus: 'idle',
    allBooksMeta: [] as Array<IApiBook>,
    pages: [] as Array<{
      bookId: string;
      count: number;
      max: number;
    }>,
    annotations: [] as Array<{
      id: string;
      pageNumber: number;
      type: string;
    }>,
    bookmarks: [] as Array<any>,
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
        book => book.bookId === action.payload,
      );
      state.allBooksMeta[index].isLoaded = 'loaded';
    });

    builder.addCase(setLastPage, (state, { payload }) => {
      const index = state.pages.findIndex(
        ({ bookId }) => bookId === payload.id,
      );
      if (state.pages[index] && state.pages[index].max < payload.page) {
        state.pages[index].max = payload.page;
      }
    });

    builder.addCase(setNotes, (state, { payload }) => {
      const index = state.pages.findIndex(
        ({ bookId }) => bookId === payload.id,
      );
      if (payload.saveNote) {
        state.pages[index].saveNote = payload.saveNote;
      }
      if (payload.saveBookmark) {
        state.pages[index].saveBookmark = payload.saveBookmark;
      }
    });

    builder.addCase(setPages, (state, { payload }) => {
      const neededState = state.pages.find(
        ({ bookId }) => bookId === payload.id,
      );

      if (neededState) {
        neededState.count = payload.page;
      } else {
        state.pages = [
          ...state.pages,
          {
            bookId: payload.id,
            count: payload.page,
            max: 0,
          },
        ];
      }
    });

    builder.addCase(addAnnotation, (state, action) => {
      const isExistsAnnotate = state.annotations?.includes(action.payload);
      const newAnnotates = state.annotations;
      if (!isExistsAnnotate) {
        newAnnotates.push(action.payload);
      }
      state.annotations = newAnnotates;
    });

    builder.addCase(addBookmark, (state, action) => {
      let bookmarks = state.bookmarks;
      if (
        bookmarks?.some(
          (item: IBookmark) => item?.document === action.payload.document,
        )
      ) {
        const index = bookmarks.findIndex(
          (item: IBookmark) => item?.document === action.payload.document,
        );
        bookmarks[index] = action.payload;
      } else {
        bookmarks.push(action.payload);
      }
      state.bookmarks = bookmarks;
    });

    // builder.addCase(downloadBook, (state, action) => {
    //   const index = state.allBooksMeta.findIndex(
    //     book => book.id === action.payload,
    //   );
    //   state.allBooksMeta[index].isLoaded = 'loaded';
    // });
  },
);

export const actions = {
  addTypeFilter,
  getBooks,
  setDownloaded,
  setLastPage,
  setPages,
  setNotes,
  addAnnotation,
  addBookmark,
};

export const selectors = {
  selectAllBooks: (state: RootState) => state.books.allBooksMeta,

  selectAllPages: (state: RootState) => state.books.pages,

  selectAllAnnotations: (state: RootState) => state.books.annotations,

  selectAllBookmarks: (state: RootState) => state.books.bookmarks,

  selectBooksWithFilters: (state: RootState) => {
    if (state.books.allBooksMeta && state.books.allBooksMeta.length > 0) {
      let filtredArray = state.books.allBooksMeta;

      if (state.filters.typeFilters[0] !== 'All') {
        filtredArray = state.books.allBooksMeta.filter(book => {
          const format = book?.file.split('.').slice(-1)[0].toUpperCase();

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
