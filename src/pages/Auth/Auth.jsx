import React, {useState, useEffect} from 'react'
import { signup, login } from '../../services/auth.js'
import { useNavigate, useSearchParams } from 'react-router-dom'
import loader from '../../assets/loader.svg'
import './Auth.css'

const Auth = () => {
    const [signState, setSignState] = useState('Sign Up');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const mode = searchParams.get('mode');
        if (mode === 'signin') {
            setSignState('Sign In');
        } else if (mode === 'signup') {
            setSignState('Sign Up');
        }
    }, [searchParams]);


    const user_auth = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (signState === "Sign Up") {
                await signup(email, name, password);
            } else {
                await login(email, password);
            }
            navigate('/');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }


  return loading ? (
    <div className="login-spinner">
      <img src={loader} alt="" />
    </div>
  ) : (
    <div className="login">
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState === "Sign Up" ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
            />
          ) : (
            <></>
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={user_auth} type="submit">
            {signState}
          </button>
        </form>
        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>
              New to Netflix?{" "}
              <span
                onClick={() => {
                  setSignState("Sign Up");
                }}
              >
                Sign Up Now
              </span>
            </p>
          ) : (
            <p>
              Already have accoung?{" "}
              <span
                onClick={() => {
                  setSignState("Sign In");
                }}
              >
                Sign In Now
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth