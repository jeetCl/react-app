import React from "react";

export default function MiningInAustralia() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-blue-800 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Mining in Australia</h1>
          <p className="text-lg">Exploring Australia's Rich Mining Heritage and Industry</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <p>
            Mining is a key industry in Australia, contributing significantly to the
            nation's economy. With vast reserves of minerals like iron ore, gold,
            coal, and lithium, Australia is one of the world's leading mining
            countries.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Major Minerals and Resources</h2>
          <ul className="list-disc pl-6">
            <li><strong>Iron Ore:</strong> Australia is the largest exporter of iron ore in the world, primarily mined in Western Australia.</li>
            <li><strong>Coal:</strong> Both thermal and metallurgical coal are significant exports, with major mines in Queensland and New South Wales.</li>
            <li><strong>Gold:</strong> Australia is a leading producer of gold, with mines located across multiple states.</li>
            <li><strong>Lithium:</strong> As demand for batteries grows, Australia's lithium production is expanding rapidly.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Environmental Impact</h2>
          <p>
            Mining has both positive and negative impacts on the environment.
            Sustainable practices and strict regulations are in place to minimize
            the environmental footprint, including land rehabilitation and water
            management.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Economic Contribution</h2>
          <p>
            The mining industry is a major contributor to Australia’s GDP, providing
            thousands of jobs and supporting regional communities. Royalties and
            taxes from mining also fund public services and infrastructure.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Future of Mining</h2>
          <p>
            Advances in technology, including automation and renewable energy
            integration, are shaping the future of mining in Australia. The focus is
            on balancing economic growth with environmental sustainability.
          </p>
        </section>
      </main>

      <footer className="bg-blue-800 text-white py-4 mt-8">
        <div className="container mx-auto px-4">
          <p className="text-center">&copy; 2025 Mining in Australia. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
