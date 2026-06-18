export default function Home() {
  return (
    <main style={{ padding: "4rem 2rem", minHeight: "100vh", display: "flex", flexDirection: "column", gap: "3rem", maxWidth: "800px", margin: "0 auto" }}>
      <header style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <h1 className="text-headline-l">Mriya Foods</h1>
        <p className="text-body-m" style={{ opacity: 0.8 }}>Design System Foundation & Global Style Verification</p>
      </header>

      <section className="glass-panel glass-panel-hover" style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <h2 className="text-headline-m">Glassmorphic Container</h2>
        <p className="text-body-m">
          This panel showcases our Liquid Glass effect. It features translucent white backing with backdrop filters, subtle border reflections, and soft primary-tinted drop shadows.
        </p>
        
        <div className="search-bar" style={{ maxWidth: "400px" }}>
          <span className="text-label-m" style={{ color: "var(--color-primary-tint)" }}>🔍</span>
          <input className="search-input" type="text" placeholder="Search premium foods..." aria-label="Search" />
        </div>
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <h2 className="text-headline-m">Interactive Atom Actions</h2>
        
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          <button className="btn btn-primary">Primary Action</button>
          <button className="btn btn-secondary">Secondary Action</button>
          <button className="btn btn-inverted">Inverted Action</button>
          <button className="btn btn-outlined">Outlined Action</button>
        </div>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <span className="badge">Default Status</span>
          <span className="badge badge-delete">Danger Action</span>
        </div>
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2 className="text-headline-m">Color Token Verification</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "1rem" }}>
          <div style={{ background: "var(--color-primary)", color: "var(--color-white)", padding: "1rem", borderRadius: "var(--radius-sm)", textAlign: "center" }}>
            <span className="text-label-m">Primary</span>
            <div style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>#4E2E1E</div>
          </div>
          <div style={{ background: "var(--color-secondary)", color: "var(--color-black)", padding: "1rem", borderRadius: "var(--radius-sm)", textAlign: "center" }}>
            <span className="text-label-m" style={{ color: "inherit" }}>Secondary</span>
            <div style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>#FFD42F</div>
          </div>
          <div style={{ background: "var(--color-tertiary)", color: "var(--color-black)", padding: "1rem", borderRadius: "var(--radius-sm)", textAlign: "center" }}>
            <span className="text-label-m" style={{ color: "inherit" }}>Tertiary</span>
            <div style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>#D9D9D9</div>
          </div>
          <div style={{ background: "var(--color-white)", border: "1px solid var(--color-tertiary)", color: "var(--color-black)", padding: "1rem", borderRadius: "var(--radius-sm)", textAlign: "center" }}>
            <span className="text-label-m" style={{ color: "inherit" }}>Neutral</span>
            <div style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>#FFFFFF</div>
          </div>
        </div>
      </section>
    </main>
  );
}

