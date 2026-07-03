"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useEffect } from "react";
import { useAppDispatch } from "@/app/store";
import { fetchProducts } from "@/entities/product";
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
} from "@/features/filter-products";
import { FilterSidebar } from "@/features/filter-products/ui/FilterSidebar";
import { ProductGrid } from "@/widgets/product-grid/ui/ProductGrid";
import { useCatalogSync } from "@/features/filter-products/lib/useCatalogSync";
import styles from "./CatalogPage.module.css";

const CatalogPageContent = () => {
  // Synchronize Redux filter states and router search queries
  useCatalogSync();
  const dispatch = useAppDispatch();

  useEffect(() => {
    let active = true;

    const fetchCatalogProducts = async () => {
      dispatch(fetchProductsStart());
      try {
        const data = await fetchProducts();

        if (active && data) {
          dispatch(fetchProductsSuccess(data));
        }
      } catch (err: unknown) {
        if (active) {
          const errorMsg =
            err instanceof Error ? err.message : "Failed to load products";
          dispatch(fetchProductsFailure(errorMsg));
        }
      }
    };

    fetchCatalogProducts();

    return () => {
      active = false;
    };
  }, [dispatch]);

  return (
    <div className={`${styles.pageWrapper} container`}>
      {/* Breadcrumbs Navigation */}
      <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
        <ol className={styles.breadcrumbList}>
          <li>
            <Link href="/" className={styles.breadcrumbLink}>
              Home
            </Link>
          </li>
          <li className={styles.separator} aria-hidden="true">
            /
          </li>
          <li>
            <span className={styles.current} aria-current="page">
              Catalog
            </span>
          </li>
        </ol>
      </nav>

      {/* Two-Column Responsive Layout */}
      <div className={styles.layout}>
        {/* Left Side: Filter Sidebar */}
        <div className={styles.sidebarColumn}>
          <FilterSidebar />
        </div>

        {/* Right Side: Product Grid view */}
        <main className={styles.mainColumn} id="main-content">
          <ProductGrid />
        </main>
      </div>
    </div>
  );
};

export const CatalogPage = () => {
  return (
    <Suspense
      fallback={
        <div className={`${styles.loadingState} container`}>
          <div className={styles.spinner} role="status">
            <span className="visually-hidden">Loading catalog...</span>
          </div>
          <p className={styles.loadingText}>Loading Catalog...</p>
        </div>
      }
    >
      <CatalogPageContent />
    </Suspense>
  );
};

CatalogPage.displayName = "CatalogPage";
export default CatalogPage;
