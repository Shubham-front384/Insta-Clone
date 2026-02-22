import { EyeOff, Eye } from 'lucide-react';
import { Link } from 'react-router';
import '../Style/style.scss';
import { useState } from 'react';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleEye = () => {
    setShowPassword(prev => !prev);
  }

  return (
    <main className="right">
      <div className="left-side">
        <img src="/register.webp" alt="register-img" />
      </div>
      <div className="right-side">
        <div className="right-info">
          <h2>Welcome!</h2>
          <p>
            Simplify your workflow and boost your productivity with Insta Clone
            App. Get started for free.
          </p>
        </div>

        <form>
          <div className="inputs">
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              className="text"
            />
            <input type="email" name="email" id="email" placeholder="Email" />
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                className="password"
              />
              {
                showPassword ? (
                  <Eye className="eye" onClick={handleEye} />
                ) : (
                    <EyeOff className="eye" onClick={handleEye} />
                )
              }
            </div>
          </div>

          <p>forgot password ?</p>
          <button>register</button>

          <div className="line">
            <span></span>
            <h5>or continue with</h5>
            <span></span>
          </div>

          <ul className="app-login">
            <li>Google</li>
            <li>Facebook</li>
            <li>Discord</li>
          </ul>
        </form>

        <p>
          Already a member ? <Link to="/login">Login now</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
