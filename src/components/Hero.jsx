import React from 'react'
import { Link } from "react-router-dom";
import {
  Globe,
  MapPin,
  Search,
  Wind,
  Umbrella,
  ArrowRight,
} from "lucide-react";
import About from "./About";


function Hero() {
  return (
    <div>
      {" "}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
        <div className="flex items-center justify-center mb-6">
          <Globe className="mr-3 text-blue-200" size={48} />
          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            City Explorer
          </h1>
        </div>

        <h2 className="text-2xl md:text-3xl font-light mb-8 text-blue-100">
          Discover breathtaking cities and real-time weather worldwide
        </h2>

        <div className="relative max-w-lg mx-auto mb-12 group">
          <button className="absolute right-2 top-2 p-2 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-all duration-300">
            <Search size={24} />
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center">
            <MapPin className="mr-2" size={16} /> 1000+ Cities
          </div>
          <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center">
            <Wind className="mr-2" size={16} /> Real-time Weather
          </div>
          <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center">
            <Umbrella className="mr-2" size={16} /> Travel Recommendations
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/explore">
            <button className="px-8 py-4 rounded-full bg-white text-blue-600 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center">
              Start Exploring <ArrowRight className="ml-2" size={20} />
            </button>
          </Link>
          <Link to="/about">
            <button className="px-8 py-4 rounded-full bg-transparent border-2 border-white text-white font-bold text-lg hover:bg-white/10 transition-all duration-300">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero