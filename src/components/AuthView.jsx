import { useState } from 'react';

const SERIF = "'Iowan Old Style','Palatino Linotype',Palatino,'Book Antiqua',Georgia,serif";

export default function AuthView({ onContinue }) {
  const [mode, setMode] = useState('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const submit = (event) => {
    event.preventDefault();
    const fallback = email.split('@')[0] || 'Traveller';
    onContinue({ name: name.trim() || fallback, email: email.trim() || 'traveller@mumbaigems.com' });
  };

  return (
    <main className="absolute inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#f6f0e4] px-5 py-8 text-slate-900">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-slate-900/10 bg-[#fffdf7] shadow-[0_24px_80px_rgba(58,48,32,0.14)] md:grid-cols-[0.9fr_1.1fr]">
        <section className="relative flex min-h-[220px] flex-col justify-between overflow-hidden bg-[#d7e9e2] p-7 sm:p-10 md:min-h-[580px]">
          <div className="relative z-10 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-900/70">
            <span className="grid size-8 place-items-center rounded-full border border-slate-900/30 text-sm">M</span>
            Mumbai Gems
          </div>
          <div className="relative z-10 mt-16 max-w-sm md:mt-0">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-900/60">A softer way to explore</p>
            <h1 className="text-4xl leading-[0.98] tracking-[-0.04em] sm:text-5xl" style={{ fontFamily: SERIF }}>Find the city that feels like yours.</h1>
            <p className="mt-5 max-w-xs text-sm leading-6 text-slate-700/80">Save the places you discover, build your own Mumbai map, and keep every student-friendly detour close.</p>
          </div>
          <div aria-hidden="true" className="absolute -bottom-20 -right-12 size-64 rounded-full border border-slate-900/10 bg-[#f0d9c9]/70 sm:size-80" />
          <div aria-hidden="true" className="absolute -bottom-28 -right-28 size-72 rounded-full border border-slate-900/10 sm:size-96" />
        </section>

        <section className="flex flex-col justify-center p-7 sm:p-12">
          <div className="mb-9">
            <div className="mb-5 flex gap-1 rounded-full bg-slate-100 p-1 text-xs font-medium">
              {['signup', 'login'].map((item) => (
                <button key={item} type="button" onClick={() => setMode(item)} className={`flex-1 rounded-full px-4 py-2.5 capitalize transition ${mode === item ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>
                  {item === 'signup' ? 'Create account' : 'Log in'}
                </button>
              ))}
            </div>
            <h2 className="text-3xl tracking-[-0.035em]" style={{ fontFamily: SERIF }}>{mode === 'signup' ? 'Start your city story.' : 'Welcome back.'}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">{mode === 'signup' ? 'A small profile makes your discoveries feel personal.' : 'Pick up where your last Mumbai walk ended.'}</p>
          </div>

          <form onSubmit={submit} className="flex flex-col gap-4">
            {mode === 'signup' && (
              <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Your name
                <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Aarav Mehta" className="rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-normal normal-case tracking-normal text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10" />
              </label>
            )}
            <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Email address
              <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-normal normal-case tracking-normal text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10" />
            </label>
            <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Password
              <input type="password" required minLength={6} placeholder="••••••••" className="rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-normal normal-case tracking-normal text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10" />
            </label>
            <button type="submit" className="mt-3 rounded-full bg-slate-900 px-5 py-3.5 text-sm font-medium text-white transition hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-4">{mode === 'signup' ? 'Enter Mumbai Gems' : 'Continue exploring'}</button>
          </form>
          <p className="mt-6 text-center text-xs leading-5 text-slate-400">By continuing, you agree to keep the city curious, kind, and respectful.</p>
        </section>
      </div>
    </main>
  );
}
