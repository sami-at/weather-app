import React from 'react'
import { Link } from "react-router-dom";

function Join() {
  return (
    <div>
      {" "}
      <div className="py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of travelers discovering new cities every day
          </p>
          <Link to="/signup">
            <button className="px-8 py-4 rounded-full bg-white text-blue-600 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              Create Free Account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Join