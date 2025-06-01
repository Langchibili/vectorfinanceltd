// app/reset-password/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { api_url } from '@/Constants'; // ← Ensure this points at your Strapi base URL
import Link from 'next/link';

export default function ResetPasswordPage() {
  // Grab the "code" from the URL: /reset-password?code=<token>
  const params = useSearchParams();
  const router = useRouter();
  const code = params.get('code') ?? '';

  // Local state for form fields & status
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // If someone lands here without a code, show a warning
  useEffect(() => {
    if (!code) {
      setError('No reset‐token provided. Please use the link sent to your email.');
    }
  }, [code]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Basic client‐side validation
    if (!password || !passwordConfirmation) {
      setError('Please fill in both fields.');
      return;
    }
    if (password !== passwordConfirmation) {
      setError('Passwords do not match.');
      return;
    }
    if (!code) {
      setError('Missing reset token. You must use the link from your email.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${api_url}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,                   // the token from the query
          password,               // new password
          passwordConfirmation,   // must match `password`
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Strapi returns { error: { message: "..." } } on failure
        const message = data?.error?.message || 'Reset failed. Try again.';
        setError(message);
        setLoading(false);
        return;
      }

      // On success, Strapi returns { jwt, user }. We simply redirect to login.
      setSuccessMessage('Password reset successful! Redirecting to login…');
      setTimeout(() => {
        router.push('/login');
      }, 2500);
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      <div className="card w-100 mx-auto" style={{ maxWidth: '400px' }}>
        <div className="card-body p-4">
          <h3 className="card-title text-center mb-3">Reset Your Password</h3>

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          {successMessage ? (
            <div className="alert alert-success text-center">
              {successMessage} <br />
              <small>
                If you are not redirected automatically,{' '}
                <Link href="/login" className="text-decoration-underline">
                  click here
                </Link>.
              </small>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="new-password" className="form-label">
                  New Password
                </label>
                <input
                  id="new-password"
                  type="password"
                  className="form-control"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="confirm-password" className="form-label">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  className="form-control"
                  placeholder="Re-enter new password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? 'Resetting…' : 'Reset Password'}
              </button>
            </form>
          )}

          <div className="mt-4 text-center">
            <Link href="/signin" className="text-decoration-underline">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
