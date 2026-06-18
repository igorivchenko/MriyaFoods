"use client";

import { useState } from "react";
import { Button, Input } from "@/shared/ui";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [errorValue, setErrorValue] = useState("");

  const handleTestClick = (name: string) => {
    alert(`Clicked ${name}!`);
  };

  return (
    <main style={{ padding: "4rem 2rem", minHeight: "100vh", display: "flex", flexDirection: "column", gap: "3rem", maxWidth: "1000px", margin: "0 auto" }}>
      <header style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <h1 className="text-headline-l">Mriya Foods</h1>
        <p className="text-body-m" style={{ opacity: 0.8 }}>Design System — Shared UI Component Verification</p>
      </header>

      {/* Button Showcase */}
      <section className="glass-panel" style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
        <h2 className="text-headline-m" style={{ marginBottom: "0.5rem" }}>1. Button Components</h2>
        
        {/* Row 1: Primary Buttons */}
        <div>
          <h3 className="text-label-m" style={{ color: "var(--color-primary-tint)", marginBottom: "0.75rem" }}>Primary Variant</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
            <Button variant="primary" onClick={() => handleTestClick("Primary default")}>
              Primary Action
            </Button>
            <Button variant="primary" size="sm">
              Small Primary
            </Button>
            <Button variant="primary" size="lg">
              Large Primary
            </Button>
            <Button variant="primary" disabled>
              Disabled Primary
            </Button>
          </div>
        </div>

        {/* Row 2: Secondary Buttons */}
        <div>
          <h3 className="text-label-m" style={{ color: "var(--color-primary-tint)", marginBottom: "0.75rem" }}>Secondary Variant</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
            <Button variant="secondary" onClick={() => handleTestClick("Secondary default")}>
              Secondary Action
            </Button>
            <Button variant="secondary" size="sm">
              Small Secondary
            </Button>
            <Button variant="secondary" size="lg">
              Large Secondary
            </Button>
            <Button variant="secondary" disabled>
              Disabled Secondary
            </Button>
          </div>
        </div>

        {/* Row 3: Glass Buttons */}
        <div>
          <h3 className="text-label-m" style={{ color: "var(--color-primary-tint)", marginBottom: "0.75rem" }}>Glass Variant</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
            <Button variant="glass" onClick={() => handleTestClick("Glass default")}>
              Glass Action
            </Button>
            <Button variant="glass" size="sm">
              Small Glass
            </Button>
            <Button variant="glass" size="lg">
              Large Glass
            </Button>
            <Button variant="glass" disabled>
              Disabled Glass
            </Button>
          </div>
        </div>

        {/* Row 4: Icon Buttons */}
        <div>
          <h3 className="text-label-m" style={{ color: "var(--color-primary-tint)", marginBottom: "0.75rem" }}>Icon Variant</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", alignItems: "center" }}>
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
              <Button variant="icon" size="sm" onClick={() => handleTestClick("Icon SM")}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              </Button>
              <Button variant="icon" size="md" onClick={() => handleTestClick("Icon MD")}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </Button>
              <Button variant="icon" size="lg" onClick={() => handleTestClick("Icon LG")}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              </Button>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
              <span className="text-body-m" style={{ fontSize: "0.85rem", opacity: 0.7 }}>Circular:</span>
              <Button variant="icon" size="sm" rounded>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              </Button>
              <Button variant="icon" size="md" rounded>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </Button>
              <Button variant="icon" size="lg" rounded>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              </Button>
            </div>
            <Button variant="icon" disabled>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </Button>
          </div>
        </div>
      </section>

      {/* Input Showcase */}
      <section className="glass-panel" style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
        <h2 className="text-headline-m" style={{ marginBottom: "0.5rem" }}>2. Input Components (Liquid Glass)</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
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
                setErrorValue("Please enter a valid email address containing '@'.");
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
