import React, { useState, useEffect } from "react";
import { signup, login } from "../../services/auth.js";
import { useNavigate, useSearchParams } from "react-router-dom";
import loader from "../../assets/loader.svg";

const Auth = () => {
  const [signState, setSignState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  function renderLoader() {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img className="size-[60px]" src={loader} alt="" />
      </div>
    );
  }

  const user_auth = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (signState === "Sign Up") {
        await signup(email, name, password);
      } else {
        await login(email, password);
      }
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  function renderForm() {
    return (
      <div className="relative flex min-h-screen w-full items-center justify-center bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('/background.jpg')] bg-cover bg-center px-5 pb-10 pt-28">
        <div className="my-10 w-full max-w-[450px] rounded-lg bg-card px-6 pb-10 pt-12 shadow-[0_4px_20px_rgba(0,0,0,0.5)] sm:px-[68px] sm:pt-[60px]">
          <h1 className="mb-7 text-[32px] font-medium text-white">{signState}</h1>
          <form className="flex flex-col gap-4">
            {signState === "Sign Up" ? (
              <input className="h-[50px] min-w-0 rounded border border-border bg-input px-5 py-4 text-base text-white outline-none placeholder:text-muted focus:border-primary"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
              />
            ) : (
              <></>
            )}
            <input className="h-[50px] min-w-0 rounded border border-border bg-input px-5 py-4 text-base text-white outline-none placeholder:text-muted focus:border-primary"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input className="h-[50px] min-w-0 rounded border border-border bg-input px-5 py-4 text-base text-white outline-none placeholder:text-muted focus:border-primary"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button className="mt-6 h-[50px] cursor-pointer rounded bg-primary text-base font-medium text-white transition-colors duration-300 hover:bg-primary-light" onClick={user_auth} type="submit">
              {signState}
            </button>
          </form>
          <div className="mt-10 text-center text-base text-muted">
            {signState === "Sign In" ? (
              <p>
                New to MoviePidia?{" "}
                <span className="cursor-pointer font-medium text-white hover:underline"
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
                <span className="cursor-pointer font-medium text-white hover:underline"
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

  useEffect(() => {
    const mode = searchParams.get("mode");
    if (mode === "signin") {
      setSignState("Sign In");
    } else if (mode === "signup") {
      setSignState("Sign Up");
    }
  }, [searchParams]);

  

  return loading ? renderLoader() : renderForm();
};

export default Auth;
