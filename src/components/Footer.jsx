import React from 'react'
import { Link } from "react-router-dom";
import {
  Globe
} from "lucide-react";
function Footer() {
  return (
    <div>
      {" "}
      <footer className="py-10 px-4 bg-blue-900 bg-opacity-50 backdrop-blur-md border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold flex items-center">
              <Globe className="mr-2" size={24} />
              City Explorer
            </h2>
            <p className="text-blue-200">
              Discover the world, one city at a time
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/about"
              className="text-blue-200 hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-blue-200 hover:text-white transition-colors"
            >
              Contact
            </Link>
            <Link
              to="/privacy"
              className="text-blue-200 hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="text-blue-200 hover:text-white transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center text-blue-300 text-sm">
          © {new Date().getFullYear()} City Explorer. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Footer