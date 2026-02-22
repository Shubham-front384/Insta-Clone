import { EyeOff, Eye } from 'lucide-react';
import { Link } from 'react-router';
import '../Style/style.scss';
import { useState } from 'react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleEye = () => {
    setShowPassword(prev => !prev);
  }

  return (
    <main>
      <div className="left-side">
        <img src="/login.webp" alt="login-img" />
      </div>
      <div className="right-side">
        <div className="right-info">
          <h2>Welcome back!</h2>
          <p>Simplify your workflow and boost your productivity with Insta Clone App. Get started for free.</p>
        </div>

        <form>
          <input type="text" name="username" id="username" placeholder="Username" className='text' />
          <div className="password-input">
            <input type={showPassword ? "text" : "password"} name="password" id="password" placeholder="Password" className='password' />
            {
              showPassword ? (
                <Eye className="eye" onClick={handleEye} />
              ) : (
                <EyeOff className="eye" onClick={handleEye} />
              )
            }
          </div>

          <p>forgot password ?</p>
          <button>login</button>

          <div className='line'>
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
          Not a member ? <Link to="/register">
            Register now
          </Link>
        </p>
      </div>
    </main>
  )
}

export default Login
