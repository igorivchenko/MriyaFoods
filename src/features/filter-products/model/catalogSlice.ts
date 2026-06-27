import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CatalogState {
  categories: string[];
  brands: string[];
  manufacturers: string[];
  availability: "all" | "available" | "not-available";
  searchQuery: string;
  sortBy: string;
  currentPage: number;
  itemsPerPage: number;
  viewMode: "grid" | "list";
}

const initialState: CatalogState = {
  categories: [],
  brands: [],
  manufacturers: [],
  availability: "all",
  searchQuery: "",
  sortBy: "default",
  currentPage: 1,
  itemsPerPage: 9,
  viewMode: "grid",
};

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    toggleCategory: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      const index = state.categories.indexOf(category);
      if (index > -1) {
        state.categories = state.categories.filter((c) => c !== category);
      } else {
        state.categories.push(category);
      }
      state.currentPage = 1; // Reset to page 1 on filter change
    },
    toggleBrand: (state, action: PayloadAction<string>) => {
      const brand = action.payload;
      const index = state.brands.indexOf(brand);
      if (index > -1) {
        state.brands = state.brands.filter((b) => b !== brand);
      } else {
        state.brands.push(brand);
      }
      state.currentPage = 1;
    },
    toggleManufacturer: (state, action: PayloadAction<string>) => {
      const manufacturer = action.payload;
      const index = state.manufacturers.indexOf(manufacturer);
      if (index > -1) {
        state.manufacturers = state.manufacturers.filter(
          (m) => m !== manufacturer,
        );
      } else {
        state.manufacturers.push(manufacturer);
      }
      state.currentPage = 1;
    },
    setAvailability: (
      state,
      action: PayloadAction<"all" | "available" | "not-available">,
    ) => {
      state.availability = action.payload;
      state.currentPage = 1;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
      state.currentPage = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setViewMode: (state, action: PayloadAction<"grid" | "list">) => {
      state.viewMode = action.payload;
    },
    resetFilters: (state) => {
      state.categories = [];
      state.brands = [];
      state.manufacturers = [];
      state.availability = "all";
      state.searchQuery = "";
      state.sortBy = "default";
      state.currentPage = 1;
    },
    initializeFilters: (
      state,
      action: PayloadAction<Partial<CatalogState>>,
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const {
  toggleCategory,
  toggleBrand,
  toggleManufacturer,
  setAvailability,
  setSearchQuery,
  setSortBy,
  setPage,
  setViewMode,
  resetFilters,
  initializeFilters,
} = catalogSlice.actions;

export const catalogReducer = catalogSlice.reducer;
export default catalogReducer;
