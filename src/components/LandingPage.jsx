import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Globe,
  MapPin,
  Search,
  Wind,
  Umbrella,
  ArrowRight,
  Import,
} from "lucide-react";
import Footer from "./Footer";
import Hero from "./Hero";
import Explorers from "./Explorers";
import Join from "./Join";


function LandingPage() {
  const [scrollPosition, setScrollPosition] = useState(0);


  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-900 text-white">
  
      <div className="relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
    
       
       <Hero />
       

        <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>
      </div>

  

      <Explorers />
    
    
  <Join />
        
      
    <Footer />
    </div>
  );
}

export default LandingPage;
