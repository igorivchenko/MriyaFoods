export { FilterSidebar } from "./ui/FilterSidebar";
export { useCatalogSync } from "./lib/useCatalogSync";
export {
  catalogSlice,
  catalogReducer,
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
} from "./model/catalogSlice";
export type { CatalogState } from "./model/catalogSlice";
