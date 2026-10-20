const SERIF = "'Iowan Old Style','Palatino Linotype',Palatino,'Book Antiqua',Georgia,serif";

const CSS = `
@keyframes mg-rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
.mg-rise{animation:mg-rise .9s cubic-bezier(.2,.7,.2,1) both}
.mg-rise-late{animation-delay:.4s}
@media (prefers-reduced-motion:reduce){.mg-rise{animation:none}}
`;

export default function IntroView({ onEnter, leaving = false }) {
  return (
    <div
      className={`absolute inset-0 z-50 flex flex-col items-center justify-center px-6 transition-all duration-[800ms] ease-out ${
        leaving ? 'pointer-events-none scale-[1.03] opacity-0' : 'opacity-100'
      }`}
      style={{ background: 'radial-gradient(ellipse at 50% 42%, rgba(30, 58, 95, .75) 0%, rgba(10, 15, 29, .96) 52%, #0a0f1d 100%)' }}
    >
      <style>{CSS}</style>
      <h1
        className="mg-rise text-center text-[clamp(3.5rem,11vw,9rem)] font-normal leading-[0.95] tracking-[-0.03em] text-slate-100"
        style={{ fontFamily: SERIF }}
      >
        Mumbai Gems
      </h1>
      <button
        type="button"
        onClick={onEnter}
        className="mg-rise mg-rise-late group mt-14 inline-flex items-center gap-3 rounded-full border border-cyan-300/60 bg-slate-950/20 px-7 py-3 text-sm font-medium tracking-wide text-cyan-100 transition hover:bg-cyan-300 hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0f1d]"
      >
        Explore City
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
          →
        </span>
      </button>
    </div>
  );
}
