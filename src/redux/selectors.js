import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.contacts.items;
export const selectError = state => state.contacts.error;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectFilter = state => state.filter;

// Memoized Selector
// Memoization: Memoization is a technique to speed up functions by storing the results of expensive function calls and returning the cached result when the same inputs occur again.

export const selectFilteredContacts = createSelector(
  // Array of input selectors
  [selectContacts, selectFilter],
  // Transducer function
  (contacts, filter) => {
    const normalizedFilter = filter ? filter.toLowerCase() : '';
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  }
);
