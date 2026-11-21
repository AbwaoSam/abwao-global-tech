
function App() {
  const applications = [
    {
      name: "TradeFlow",
      description: "Retail and supplier management",
      status: "Coming soon",
    },
    {
      name: "BuildTrack",
      description: "Construction project management",
      status: "Coming soon",
    },
    {
      name: "RouteSync",
      description: "Logistics and delivery management",
      status: "Coming soon",
    },
    {
      name: "WorkLedger",
      description: "Service business operations",
      status: "Coming soon",
    },
    {
      name: "AgriLink",
      description: "Agricultural supply coordination",
      status: "Coming soon",
    },
    {
      name: "Collect",
      description: "Receivables and payment management",
      status: "Coming soon",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <header className="max-w-6xl mx-auto">
        <p className="text-blue-400 font-semibold tracking-widest">
          ABWAO GLOBAL TECH ENTERPRISE
        </p>

        <h1 className="text-4xl font-bold mt-6">
          One ecosystem. Multiple solutions.
        </h1>

        <p className="text-slate-400 mt-3">
          Your unified business technology platform.
        </p>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {applications.map((app) => (
            <article
              key={app.name}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold">{app.name}</h2>

              <p className="text-slate-400 mt-2">
                {app.description}
              </p>

              <p className="text-blue-400 text-sm mt-6">
                {app.status}
              </p>
            </article>
          ))}
        </section>
      </header>
    </main>
  );
}

export default App;
