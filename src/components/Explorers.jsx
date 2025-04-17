import React from 'react'

function Explorers() {
  return (
    <div>
      {" "}
      <div className="py-20 px-4 bg-blue-800 bg-opacity-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            What Explorers Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-300 mr-4"></div>
                  <div>
                    <h3 className="font-bold">Traveler {idx}</h3>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-blue-100 italic">
                  "City Explorer made my trip planning so much easier! The
                  weather forecasts were spot on and the city recommendations
                  were perfect."
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Explorers