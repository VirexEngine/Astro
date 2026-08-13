import React from 'react';
import { CompatibilityReport } from '../../types/compatibility';
import { ScoreCircle } from './ScoreCircle';
import { MetricCard } from './MetricCard';

interface ResultDashboardProps {
  report: CompatibilityReport;
}

export const ResultDashboard: React.FC<ResultDashboardProps> = ({ report }) => {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 items-center lg:items-start justify-center">
      {/* Left Column: Overall Circular Score */}
      <div className="w-full lg:w-80 flex flex-col items-center bg-glass-dark border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-purple/5 rounded-full filter blur-xl" />
        <ScoreCircle
          score={report.overallScore}
          rating={report.matchRating}
        />
      </div>

      {/* Right Column: 6 Grid Metric Cards */}
      <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {report.metrics.map((metric) => (
          <MetricCard
            key={metric.id}
            id={metric.id}
            name={metric.name}
            score={metric.score}
            description={metric.description}
            influence={metric.influence}
          />
        ))}
      </div>
    </div>
  );
};
