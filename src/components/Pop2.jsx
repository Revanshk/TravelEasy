import React, { useState, useCallback, useEffect } from 'react'

const Pop2 = ({ setShow, onSubmitSuccess }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
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

  // Sign up form validation
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };

  // Submit event handler with error resolution
  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMsg('');
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);

    // Simulated async sign-up (replace with API as needed)
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg('Registration successful! 🎉');
      if (onSubmitSuccess) onSubmitSuccess();
      setTimeout(() => {
        setShow && setShow(false);
      }, 1100);
    }, 1000);
  };

  // Allow Esc key to close the popup (consistency with Pop.jsx)
  const handleKeyDown = useCallback((e) => {
    if ((e.key === "Escape" || e.keyCode === 27) && setShow) {
      setShow(false);
    }
  }, [setShow]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Color variables
  // var(--isabelline), var(--pale-dogwood), var(--ultra-violet), var(--space-cadet) from theme

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[rgba(36,37,64,0.80)] to-[rgba(255,239,232,0.70)] backdrop-blur-sm transition-all"
      style={{
        background: 'linear-gradient(135deg, var(--space-cadet)/80 0%, var(--isabelline)/70 100%)',
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
          >
            Sign Up
          </h2>
          <span className="text-xs font-medium" style={{color: 'var(--ultra-violet)'}}>Create your account</span>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2" autoComplete="on">
          <div>
            <label
              className="block mb-1 font-semibold"
              htmlFor="name"
              style={{color: 'var(--space-cadet)'}}
            >
              Name
            </label>
            <input
              className={`w-full px-3 py-2 border ${
                errors.name ? "border-[var(--pale-dogwood)]" : "border-[var(--ultra-violet)]"
              } rounded-lg bg-[var(--isabelline)] focus:outline-none focus:ring-2 focus:ring-[var(--pale-dogwood)] transition font-medium`}
              type="text"
              id="name"
              name="name"
              value={form.name}
              autoComplete="name"
              onChange={handleChange}
              disabled={loading}
              placeholder="Enter your full name"
              style={{color: 'var(--space-cadet)'}}
            />
            {errors.name && <div className="text-xs mt-0.5" style={{color: 'var(--pale-dogwood)'}}>{errors.name}</div>}
          </div>
          <div>
            <label
              className="block mb-1 font-semibold"
              htmlFor="email"
              style={{color: 'var(--space-cadet)'}}
            >
              Email
            </label>
            <input
              className={`w-full px-3 py-2 border ${
                errors.email ? "border-[var(--pale-dogwood)]" : "border-[var(--ultra-violet)]"
              } rounded-lg bg-[var(--isabelline)] focus:outline-none focus:ring-2 focus:ring-[var(--pale-dogwood)] transition font-medium`}
              type="email"
              id="email"
              name="email"
              value={form.email}
              autoComplete="email"
              onChange={handleChange}
              disabled={loading}
              placeholder="Enter your email"
              style={{color: 'var(--space-cadet)'}}
            />
            {errors.email && <div className="text-xs mt-0.5" style={{color: 'var(--pale-dogwood)'}}>{errors.email}</div>}
          </div>
          <div>
            <label
              className="block mb-1 font-semibold"
              htmlFor="password"
              style={{color: 'var(--space-cadet)'}}
            >
              Password
            </label>
            <input
              className={`w-full px-3 py-2 border ${
                errors.password ? "border-[var(--pale-dogwood)]" : "border-[var(--ultra-violet)]"
              } rounded-lg bg-[var(--isabelline)] focus:outline-none focus:ring-2 focus:ring-[var(--pale-dogwood)] transition font-medium`}
              type="password"
              id="password"
              name="password"
              value={form.password}
              autoComplete="new-password"
              onChange={handleChange}
              disabled={loading}
              placeholder="Create a password"
              style={{color: 'var(--space-cadet)'}}
            />
            {errors.password && <div className="text-xs mt-0.5" style={{color: 'var(--pale-dogwood)'}}>{errors.password}</div>}
          </div>
          <div>
            <label
              className="block mb-1 font-semibold"
              htmlFor="confirmPassword"
              style={{color: 'var(--space-cadet)'}}
            >
              Confirm Password
            </label>
            <input
              className={`w-full px-3 py-2 border ${
                errors.confirmPassword ? "border-[var(--pale-dogwood)]" : "border-[var(--ultra-violet)]"
              } rounded-lg bg-[var(--isabelline)] focus:outline-none focus:ring-2 focus:ring-[var(--pale-dogwood)] transition font-medium`}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={form.confirmPassword}
              autoComplete="new-password"
              onChange={handleChange}
              disabled={loading}
              placeholder="Re-enter your password"
              style={{color: 'var(--space-cadet)'}}
            />
            {errors.confirmPassword && <div className="text-xs mt-0.5" style={{color: 'var(--pale-dogwood)'}}>{errors.confirmPassword}</div>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`mt-2 font-semibold py-2 rounded-lg shadow transition-all duration-200
              bg-gradient-to-r from-[var(--ultra-violet)] to-[var(--pale-dogwood)]
              hover:from-[var(--ultra-violet)]/90 hover:to-[var(--pale-dogwood)]/95
              text-[var(--isabelline)]
              ${loading ? "opacity-60 cursor-not-allowed" : ""}`
            }
            style={{boxShadow: "0 3px 10px 0 rgba(134,84,138,0.13)"}}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Signing Up...
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
          {successMsg && (
            <div
              className="text-center py-2 mt-2 rounded-lg font-medium shadow-sm animate-fadeIn"
              style={{
                background: 'var(--pale-dogwood)',
                color: 'var(--space-cadet)',
                border: '1px solid var(--ultra-violet)'
              }}
            >
              {successMsg}
            </div>
          )}
        </form>
        <p className="text-xs text-center mt-5" style={{color: 'var(--ultra-violet)'}}>
          Already have an account?{" "}
          <span
            className="font-semibold cursor-pointer hover:underline"
            style={{color: 'var(--pale-dogwood)'}}
            onClick={() => setShow && setShow(false)}
            onMouseEnter={e => e.target.style.color = 'var(--ultra-violet)'}
            onMouseLeave={e => e.target.style.color = 'var(--pale-dogwood)'}
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  )
}

export default Pop2
