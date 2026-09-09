import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const destination = location.state?.from?.pathname || "/";

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.trim()) {
      return;
    }

    localStorage.setItem("addisEatsUser", email.trim());

    navigate(destination, { replace: true });
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Sign In</p>

        <h2>Sign in to continue</h2>

        <p>
          You need to sign in before you can reach checkout.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
          />

          <button type="submit">Sign In</button>
        </form>
      </div>
    </section>
  );
}

export default Login;