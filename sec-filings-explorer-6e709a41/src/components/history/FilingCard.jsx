import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, Building2, FileText } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function FilingCard({ filing, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="bg-white/90 backdrop-blur-sm border-slate-200 hover:shadow-lg transition-all duration-300 group">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-slate-700" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">
                  {filing.ticker} - {filing.filing_type}
                </CardTitle>
                {filing.company_name && (
                  <p className="text-slate-600 mt-1 font-medium">{filing.company_name}</p>
                )}
              </div>
            </div>
            <Button
              size="sm"
              asChild
              className="bg-slate-800 hover:bg-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <a
                href={filing.filing_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                View
              </a>
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-slate-500" />
              <span className="text-slate-600">Filed:</span>
              <span className="font-semibold text-slate-900">
                {format(new Date(filing.filing_date), 'MMM d, yyyy')}
              </span>
            </div>
            
            {filing.reporting_date && (
              <div className="flex items-center gap-2 text-sm">
                <Building2 className="w-4 h-4 text-slate-500" />
                <span className="text-slate-600">Period:</span>
                <span className="font-semibold text-slate-900">
                  {format(new Date(filing.reporting_date), 'MMM d, yyyy')}
                </span>
              </div>
            )}
            
            <div className="flex items-center gap-2 text-sm">
              <FileText className="w-4 h-4 text-slate-500" />
              <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
                {filing.filing_type}
              </Badge>
            </div>
          </div>

          {filing.document_description && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-sm text-slate-600">{filing.document_description}</p>
            </div>
          )}
          
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              Saved on {format(new Date(filing.created_date), 'MMM d, yyyy • h:mm a')}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}