import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, Clock } from 'lucide-react';

export function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-8">
        <h1 className="text-4xl sm:text-6xl font-bold text-gray-900">
          Academic Research Support
          <span className="text-indigo-600"> Made Simple</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Connect with expert service providers for all your research needs. From proofreading to data
          analysis, we've got you covered.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/services"
            className="bg-indigo-600 text-white px-8 py-3 rounded-md hover:bg-indigo-700"
          >
            Browse Services
          </Link>
          <Link
            to="/auth"
            className="bg-white text-indigo-600 px-8 py-3 rounded-md border border-indigo-600 hover:bg-indigo-50"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <Search className="w-12 h-12 text-indigo-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Find Expert Services</h3>
          <p className="text-gray-600">
            Browse through our curated list of academic services and find the perfect match for your
            research needs.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <BookOpen className="w-12 h-12 text-indigo-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
          <p className="text-gray-600">
            All our service providers are vetted professionals with proven expertise in their respective
            fields.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <Clock className="w-12 h-12 text-indigo-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
          <p className="text-gray-600">
            Stay updated with real-time progress tracking and direct communication with your service
            provider.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600 text-white rounded-2xl p-8 sm:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to elevate your research?</h2>
        <p className="text-lg mb-8 opacity-90">
          Join thousands of researchers who trust Support-Res for their academic needs.
        </p>
        <Link
          to="/auth"
          className="bg-white text-indigo-600 px-8 py-3 rounded-md hover:bg-gray-100 inline-block"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}