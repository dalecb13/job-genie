import { Link, Navigate } from "react-router";
import { useSession } from "../context/session.context";
import { useState } from "react";
import supabase from "../utils/supabase";

const SignUpPage = () => {
  const { session } = useSession();

  const [status, setStatus] = useState("");
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  if (session) return <Navigate to="/" />;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Creating account...");
    const { error } = await supabase
      .auth
      .signUp({
        email: formValues.email,
        password: formValues.password,
      });

    if (error) {
      alert(error.message);
    }
    setStatus("");
  };

  return (
    <main>
      <Link className="home-link" to="/">
        ◄ Home
      </Link>
      <form className="main-container" onSubmit={handleSubmit}>
        <h1 className="header-text">Sign Up</h1>
        <p
          style={{
            textAlign: "center",
            fontSize: "0.8rem",
            color: "#777",
          }}
        >
          Demo app, please don't use your real email or password
        </p>
        <input
          name="email"
          onChange={handleInputChange}
          type="email"
          placeholder="Email"
        />
        <input
          name="password"
          onChange={handleInputChange}
          type="password"
          placeholder="Password"
        />
        <button type="submit">Create Account</button>
        <Link className="auth-link" to="/auth/sign-in">
          Already have an account? Sign In
        </Link>
        {status && <p>{status}</p>}
      </form>
    </main>
  );
}

export default SignUpPage;
