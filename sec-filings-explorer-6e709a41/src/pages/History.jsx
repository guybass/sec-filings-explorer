import React, { useState, useEffect } from "react";
import { Filing } from "@/api/entities";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { motion } from "framer-motion";

import FilingCard from "../components/history/FilingCard";

export default function HistoryPage() {
  const [filings, setFilings] = useState([]);
  const [filteredFilings, setFilteredFilings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFilings();
  }, []);

  useEffect(() => {
    filterFilings();
  }, [filings, searchTerm, filterType]);

  const loadFilings = async () => {
    try {
      const data = await Filing.list('-created_date');
      setFilings(data);
    } catch (error) {
      console.error("Error loading filings:", error);
    }
    setIsLoading(false);
  };

  const filterFilings = () => {
    let filtered = filings;

    if (searchTerm) {
      filtered = filtered.filter(filing =>
        filing.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
        filing.company_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== "all") {
      filtered = filtered.filter(filing => filing.filing_type === filterType);
    }

    setFilteredFilings(filtered);
  };

  const uniqueFilingTypes = [...new Set(filings.map(f => f.filing_type))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Filing History</h1>
          <p className="text-slate-600 text-lg">Your saved SEC filings and research</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search by ticker or company name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 bg-white/80 border-slate-200 focus:border-slate-400"
              />
            </div>
            <div className="flex items-center gap-2 md:w-48">
              <Filter className="w-5 h-5 text-slate-500" />
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="h-12 bg-white/80 border-slate-200">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {uniqueFilingTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        <div className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-800" />
            </div>
          ) : filteredFilings.length > 0 ? (
            filteredFilings.map((filing, index) => (
              <FilingCard key={filing.id} filing={filing} index={index} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-slate-500 text-lg">
                {filings.length === 0 ? "No saved filings yet" : "No filings match your search"}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}