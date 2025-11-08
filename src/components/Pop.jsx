import React, { useState, useEffect, useCallback } from 'react'
import { Lock, Mail, Loader2 } from 'lucide-react'

const Pop = ({ setShow, onSubmitSuccess }) => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  // Input handler
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
    setErrors({
      ...errors,
      [e.target.name]: ""
    })
  }

  // Validation like signup
  const validate = () => {
    const newErrors = {};
    if (!form.email) {
      newErrors.email = "Email is required"
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      newErrors.email = "Invalid email address"
    }
    if (!form.password) {
      newErrors.password = "Password is required"
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }
    return newErrors;
  };

  // Submit event handler with error resolution and UI mimic
  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMsg('')
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);

    // Simulated async login (replace with API as needed)
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg('Welcome back! 🎉');
      if (onSubmitSuccess) onSubmitSuccess();
      setTimeout(() => {
        setShow && setShow(false);
      }, 1100);
    }, 1000);
  };

  // Handle Esc key for closing popup
  const handleKeyDown = useCallback((e) => {
    if ((e.key === "Escape" || e.keyCode === 27) && setShow) {
      setShow(false);
    }
  }, [setShow]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Color scheme variable-based classes for color consistency
  // var(--isabelline), var(--pale-dogwood), var(--ultra-violet), var(--space-cadet) from theme

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[rgba(36,37,64,0.80)] to-[rgba(255,239,232,0.70)] backdrop-blur-sm transition-all"
      style={{
        background: 'linear-gradient(135deg, var(--space-cadet)/80 0%, var(--isabelline)/70 100%)',
        // fallback if custom props missing
      }}
      tabIndex={-1}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="rounded-2xl shadow-2xl p-8 relative w-full max-w-sm animate-fadeInUp"
        style={{
          background: 'var(--isabelline)',
          boxShadow: "0 6px 32px 0 rgba(76,60,101,0.21)",
          color: 'var(--space-cadet)'
        }}
      >
        <button
          className="absolute top-4 right-4 text-2xl font-bold outline-none transition"
          style={{
            color: 'var(--ultra-violet)',
            background: 'var(--isabelline)',
            borderRadius: '50%',
            boxShadow: '0 2px 10px 0 rgba(76,60,101,0.15)'
          }}
          onClick={() => setShow && setShow(false)}
          aria-label="Close"
          onMouseEnter={e => e.target.style.color = 'var(--pale-dogwood)'}
          onMouseLeave={e => e.target.style.color = 'var(--ultra-violet)'}
        >
          &times;
        </button>
        <div className="flex flex-col items-center mb-2">
          <img src="../../public/logo/logo (1).png" alt="logo" className="w-20 h-16 rounded-lg shadow mb-2" style={{background: 'var(--isabelline)'}} />
          <h2
            className="text-3xl font-extrabold mb-0 text-center drop-shadow"
            style={{color: 'var(--space-cadet)'}}
          >Log In</h2>
          <span className="text-xs font-medium" style={{color: 'var(--ultra-violet)'}}>Access your account</span>
        </div>
        <form 
          onSubmit={handleSubmit} 
          className="flex flex-col gap-4 mt-2"
          autoComplete="on"
        >
          <div>
            <label className="block mb-1 font-semibold" htmlFor="email"
              style={{color: 'var(--space-cadet)'}}
            >
              Email
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{color: 'var(--pale-dogwood)'}}
              >
                <Mail size={18} />
              </span>
              <input
                className={`w-full pl-10 pr-3 py-2 border ${
                  errors.email ? "border-[var(--pale-dogwood)]" : "border-[var(--ultra-violet)]"
                } rounded focus:outline-none focus:ring-2 transition font-medium bg-white/90`}
                style={{
                  borderColor: errors.email ? 'var(--pale-dogwood)' : 'var(--ultra-violet)',
                  color: 'var(--space-cadet)',
                  background: 'var(--isabelline)'
                }}
                type="email"
                id="email"
                name="email"
                autoFocus
                value={form.email}
                onChange={handleChange}
                autoComplete="username"
                placeholder="you@email.com"
                disabled={loading}
                spellCheck={false}
              />
            </div>
            {errors.email && <div className="text-xs mt-0.5" style={{color: 'var(--pale-dogwood)'}}>{errors.email}</div>}
          </div>
          <div>
            <label className="block mb-1 font-semibold" htmlFor="password"
              style={{color: 'var(--space-cadet)'}}
            >
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{color: 'var(--pale-dogwood)'}}
              >
                <Lock size={18} />
              </span>
              <input
                className={`w-full pl-10 pr-12 py-2 border ${
                  errors.password ? "border-[var(--pale-dogwood)]" : "border-[var(--ultra-violet)]"
                } rounded focus:outline-none focus:ring-2 transition font-medium bg-white/90`}
                style={{
                  borderColor: errors.password ? 'var(--pale-dogwood)' : 'var(--ultra-violet)',
                  color: 'var(--space-cadet)',
                  background: 'var(--isabelline)'
                }}
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                placeholder="Your password"
                disabled={loading}
                spellCheck={false}
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs px-2 py-0.5 rounded focus:outline-none transition"
                tabIndex={-1}
                style={{
                  background: 'var(--isabelline)',
                  color: 'var(--ultra-violet)',
                  border: `1px solid var(--ultra-violet)`,
                  fontWeight: 600
                }}
                onMouseEnter={e => e.target.style.background = 'var(--pale-dogwood)'}
                onMouseLeave={e => e.target.style.background = 'var(--isabelline)'}
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && <div className="text-xs mt-0.5" style={{color: 'var(--pale-dogwood)'}}>{errors.password}</div>}
          </div>
          <button 
            type="submit"
            className="mt-2 font-semibold py-2 rounded-lg shadow transition-all flex items-center justify-center gap-2 text-base"
            style={{
              background: 'linear-gradient(92deg,var(--pale-dogwood) 0%,var(--ultra-violet) 100%)',
              color: 'var(--isabelline)',
              border: 'none',
              opacity: loading ? '0.7' : '1',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : null}
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>
        {successMsg && (
          <div className="mt-2 text-center font-medium animate-fadeIn"
               style={{color: 'var(--ultra-violet)'}}>{successMsg}</div>
        )}
        <div className="mt-5 text-sm text-center"
          style={{color: 'var(--ultra-violet)'}}
        >
          <span>
            Don't have an account?{" "}
            <span
              className="font-semibold cursor-pointer hover:underline"
              style={{
                color: 'var(--pale-dogwood)',
                textDecoration: 'underline dotted 1.5px',
                cursor: 'pointer'
              }}
              onMouseEnter={e => e.target.style.color = 'var(--space-cadet)'}
              onMouseLeave={e => e.target.style.color = 'var(--pale-dogwood)'}
            >Sign Up</span>
          </span>
          <br />
          <span
            className="block text-xs mt-2 cursor-pointer transition-all underline hover:no-underline"
            style={{
              color: 'var(--ultra-violet)',
              textDecoration: 'underline',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--pale-dogwood)'}
            onMouseLeave={e => e.target.style.color = 'var(--ultra-violet)'}
          >
            Forgot password?
          </span>
        </div>
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          <span style={{ background: 'var(--pale-dogwood)' }} className="rounded-full w-3 h-3 animate-bounce"></span>
          <span style={{ background: 'var(--ultra-violet)' }} className="rounded-full w-2 h-2 mt-1 animate-pulse"></span>
        </div>
      </div>
    </div>
  )
}

export default Pop