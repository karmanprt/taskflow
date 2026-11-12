import { Link } from "react-router";
import TypewriterHeading from "./TypewriterHeading";
import "./AuthLayout.css";

function AuthLayout({
  children,
  panelSide,
  heading,
  description,
  switchLabel,
  switchTo,
}) {
  const isLeft = panelSide === "left";

  return (
    <main className="auth-page">
      <section className="auth-container">
        {/* Form area */}
        <div className={`auth-form ${isLeft ? "form-right" : "form-left"}`}>
          <div className="auth-form-content">{children}</div>
        </div>

        {/* Branding area */}
        <aside
          className={`auth-panel ${isLeft ? "panel-left" : "panel-right"}`}
        >
          <Link to="/" className="auth-brand">
            <div className="auth-logo">
              <span>✓</span>
            </div>
            <span className="auth-brand-name">TaskFlow</span>
          </Link>

          <div className="auth-panel-content">
            <TypewriterHeading text={heading} className="auth-heading" />

            <p className="auth-description">{description}</p>

            <Link to={switchTo} viewTransition className="auth-switch-button">
              {switchLabel}
              <span aria-hidden="true"> →</span>
            </Link>
          </div>

          <p className="auth-footer">Organize better. Achieve more.</p>
        </aside>
      </section>
    </main>
  );
}

export default AuthLayout;
