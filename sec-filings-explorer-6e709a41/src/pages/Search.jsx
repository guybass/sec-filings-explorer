import React, { useState } from "react";
import { Filing } from "@/api/entities";
import { InvokeLLM } from "@/api/integrations";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import SearchForm from "../components/search/SearchForm";
import SearchResults from "../components/search/SearchResults";

export default function SearchPage() {
  const [searchData, setSearchData] = useState({
    ticker: "",
    filing_type: "",
    filing_date: "",
    reporting_date: ""
  });
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchData.ticker || !searchData.filing_type) return;

    setIsSearching(true);
    setError(null);
    setResults([]);

    try {
      const prompt = `Search for SEC EDGAR filings for ${searchData.ticker} with the following criteria:
      - Filing Type: ${searchData.filing_type}
      ${searchData.filing_date ? `- Filing Date: ${searchData.filing_date}` : ''}
      ${searchData.reporting_date ? `- Reporting Date: ${searchData.reporting_date}` : ''}
      
      Please provide accurate SEC EDGAR filing URLs from sec.gov/Archives/edgar/ and include company name and document description where available.
      Return the most relevant filings that match the criteria.`;

      const response = await InvokeLLM({
        prompt,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            filings: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  ticker: { type: "string" },
                  company_name: { type: "string" },
                  filing_type: { type: "string" },
                  filing_date: { type: "string" },
                  reporting_date: { type: "string" },
                  filing_url: { type: "string" },
                  document_description: { type: "string" }
                }
              }
            }
          }
        }
      });

      if (response?.filings && response.filings.length > 0) {
        setResults(response.filings);
      } else {
        setError("No filings found matching your criteria. Try adjusting your search parameters.");
      }
    } catch (err) {
      setError("Error searching for filings. Please try again.");
      console.error("Search error:", err);
    }

    setIsSearching(false);
  };

  const handleSaveFiling = async (filing) => {
    try {
      await Filing.create(filing);
    } catch (err) {
      console.error("Error saving filing:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-slate-800 to-slate-700 rounded-3xl flex items-center justify-center shadow-xl">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">SEC Filing Lookup</h1>
          <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Search the EDGAR database for company SEC filings with precision and speed
          </p>
        </motion.div>

        <div className="space-y-8">
          <SearchForm 
            searchData={searchData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            isSearching={isSearching}
          />

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Alert variant="destructive" className="bg-red-50 border-red-200">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="font-medium">{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          <SearchResults 
            results={results}
            onSaveFiling={handleSaveFiling}
          />
        </div>
      </div>
    </div>
  );
}