export default function About(){
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold tracking-tight">About Elif</h1>
      <p className="text-slate-600 mt-4 max-w-2xl">We are a creative digital agency focused on elegant design, modern engineering, and measurable outcomes. Our process: Discovery → Design → Development → Launch → Support.</p>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 rounded-xl border bg-white/70 backdrop-blur">
          <h2 className="text-lg font-semibold">Values</h2>
          <ul className="mt-3 list-disc pl-6 text-slate-700 space-y-1">
            <li>Clarity and honesty</li>
            <li>Design with purpose</li>
            <li>Reliable delivery</li>
            <li>Long-term partnerships</li>
          </ul>
        </div>
        <div className="p-6 rounded-xl border bg-white/70 backdrop-blur">
          <h2 className="text-lg font-semibold">Team</h2>
          <p className="mt-3 text-slate-700">Small senior team with strong network of specialists. Scales based on your needs.</p>
        </div>
      </div>
    </main>
  );
}
