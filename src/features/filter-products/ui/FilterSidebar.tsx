"use client";

import React, { useState, useTransition } from "react";
import { Search, ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { catalogProducts } from "@/entities/product";
import Image from "next/image";
import {
  toggleCategory,
  toggleBrand,
  toggleManufacturer,
  setAvailability,
  setSearchQuery,
  resetFilters,
} from "../model/catalogSlice";
import styles from "./FilterSidebar.module.css";

export const FilterSidebar = () => {
  const dispatch = useAppDispatch();
  const [, startTransition] = useTransition();

  const { categories, brands, manufacturers, availability, searchQuery } =
    useAppSelector((state) => state.catalog);

  // Search input local state to prevent laggy typing due to URL sync
  const [searchInput, setSearchInput] = useState(searchQuery);

  // View more states
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [showAllManufacturers, setShowAllManufacturers] = useState(false);

  // Dynamic counts calculations based on overall database
  const totalCount = catalogProducts.length;

  const getCategoryCount = (category: string) =>
    catalogProducts.filter((p) => p.category === category).length;

  const getBrandCount = (brand: string) =>
    catalogProducts.filter((p) => p.brand === brand).length;

  const getManufacturerCount = (man: string) =>
    catalogProducts.filter((p) => p.manufacturer === man).length;

  const getAvailabilityCount = (avail: "available" | "not-available") => {
    if (avail === "available") {
      return catalogProducts.filter((p) => p.inStock).length;
    }
    return catalogProducts.filter((p) => !p.inStock).length;
  };

  // Search submit handler
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchInput(val);
    // Debounce/Transition search query in Redux so typing is smooth
    startTransition(() => {
      dispatch(setSearchQuery(val));
    });
  };

  const handleReset = () => {
    dispatch(resetFilters());
    setSearchInput("");
  };

  // Static options from mock data
  const availableCategories = ["Candies", "Juices", "Cereals"];
  const availableBrands = ["Veladis", "Sweettale", "Trapezza"];
  const availableManufacturers = ["Veladis", "Sweettale", "Trapezza"];

  return (
    <aside className={styles.sidebar} aria-label="Filters">
      {/* Sidebar Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Filters</h2>
        {(categories.length > 0 ||
          brands.length > 0 ||
          manufacturers.length > 0 ||
          availability !== "all" ||
          searchQuery !== "") && (
          <button
            type="button"
            className={styles.resetBtn}
            onClick={handleReset}
            aria-label="Reset all filters"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* --- Categories Section --- */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Categories</h3>
        <div className={styles.list}>
          {/* All option */}
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              className={styles.checkboxInput}
              checked={categories.length === 0}
              onChange={() => {
                if (categories.length > 0) {
                  // If some checked, clicking All resets this group
                  dispatch(resetFilters());
                }
              }}
              disabled={categories.length === 0}
            />
            <span className={styles.checkboxCustom}></span>
            <span className={styles.labelText}>All</span>
            <span className={styles.countText}>({totalCount})</span>
          </label>

          {/* Sub options */}
          {availableCategories.map((cat) => {
            const isChecked = categories.includes(cat);
            return (
              <label key={cat} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  className={styles.checkboxInput}
                  checked={isChecked}
                  onChange={() => dispatch(toggleCategory(cat))}
                />
                <span className={styles.checkboxCustom}></span>
                <span className={styles.labelText}>{cat}</span>
                <span className={styles.countText}>
                  ({getCategoryCount(cat)})
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* --- Brands Section --- */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Brands</h3>
        <div className={styles.list}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              className={styles.checkboxInput}
              checked={brands.length === 0}
              onChange={() => {
                // Clear brand filters
                availableBrands.forEach((b) => {
                  if (brands.includes(b)) dispatch(toggleBrand(b));
                });
              }}
              disabled={brands.length === 0}
            />
            <span className={styles.checkboxCustom}></span>
            <span className={styles.labelText}>All</span>
            <span className={styles.countText}>({totalCount})</span>
          </label>

          {availableBrands
            .slice(0, showAllBrands ? undefined : 3)
            .map((brand) => {
              const isChecked = brands.includes(brand);
              return (
                <label key={brand} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkboxInput}
                    checked={isChecked}
                    onChange={() => dispatch(toggleBrand(brand))}
                  />
                  <span className={styles.checkboxCustom}></span>
                  <span className={styles.labelText}>{brand}</span>
                  <span className={styles.countText}>
                    ({getBrandCount(brand)})
                  </span>
                </label>
              );
            })}

          {availableBrands.length > 3 && (
            <button
              type="button"
              className={styles.viewMoreBtn}
              onClick={() => setShowAllBrands(!showAllBrands)}
            >
              <span>{showAllBrands ? "View less" : "View more"}</span>
              {showAllBrands ? (
                <ChevronUp size={14} />
              ) : (
                <ChevronDown size={14} />
              )}
            </button>
          )}
        </div>
      </div>

      {/* --- Manufacturer Section --- */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Manufacturer</h3>
        <div className={styles.list}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              className={styles.checkboxInput}
              checked={manufacturers.length === 0}
              onChange={() => {
                // Clear manufacturer filters
                availableManufacturers.forEach((m) => {
                  if (manufacturers.includes(m))
                    dispatch(toggleManufacturer(m));
                });
              }}
              disabled={manufacturers.length === 0}
            />
            <span className={styles.checkboxCustom}></span>
            <span className={styles.labelText}>All</span>
            <span className={styles.countText}>({totalCount})</span>
          </label>

          {availableManufacturers
            .slice(0, showAllManufacturers ? undefined : 3)
            .map((man) => {
              const isChecked = manufacturers.includes(man);
              return (
                <label key={man} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkboxInput}
                    checked={isChecked}
                    onChange={() => dispatch(toggleManufacturer(man))}
                  />
                  <span className={styles.checkboxCustom}></span>
                  <span className={styles.labelText}>{man}</span>
                  <span className={styles.countText}>
                    ({getManufacturerCount(man)})
                  </span>
                </label>
              );
            })}

          {availableManufacturers.length > 3 && (
            <button
              type="button"
              className={styles.viewMoreBtn}
              onClick={() => setShowAllManufacturers(!showAllManufacturers)}
            >
              <span>{showAllManufacturers ? "View less" : "View more"}</span>
              {showAllManufacturers ? (
                <ChevronUp size={14} />
              ) : (
                <ChevronDown size={14} />
              )}
            </button>
          )}
        </div>
      </div>

      {/* --- Availability Section --- */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Availability</h3>
        <div className={styles.list}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              className={styles.checkboxInput}
              checked={availability === "available"}
              onChange={() => {
                dispatch(
                  setAvailability(
                    availability === "available" ? "all" : "available",
                  ),
                );
              }}
            />
            <span className={styles.checkboxCustom}></span>
            <span className={styles.labelText}>is available</span>
            <span className={styles.countText}>
              ({getAvailabilityCount("available")})
            </span>
          </label>

          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              className={styles.checkboxInput}
              checked={availability === "not-available"}
              onChange={() => {
                dispatch(
                  setAvailability(
                    availability === "not-available" ? "all" : "not-available",
                  ),
                );
              }}
            />
            <span className={styles.checkboxCustom}></span>
            <span className={styles.labelText}>not available</span>
            <span className={styles.countText}>
              ({getAvailabilityCount("not-available")})
            </span>
          </label>
        </div>

        {/* Sidebar Search Bar */}
        <div className={styles.searchWrapper}>
          <input
            type="text"
            className={styles.searchInput}
            name="search"
            placeholder="Search"
            value={searchInput}
            onChange={handleSearchChange}
            aria-label="Search within catalog"
          />
          <Search size={16} className={styles.searchIcon} />
        </div>
      </div>

      {/* --- Often Buy Section --- */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Often Buy</h3>
        <div className={styles.oftenBuyList}>
          {catalogProducts.slice(1, 3).map((prod) => (
            <div key={prod.id} className={styles.oftenBuyItem}>
              <div className={styles.oftenBuyImageWrapper}>
                <Image
                  src={prod.imageUrl}
                  alt={prod.title}
                  width={40}
                  height={40}
                  className={styles.oftenBuyImage}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className={styles.oftenBuyDetails}>
                <h4 className={styles.oftenBuyName}>{prod.title}</h4>
                <span className={styles.oftenBuyWeight}>{prod.weight}</span>
              </div>
              <div className={styles.oftenBuyPrice}>
                ${prod.price.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

FilterSidebar.displayName = "FilterSidebar";
export default FilterSidebar;
