"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { initializeFilters, CatalogState } from "../model/catalogSlice";

export const useCatalogSync = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const isInitialized = useRef(false);

  const {
    categories,
    brands,
    manufacturers,
    availability,
    searchQuery,
    sortBy,
    currentPage,
  } = useAppSelector((state) => state.catalog);

  // 1. Initial load: sync URL search parameters to Redux
  useEffect(() => {
    if (isInitialized.current) return;
    if (!searchParams) return;

    const initialFilters: Partial<CatalogState> = {};

    // Categories
    const urlCategories = searchParams.getAll("category");
    if (urlCategories.length > 0) {
      initialFilters.categories = urlCategories;
    }

    // Brands
    const urlBrands = searchParams.getAll("brand");
    if (urlBrands.length > 0) {
      initialFilters.brands = urlBrands;
    }

    // Manufacturers
    const urlManufacturers = searchParams.getAll("manufacturer");
    if (urlManufacturers.length > 0) {
      initialFilters.manufacturers = urlManufacturers;
    }

    // Availability
    const urlAvailability = searchParams.get("availability");
    if (
      urlAvailability &&
      ["all", "available", "not-available"].includes(urlAvailability)
    ) {
      initialFilters.availability = urlAvailability as
        | "all"
        | "available"
        | "not-available";
    }

    // Search Query
    const urlSearch = searchParams.get("search");
    if (urlSearch) {
      initialFilters.searchQuery = urlSearch;
    }

    // Sort By
    const urlSort = searchParams.get("sortBy");
    if (urlSort) {
      initialFilters.sortBy = urlSort;
    }

    // Current Page
    const urlPage = searchParams.get("page");
    if (urlPage) {
      const parsedPage = parseInt(urlPage, 10);
      if (!isNaN(parsedPage) && parsedPage > 0) {
        initialFilters.currentPage = parsedPage;
      }
    }

    dispatch(initializeFilters(initialFilters));
    isInitialized.current = true;
  }, [searchParams, dispatch]);

  // 2. State changes: sync Redux state to URL search parameters
  useEffect(() => {
    // Only sync if initialization from URL has completed
    if (!isInitialized.current) return;
    if (!searchParams || !pathname) return;

    const params = new URLSearchParams();

    // Append categories
    categories.forEach((cat) => {
      params.append("category", cat);
    });

    // Append brands
    brands.forEach((br) => {
      params.append("brand", br);
    });

    // Append manufacturers
    manufacturers.forEach((man) => {
      params.append("manufacturer", man);
    });

    // Append availability
    if (availability !== "all") {
      params.set("availability", availability);
    }

    // Append search query
    if (searchQuery.trim() !== "") {
      params.set("search", searchQuery.trim());
    }

    // Append sort options
    if (sortBy !== "default") {
      params.set("sortBy", sortBy);
    }

    // Append page if greater than 1
    if (currentPage > 1) {
      params.set("page", currentPage.toString());
    }

    const newQueryString = params.toString();
    const currentQueryString = searchParams.toString();

    // Prevent navigation loop if query string hasn't actually changed
    if (newQueryString !== currentQueryString) {
      const url = newQueryString ? `${pathname}?${newQueryString}` : pathname;
      router.push(url, { scroll: false });
    }
  }, [
    categories,
    brands,
    manufacturers,
    availability,
    searchQuery,
    sortBy,
    currentPage,
    pathname,
    router,
    searchParams,
  ]);
};
