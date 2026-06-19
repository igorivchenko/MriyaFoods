"use client";

import { useState } from "react";
import { Button, Input } from "@/shared/ui";
import {
  Search,
  ArrowRight,
  Plus,
  Check,
  AlertCircle,
  ShoppingBag,
  Bell,
} from "lucide-react";
import { successToast, errorToast } from "@/shared/lib";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [errorValue, setErrorValue] = useState("");

  const handleTestClick = (name: string) => {
    alert(`Clicked ${name}!`);
  };

  const showSuccessToast = () => {
    successToast("Mriya Foods success! Item successfully added to your cart.");
  };

  const showErrorToast = () => {
    errorToast("Oops! Something went wrong. Connection timed out.");
  };

  return (
    <main
      style={{
        padding: "4rem 2rem",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "3rem",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      <header
        style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
      >
        <h1 className="text-headline-l">Mriya Foods</h1>
        <p className="text-body-m" style={{ opacity: 0.8 }}>
          Design System — Shared UI Component Verification
        </p>
      </header>

      {/* Toast Notifications Showcase */}
      <section
        className="glass-panel"
        style={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <h2 className="text-headline-m">1. Toast Notifications</h2>
        <p className="text-body-m">
          Test our custom Glassmorphic/Liquid Glass notifications:
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          <Button
            variant="secondary"
            onClick={showSuccessToast}
            leftIcon={<Check size={18} />}
          >
            Show Success Notification
          </Button>
          <Button
            variant="primary"
            onClick={showErrorToast}
            leftIcon={<AlertCircle size={18} />}
          >
            Show Error Notification
          </Button>
        </div>
      </section>

      {/* Button Showcase */}
      <section
        className="glass-panel"
        style={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <h2 className="text-headline-m" style={{ marginBottom: "0.5rem" }}>
          2. Button Components (with Lucide Icons)
        </h2>

        {/* Row 1: Primary Buttons with Icons */}
        <div>
          <h3
            className="text-label-m"
            style={{
              color: "var(--color-primary-tint)",
              marginBottom: "0.75rem",
            }}
          >
            Primary Variant
          </h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <Button
              variant="primary"
              leftIcon={<ShoppingBag size={16} />}
              onClick={() => handleTestClick("Primary with Left Icon")}
            >
              Add to Cart
            </Button>
            <Button
              variant="primary"
              rightIcon={<ArrowRight size={16} />}
              size="lg"
            >
              Proceed to Checkout
            </Button>
            <Button variant="primary" size="sm" leftIcon={<Plus size={14} />}>
              Create New
            </Button>
            <Button variant="primary" disabled leftIcon={<Check size={16} />}>
              Confirmed
            </Button>
          </div>
        </div>

        {/* Row 2: Secondary Buttons with Icons */}
        <div>
          <h3
            className="text-label-m"
            style={{
              color: "var(--color-primary-tint)",
              marginBottom: "0.75rem",
            }}
          >
            Secondary Variant
          </h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <Button
              variant="secondary"
              leftIcon={<Search size={16} />}
              onClick={() => handleTestClick("Secondary with Search")}
            >
              Search Catalog
            </Button>
            <Button variant="secondary" rightIcon={<ArrowRight size={16} />}>
              View More
            </Button>
            <Button variant="secondary" size="sm" leftIcon={<Plus size={14} />}>
              Quick Add
            </Button>
            <Button
              variant="secondary"
              disabled
              rightIcon={<ArrowRight size={16} />}
            >
              Loading...
            </Button>
          </div>
        </div>

        {/* Row 3: Glass Buttons with Icons */}
        <div>
          <h3
            className="text-label-m"
            style={{
              color: "var(--color-primary-tint)",
              marginBottom: "0.75rem",
            }}
          >
            Glass Variant
          </h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <Button
              variant="glass"
              leftIcon={<Bell size={16} />}
              onClick={() => handleTestClick("Glass with Notification")}
            >
              Subscribe
            </Button>
            <Button variant="glass" rightIcon={<ArrowRight size={16} />}>
              Learn More
            </Button>
            <Button variant="glass" size="sm" leftIcon={<Plus size={14} />}>
              Compare
            </Button>
            <Button variant="glass" disabled leftIcon={<Check size={16} />}>
              Submitted
            </Button>
          </div>
        </div>

        {/* Row 4: Icon Buttons */}
        <div>
          <h3
            className="text-label-m"
            style={{
              color: "var(--color-primary-tint)",
              marginBottom: "0.75rem",
            }}
          >
            Icon Variant
          </h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.5rem",
              alignItems: "center",
            }}
          >
            <div
              style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}
            >
              <Button
                variant="icon"
                size="sm"
                onClick={() => handleTestClick("Icon SM")}
              >
                <ArrowRight size={14} />
              </Button>
              <Button
                variant="icon"
                size="md"
                onClick={() => handleTestClick("Icon MD")}
              >
                <Search size={18} />
              </Button>
              <Button
                variant="icon"
                size="lg"
                onClick={() => handleTestClick("Icon LG")}
              >
                <ShoppingBag size={22} />
              </Button>
            </div>
            <div
              style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}
            >
              <span
                className="text-body-m"
                style={{ fontSize: "0.85rem", opacity: 0.7 }}
              >
                Circular:
              </span>
              <Button variant="icon" size="sm" rounded>
                <ArrowRight size={14} />
              </Button>
              <Button variant="icon" size="md" rounded>
                <Search size={18} />
              </Button>
              <Button variant="icon" size="lg" rounded>
                <ShoppingBag size={22} />
              </Button>
            </div>
            <Button variant="icon" disabled>
              <Search size={18} />
            </Button>
          </div>
        </div>
      </section>

      {/* Input Showcase */}
      <section
        className="glass-panel"
        style={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <h2 className="text-headline-m" style={{ marginBottom: "0.5rem" }}>
          3. Input Components (Liquid Glass)
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
          }}
        >
          {/* Default state */}
          <Input
            label="Search Query"
            placeholder="Type to search premium products..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          {/* Error validation state */}
          <Input
            label="Email Address"
            placeholder="enter your email..."
            value={emailValue}
            onChange={(e) => {
              setEmailValue(e.target.value);
              if (e.target.value && !e.target.value.includes("@")) {
                setErrorValue(
                  "Please enter a valid email address containing '@'.",
                );
              } else {
                setErrorValue("");
              }
            }}
            error={errorValue}
          />

          {/* Disabled state */}
          <Input
            label="System Identifier (Read-Only)"
            value="MriyaFoods-9921-Locked"
            disabled
            placeholder="Disabled field"
          />

          {/* Static Error for testing */}
          <Input
            label="Required Input"
            placeholder="This field has a hardcoded error state..."
            error="This field is required to complete transaction."
          />
        </div>
      </section>
    </main>
  );
}
