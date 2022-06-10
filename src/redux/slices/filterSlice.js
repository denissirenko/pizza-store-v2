import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    categoryId: 0,
    sort: {
      name: 'популярности',
      type: 'popular',
      order: 'desc',
    },
  },
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setFilters(state, action) {
      state.sort = action.payload.sort;
      state.categoryId = action.payload.categoryId;
    },
  },
});

export const selectFilter = (state) => state.filter.categoryId;
export const selectSort = (state) => state.filter.sort;

export const { setCategoryId, setSort, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
