import React from 'react';
import { Layers, Code, Atom, Binary, Cpu, Zap } from 'lucide-react';

interface HierarchicalExample {
  id: number;
  title: string;
  scale: string;
  universeExample: string;
  applicationExample: string;
  color: string;
  bgGradient: string;
  icon: React.ReactNode;
}

interface HierarchicalExamplesDisplayProps {
  examples: HierarchicalExample[];
}

export const HierarchicalExamplesDisplay: React.FC<HierarchicalExamplesDisplayProps> = ({
  examples
}) => {
  return (
    <div className="space-y-6 lg:space-y-8">
      {examples.map((example, index) => (
        <div
          key={example.id}
          className={`bg-gradient-to-br ${example.bgGradient} backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 border-2 border-white/20 shadow-2xl`}
        >
          {/* En-tête de l'échelle */}
          <div className="text-center mb-4 sm:mb-6">
            <div className="flex items-center justify-center mb-3">
              <div className={`p-3 rounded-full bg-gradient-to-r ${example.color} shadow-lg`}>
                {example.icon}
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
              {example.title}
            </h3>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 inline-block border border-white/20">
              <span className="text-sm sm:text-base font-mono text-cyan-300">{example.scale}</span>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Section Univers */}
            <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 border-2 border-purple-400/40 shadow-xl">
              <div className="bg-purple-800/30 backdrop-blur-sm rounded-lg px-3 py-2 mb-4 border border-purple-300/30">
                <h4 className="text-base sm:text-lg font-bold text-purple-200 text-center flex items-center justify-center">
                  <span className="mr-2">🌌</span>
                  Univers
                </h4>
              </div>
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                {example.universeExample}
              </p>
            </div>

            {/* Section Application */}
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 border-2 border-blue-400/40 shadow-xl">
              <div className="bg-blue-800/30 backdrop-blur-sm rounded-lg px-3 py-2 mb-4 border border-blue-300/30">
                <h4 className="text-base sm:text-lg font-bold text-blue-200 text-center flex items-center justify-center">
                  <span className="mr-2">💻</span>
                  Application
                </h4>
              </div>
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed font-mono">
                {example.applicationExample}
              </p>
            </div>
          </div>

          {/* Flèche vers le niveau suivant (sauf pour le dernier) */}
          {index < examples.length - 1 && (
            <div className="flex justify-center mt-6">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full p-3 shadow-lg animate-pulse">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};