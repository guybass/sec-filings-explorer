import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const FILING_TYPES = [
  { value: "10-K", label: "10-K - Annual Report" },
  { value: "10-Q", label: "10-Q - Quarterly Report" },
  { value: "8-K", label: "8-K - Current Report" },
  { value: "DEF 14A", label: "DEF 14A - Proxy Statement" },
  { value: "S-1", label: "S-1 - Registration Statement" },
  { value: "S-3", label: "S-3 - Registration Statement" },
  { value: "424B", label: "424B - Prospectus" }
];

export default function SearchForm({ searchData, onInputChange, onSubmit, isSearching }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-white/50 pointer-events-none" />
        <CardHeader className="relative pb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl flex items-center justify-center shadow-lg">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-slate-900">Find SEC Filings</CardTitle>
              <p className="text-slate-600 mt-1 font-medium">Search EDGAR database for company filings</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="relative space-y-8">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="ticker" className="text-sm font-semibold text-slate-700">Stock Ticker</Label>
                <Input
                  id="ticker"
                  placeholder="e.g. MSFT, AAPL, TSLA"
                  value={searchData.ticker}
                  onChange={(e) => onInputChange('ticker', e.target.value.toUpperCase())}
                  className="h-12 text-lg font-mono bg-white/80 border-slate-200 focus:border-slate-400 focus:ring-slate-400/20 transition-all duration-200"
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="filing_type" className="text-sm font-semibold text-slate-700">Filing Type</Label>
                <Select value={searchData.filing_type} onValueChange={(value) => onInputChange('filing_type', value)}>
                  <SelectTrigger className="h-12 bg-white/80 border-slate-200 focus:border-slate-400 transition-all duration-200">
                    <SelectValue placeholder="Select filing type" />
                  </SelectTrigger>
                  <SelectContent>
                    {FILING_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="filing_date" className="text-sm font-semibold text-slate-700">Filing Date</Label>
                <Input
                  id="filing_date"
                  type="date"
                  value={searchData.filing_date}
                  onChange={(e) => onInputChange('filing_date', e.target.value)}
                  className="h-12 bg-white/80 border-slate-200 focus:border-slate-400 focus:ring-slate-400/20 transition-all duration-200"
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="reporting_date" className="text-sm font-semibold text-slate-700">Reporting Date</Label>
                <Input
                  id="reporting_date"
                  type="date"
                  value={searchData.reporting_date}
                  onChange={(e) => onInputChange('reporting_date', e.target.value)}
                  className="h-12 bg-white/80 border-slate-200 focus:border-slate-400 focus:ring-slate-400/20 transition-all duration-200"
                />
              </div>
            </div>

            <div className="pt-6">
              <Button
                type="submit"
                size="lg"
                disabled={isSearching || !searchData.ticker || !searchData.filing_type}
                className="w-full h-14 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isSearching ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    Searching SEC Database...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Search SEC Filings
                  </div>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}