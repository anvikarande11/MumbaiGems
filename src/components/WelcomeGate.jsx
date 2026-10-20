import { useState } from 'react';

const inputClass = 'w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10';

export default function WelcomeGate({ onContinue }) {
  const [mode, setMode] = useState('login');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    const formData = new FormData(event.currentTarget);
    window.setTimeout(() => onContinue({
      name: formData.get('name') || 'Guest explorer',
      email: formData.get('email'),
      mode,
    }), 450);
  };

  return (
    <div className="welcome-gate" aria-modal="true" role="dialog" aria-labelledby="welcome-title">
      <div className="welcome-panel">
        <div className="welcome-copy">
          <span className="welcome-kicker">Mumbai Gems · private atlas</span>
          <h1 id="welcome-title">Go somewhere<br /><em>worth remembering.</em></h1>
          <p>A considered field guide to the city&apos;s quiet corners, made for curious students and travellers.</p>
          <div className="welcome-note"><span /> Your map opens after you sign in</div>
        </div>
        <div className="auth-card">
          <div className="auth-heading"><span>Welcome back</span><strong>{mode === 'login' ? 'Sign in to explore' : 'Create your traveller profile'}</strong></div>
          <div className="auth-tabs" role="tablist">
            <button className={mode === 'login' ? 'is-active' : ''} onClick={() => setMode('login')} type="button">Sign in</button>
            <button className={mode === 'signup' ? 'is-active' : ''} onClick={() => setMode('signup')} type="button">Join atlas</button>
          </div>
          <form onSubmit={handleSubmit}>
            {mode === 'signup' && <label>Display name<input className={inputClass} name="name" placeholder="What should we call you?" required /></label>}
            <label>Email address<input className={inputClass} type="email" name="email" placeholder="you@example.com" required /></label>
            <label>Password<input className={inputClass} type="password" name="password" placeholder="At least 8 characters" minLength={8} required /></label>
            <button className="auth-submit" type="submit">{submitted ? 'Opening your atlas…' : mode === 'login' ? 'Enter Mumbai Gems' : 'Create my profile'} <span>↗</span></button>
          </form>
          <p className="auth-footnote">No pressure. Your details stay yours.</p>
        </div>
      </div>
    </div>
  );
}
