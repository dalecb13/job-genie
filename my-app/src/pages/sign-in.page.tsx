import { useState } from "react";
import supabase from "../utils/supabase";
import { useSession } from "../context/session.context";
import { Navigate, useNavigate } from "react-router";

const SignInPage = () => {
  const { session } = useSession();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (session) return <Navigate to="/" />;

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    const { error } = await supabase
      .auth
      .signInWithPassword({ email, password })
    if (error) {
      alert(error.message)
    } else {
      // alert('Check your email for the login link!')
      navigate('/applications');
    }
    setLoading(false)
  }

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">Supabase + React</h1>
        <p className="description">Sign in via magic link with your email below</p>
        <form className="form-widget flex flex-col" onSubmit={handleLogin}>
          <input
            className="inputField"
            type="email"
            placeholder="Your email"
            value={email}
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="inputField"
            type="password"
            placeholder="********"
            value={password}
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <button className={'button block'} disabled={loading}>
              {loading ? <span>Loading</span> : <span>Log In</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignInPage;
