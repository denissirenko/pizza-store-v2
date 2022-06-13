import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type Sort = {
  name: string;
  type: 'popular' | 'price' | 'name';
  order: string;
};

interface FilterSliceState {
  categoryId: number;
  sort: Sort;
}

const initialState: FilterSliceState = {
  categoryId: 0,
  sort: {
    name: 'популярності',
    type: 'popular',
    order: 'desc',
  },
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.sort = action.payload.sort;
      state.categoryId = action.payload.categoryId;
    },
  },
});

export const selectFilter = (state: RootState) => state.filter.categoryId;
export const selectSort = (state: RootState) => state.filter.sort;

export const { setCategoryId, setSort, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
