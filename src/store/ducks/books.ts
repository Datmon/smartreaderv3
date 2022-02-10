import { createReducer, createAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { RootState } from 'store';
import { IBook } from 'types/interfaces';

const addTypeFilter = createAction<string>('filters/addTypeFilter');

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
  },

  builder => {
    builder.addCase(addTypeFilter, (state, action) => {});
  },
);

export const actions = {
  addTypeFilter,
};

export const selectors = {
  selectAllBooks: (state: RootState) => state.books.defaultBooks,
  selectBooksWithFilters: (state: RootState) => {
    let filtredArray: Array<IBook> = state.books.defaultBooks;

    if (state.filters.typeFilters[0] !== 'All') {
      filtredArray = state.books.defaultBooks.filter(book =>
        state.filters.typeFilters.some(format => format === book.format),
      );
    }
    if (state.filters.customFilters.length > 0) {
      filtredArray = filtredArray.filter(book =>
        state.filters.customFilters.some(filter => book.isLoaded === filter),
      );
    }
    if (state.filters.sortFilter === 'interaction') {
      return [...filtredArray].sort((a, b) =>
        moment(a.dateOfTouched).diff(moment(b.dateOfTouched)),
      );
    } else {
      return [...filtredArray].sort((a, b) =>
        moment(a.dateOfUploading).diff(moment(b.dateOfUploading)),
      );
    }
  },
};
