"use client";

import React, { useMemo } from "react";
import { Grid, List } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { ProductCard, Product } from "@/entities/product";
import { useCart } from "@/entities/cart";
import {
  setSortBy,
  setPage,
  setViewMode,
  selectProducts,
  selectCatalogLoading,
  selectCatalogError,
} from "@/features/filter-products";
import styles from "./ProductGrid.module.css";

export const ProductGrid = () => {
  const dispatch = useAppDispatch();
  const { addToCart } = useCart();

  const {
    categories,
    brands,
    manufacturers,
    availability,
    searchQuery,
    sortBy,
    currentPage,
    itemsPerPage,
    viewMode,
  } = useAppSelector((state) => state.catalog);

  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(selectCatalogLoading);
  const error = useAppSelector(selectCatalogError);

  // 1. Client-Side Filtering, Searching, and Sorting
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (categories.length > 0) {
      result = result.filter(
        (p) => p.category && categories.includes(p.category),
      );
    }

    // Filter by brand
    if (brands.length > 0) {
      result = result.filter((p) => p.brand && brands.includes(p.brand));
    }

    // Filter by manufacturer
    if (manufacturers.length > 0) {
      result = result.filter(
        (p) => p.manufacturer && manufacturers.includes(p.manufacturer),
      );
    }

    // Filter by availability
    if (availability === "available") {
      result = result.filter((p) => p.inStock);
    } else if (availability === "not-available") {
      result = result.filter((p) => !p.inStock);
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query),
      );
    }

    // Apply Sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "title-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "default":
      default:
        // Default sort by id
        result.sort((a, b) => a.id.localeCompare(b.id));
        break;
    }

    return result;
  }, [
    products,
    categories,
    brands,
    manufacturers,
    availability,
    searchQuery,
    sortBy,
  ]);

  // 2. Pagination Slicing
  const totalItems = filteredAndSortedProducts.length;
  const totalPages = Math.max(Math.ceil(totalItems / itemsPerPage), 1);

  // Safeguard: reset page if it exceeds total pages after filtering
  const activePage = currentPage > totalPages ? 1 : currentPage;

  const paginatedProducts = useMemo(() => {
    const start = (activePage - 1) * itemsPerPage;
    return filteredAndSortedProducts.slice(start, start + itemsPerPage);
  }, [filteredAndSortedProducts, activePage, itemsPerPage]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortBy(e.target.value));
  };

  // Pagination Builder
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`${styles.pageBtn} ${activePage === i ? styles.pageBtnActive : ""}`}
          onClick={() => dispatch(setPage(i))}
          aria-label={`Go to page ${i}`}
          aria-current={activePage === i ? "page" : undefined}
        >
          {i}
        </button>,
      );
    }

    return (
      <div
        className={styles.pagination}
        role="navigation"
        aria-label="Catalog pagination"
      >
        <button
          className={styles.pageArrow}
          onClick={() => dispatch(setPage(activePage - 1))}
          disabled={activePage === 1}
          aria-label="Go to previous page"
        >
          &lt;
        </button>
        {pages}
        <button
          className={styles.pageArrow}
          onClick={() => dispatch(setPage(activePage + 1))}
          disabled={activePage === totalPages}
          aria-label="Go to next page"
        >
          &gt;
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className={styles.loaderWrapper}>
        <ClipLoader color="var(--color-secondary)" size={40} />
        <p className={styles.loaderText}>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorWrapper}>
        <p className={styles.errorText}>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Top Bar for Sorting & Layout View Toggle */}
      <div className={styles.topBar}>
        <div className={styles.leftControls}>
          {/* Grid/List layout toggle */}
          <div className={styles.viewToggles}>
            <button
              type="button"
              className={`${styles.toggleBtn} ${viewMode === "grid" ? styles.toggleBtnActive : ""}`}
              onClick={() => dispatch(setViewMode("grid"))}
              aria-label="Grid layout view"
            >
              <Grid size={18} />
            </button>
            <button
              type="button"
              className={`${styles.toggleBtn} ${viewMode === "list" ? styles.toggleBtnActive : ""}`}
              onClick={() => dispatch(setViewMode("list"))}
              aria-label="List layout view"
            >
              <List size={18} />
            </button>
          </div>

          {/* Sort selection dropdown */}
          <div className={styles.sortWrapper}>
            <select
              id="catalog-sort"
              className={styles.sortSelect}
              value={sortBy}
              onChange={handleSortChange}
              aria-label="Sort products by"
            >
              <option value="default">Sort by: Default</option>
              <option value="price-asc">Sort by: Price (Low to High)</option>
              <option value="price-desc">Sort by: Price (High to Low)</option>
              <option value="title-asc">Sort by: Name (A to Z)</option>
              <option value="title-desc">Sort by: Name (Z to A)</option>
            </select>
          </div>
        </div>

        {/* Top bar pagination directly inside headers */}
        <div className={styles.topPagination}>{renderPagination()}</div>
      </div>

      {/* Product List Render Grid */}
      {paginatedProducts.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>
            No products match your active filters.
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => dispatch({ type: "catalog/resetFilters" })}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div
          className={`${styles.productsWrapper} ${
            viewMode === "list" ? styles.listView : styles.gridView
          }`}
        >
          {paginatedProducts.map((product: Product) => (
            <div key={product.id} className={styles.cardContainer}>
              <ProductCard product={product} onAddToCart={addToCart} />
            </div>
          ))}
        </div>
      )}

      {/* Bottom pagination */}
      {paginatedProducts.length > 0 && (
        <div className={styles.bottomPagination}>{renderPagination()}</div>
      )}
    </div>
  );
};

ProductGrid.displayName = "ProductGrid";
export default ProductGrid;
