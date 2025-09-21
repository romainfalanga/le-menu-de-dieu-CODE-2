import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Layers, Code, Atom, Binary, Cpu, Zap, Plus, Minus, RotateCcw } from 'lucide-react';

// Types pour notre système hiérarchique
interface HumanState {
  // Échelle macroscopique
  age: number;
  height: number;
  weight: number;
  isAlive: boolean;
  
  // Échelle moléculaire (calculé depuis atomique)
  proteinCount: number;
  dnaIntegrity: number;
  lipidBalance: number;
  
  // Échelle atomique (calculé depuis nucléaire)
  carbonAtoms: number;
  hydrogenAtoms: number;
  oxygenAtoms: number;
  nitrogenAtoms: number;
  
  // Échelle nucléaire (calculé depuis particules)
  protonCount: number;
  neutronCount: number;
  
  // Échelle des particules (calculé depuis Planck)
  upQuarks: number;
  downQuarks: number;
  electrons: number;
  
  // Échelle de Planck (base)
  quantumBits: number;
}

// État initial d'un être humain "standard"
const initialHumanState: HumanState = {
  age: 25,
  height: 175,
  weight: 70,
  isAlive: true,
  proteinCount: 0,
  dnaIntegrity: 0,
  lipidBalance: 0,
  carbonAtoms: 0,
  hydrogenAtoms: 0,
  oxygenAtoms: 0,
  nitrogenAtoms: 0,
  protonCount: 0,
  neutronCount: 0,
  upQuarks: 0,
  downQuarks: 0,
  electrons: 0,
  quantumBits: 7000000000000000000000000000 // 7 × 10^27 bits quantiques approximatifs
};

// Fonctions de calcul pour la propagation vers le haut
const calculateFromQuantumBits = (bits: number): Partial<HumanState> => {
  const upQuarks = Math.floor(bits * 0.4);
  const downQuarks = Math.floor(bits * 0.4);
  const electrons = Math.floor(bits * 0.2);
  
  return { upQuarks, downQuarks, electrons };
};

const calculateFromParticles = (upQuarks: number, downQuarks: number, electrons: number): Partial<HumanState> => {
  const protonCount = Math.floor((upQuarks * 2 + downQuarks) / 3);
  const neutronCount = Math.floor((upQuarks + downQuarks * 2) / 3);
  
  return { protonCount, neutronCount };
};

const calculateFromNucleons = (protons: number, neutrons: number): Partial<HumanState> => {
  const carbonAtoms = Math.floor(protons * 0.18); // ~18% de carbone dans le corps humain
  const hydrogenAtoms = Math.floor(protons * 0.63); // ~63% d'hydrogène
  const oxygenAtoms = Math.floor(protons * 0.16); // ~16% d'oxygène
  const nitrogenAtoms = Math.floor(protons * 0.03); // ~3% d'azote
  
  return { carbonAtoms, hydrogenAtoms, oxygenAtoms, nitrogenAtoms };
};

const calculateFromAtoms = (carbon: number, hydrogen: number, oxygen: number, nitrogen: number): Partial<HumanState> => {
  const totalAtoms = carbon + hydrogen + oxygen + nitrogen;
  const proteinCount = Math.floor(totalAtoms / 1000000); // Approximation
  const dnaIntegrity = Math.min(100, Math.floor((carbon + nitrogen) / 10000));
  const lipidBalance = Math.min(100, Math.floor((carbon + hydrogen) / 15000));
  
  return { proteinCount, dnaIntegrity, lipidBalance };
};

const calculateFromMolecules = (proteins: number, dnaIntegrity: number, lipids: number): Partial<HumanState> => {
  const totalMolecularHealth = (proteins + dnaIntegrity + lipids) / 3;
  const age = Math.max(1, Math.min(100, Math.floor(25 + (100 - totalMolecularHealth) * 0.5)));
  const height = Math.max(50, Math.min(220, Math.floor(175 + (totalMolecularHealth - 50) * 0.3)));
  const weight = Math.max(30, Math.min(150, Math.floor(70 + (totalMolecularHealth - 50) * 0.2)));
  const isAlive = totalMolecularHealth > 10;
  
  return { age, height, weight, isAlive };
};

// Fonctions de calcul pour la propagation vers le bas (inverse)
const calculateDownFromMacro = (age: number, height: number, weight: number, isAlive: boolean): Partial<HumanState> => {
  if (!isAlive) {
    return {
      proteinCount: 0,
      dnaIntegrity: 0,
      lipidBalance: 0
    };
  }
  
  const healthFactor = Math.max(0, 100 - age * 0.8);
  const sizeFactor = (height + weight) / 4;
  
  return {
    proteinCount: Math.floor(healthFactor * sizeFactor * 100),
    dnaIntegrity: Math.floor(healthFactor),
    lipidBalance: Math.floor(healthFactor * 0.8)
  };
};

export const HierarchicalExamplesPage: React.FC = () => {
  const [humanState, setHumanState] = useState<HumanState>(initialHumanState);
  const [lastModifiedScale, setLastModifiedScale] = useState<string>('');

  // Force le re-rendu propre de la page
  React.useEffect(() => {
    window.scrollTo(0, 0);
    // Calcul initial de tous les niveaux
    recalculateAllLevels(initialHumanState, 'planck');
  }, []);

  // Fonction pour recalculer tous les niveaux selon la direction
  const recalculateAllLevels = (currentState: HumanState, modifiedScale: string) => {
    let newState = { ...currentState };
    
    if (modifiedScale === 'planck') {
      // Propagation vers le haut depuis Planck
      const particleData = calculateFromQuantumBits(newState.quantumBits);
      newState = { ...newState, ...particleData };
      
      const nucleonData = calculateFromParticles(newState.upQuarks, newState.downQuarks, newState.electrons);
      newState = { ...newState, ...nucleonData };
      
      const atomData = calculateFromNucleons(newState.protonCount, newState.neutronCount);
      newState = { ...newState, ...atomData };
      
      const moleculeData = calculateFromAtoms(newState.carbonAtoms, newState.hydrogenAtoms, newState.oxygenAtoms, newState.nitrogenAtoms);
      newState = { ...newState, ...moleculeData };
      
      const macroData = calculateFromMolecules(newState.proteinCount, newState.dnaIntegrity, newState.lipidBalance);
      newState = { ...newState, ...macroData };
    } else if (modifiedScale === 'macro') {
      // Propagation vers le bas depuis Macro
      const moleculeData = calculateDownFromMacro(newState.age, newState.height, newState.weight, newState.isAlive);
      newState = { ...newState, ...moleculeData };
      
      // Puis continuer la cascade vers le bas...
      const totalMolecules = newState.proteinCount + newState.dnaIntegrity + newState.lipidBalance;
      newState.carbonAtoms = Math.floor(totalMolecules * 1000);
      newState.hydrogenAtoms = Math.floor(totalMolecules * 3000);
      newState.oxygenAtoms = Math.floor(totalMolecules * 800);
      newState.nitrogenAtoms = Math.floor(totalMolecules * 200);
      
      const totalAtoms = newState.carbonAtoms + newState.hydrogenAtoms + newState.oxygenAtoms + newState.nitrogenAtoms;
      newState.protonCount = Math.floor(totalAtoms * 6); // Moyenne approximative
      newState.neutronCount = Math.floor(totalAtoms * 6);
      
      const totalNucleons = newState.protonCount + newState.neutronCount;
      newState.upQuarks = Math.floor(totalNucleons * 2);
      newState.downQuarks = Math.floor(totalNucleons * 1);
      newState.electrons = Math.floor(newState.protonCount);
      
      const totalParticles = newState.upQuarks + newState.downQuarks + newState.electrons;
      newState.quantumBits = totalParticles * 1000000; // Approximation
    }
    
    setHumanState(newState);
    setLastModifiedScale(modifiedScale);
  };

  // Handlers pour les modifications
  const handleMacroChange = (field: keyof HumanState, value: number | boolean) => {
    const newState = { ...humanState, [field]: value };
    recalculateAllLevels(newState, 'macro');
  };

  const handleQuantumChange = (value: number) => {
    const newState = { ...humanState, quantumBits: value };
    recalculateAllLevels(newState, 'planck');
  };

  const resetToDefault = () => {
    recalculateAllLevels(initialHumanState, 'planck');
  };

  const formatLargeNumber = (num: number): string => {
    if (num >= 1e24) return `${(num / 1e24).toFixed(1)}×10²⁴`;
    if (num >= 1e21) return `${(num / 1e21).toFixed(1)}×10²¹`;
    if (num >= 1e18) return `${(num / 1e18).toFixed(1)}×10¹⁸`;
    if (num >= 1e15) return `${(num / 1e15).toFixed(1)}×10¹⁵`;
    if (num >= 1e12) return `${(num / 1e12).toFixed(1)}×10¹²`;
    if (num >= 1e9) return `${(num / 1e9).toFixed(1)}×10⁹`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}×10⁶`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}×10³`;
    return num.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 relative z-10">
        
        {/* Bouton retour */}
        <div className="mb-4 sm:mb-6 flex justify-between items-center">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'analogie principale
          </Link>
          
          <button
            onClick={resetToDefault}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </button>
        </div>

        {/* En-tête */}
        <header className="text-center mb-6 sm:mb-8 lg:mb-12">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-300 via-purple-300 via-pink-300 to-yellow-300 bg-clip-text text-transparent bg-[length:400%_400%] animate-gradient-x drop-shadow-[0_0_30px_rgba(6,182,212,0.8)] mb-3 sm:mb-4 px-2">
            Laboratoire Interactif
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-purple-200 max-w-4xl mx-auto px-4 leading-relaxed">
            Modifiez n'importe quelle échelle et observez les répercussions en temps réel sur toutes les autres !
          </p>
        </header>

        {/* Indicateur de dernière modification */}
        {lastModifiedScale && (
          <div className="text-center mb-6">
            <div className="inline-block bg-yellow-900/30 backdrop-blur-sm rounded-lg px-4 py-2 border border-yellow-400/30">
              <p className="text-yellow-200 text-sm">
                Dernière modification : <strong>{lastModifiedScale === 'macro' ? 'Échelle Macroscopique' : 'Échelle de Planck'}</strong>
              </p>
            </div>
          </div>
        )}

        {/* Système interactif */}
        <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
          
          {/* Échelle Macroscopique - CONTRÔLABLE */}
          <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 lg:p-8 border-2 border-blue-400/40 shadow-2xl">
            <div className="flex items-center mb-4 sm:mb-6">
              <Layers className="w-8 h-8 sm:w-10 sm:h-10 mr-3 text-blue-400" />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-300">
                Échelle Macroscopique (10⁻⁴ m à 1 m) - CONTRÔLABLE
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <label className="block text-blue-200 text-sm font-medium mb-2">Âge (années)</label>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleMacroChange('age', Math.max(1, humanState.age - 1))}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded p-1"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    value={humanState.age}
                    onChange={(e) => handleMacroChange('age', parseInt(e.target.value) || 1)}
                    className="flex-1 bg-white/20 text-white rounded px-2 py-1 text-center"
                    min="1"
                    max="120"
                  />
                  <button 
                    onClick={() => handleMacroChange('age', Math.min(120, humanState.age + 1))}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded p-1"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <label className="block text-blue-200 text-sm font-medium mb-2">Taille (cm)</label>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleMacroChange('height', Math.max(50, humanState.height - 1))}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded p-1"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    value={humanState.height}
                    onChange={(e) => handleMacroChange('height', parseInt(e.target.value) || 50)}
                    className="flex-1 bg-white/20 text-white rounded px-2 py-1 text-center"
                    min="50"
                    max="250"
                  />
                  <button 
                    onClick={() => handleMacroChange('height', Math.min(250, humanState.height + 1))}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded p-1"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <label className="block text-blue-200 text-sm font-medium mb-2">Poids (kg)</label>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleMacroChange('weight', Math.max(30, humanState.weight - 1))}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded p-1"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    value={humanState.weight}
                    onChange={(e) => handleMacroChange('weight', parseInt(e.target.value) || 30)}
                    className="flex-1 bg-white/20 text-white rounded px-2 py-1 text-center"
                    min="30"
                    max="200"
                  />
                  <button 
                    onClick={() => handleMacroChange('weight', Math.min(200, humanState.weight + 1))}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded p-1"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <label className="block text-blue-200 text-sm font-medium mb-2">État</label>
                <button
                  onClick={() => handleMacroChange('isAlive', !humanState.isAlive)}
                  className={`w-full py-2 px-4 rounded font-medium transition-all duration-300 ${
                    humanState.isAlive 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  {humanState.isAlive ? '✅ Vivant' : '💀 Mort'}
                </button>
              </div>
            </div>
          </div>

          {/* Échelles calculées automatiquement */}
          {[
            {
              title: "Échelle Moléculaire (10⁻⁹ à 10⁻⁶ m)",
              icon: <Code className="w-8 h-8 sm:w-10 sm:h-10 mr-3 text-green-400" />,
              color: "from-green-900/50 to-emerald-900/40",
              borderColor: "border-green-400/40",
              textColor: "text-green-300",
              data: [
                { label: "Protéines", value: formatLargeNumber(humanState.proteinCount), unit: "" },
                { label: "Intégrité ADN", value: humanState.dnaIntegrity.toString(), unit: "%" },
                { label: "Équilibre Lipidique", value: humanState.lipidBalance.toString(), unit: "%" }
              ]
            },
            {
              title: "Échelle Atomique (10⁻¹⁰ m)",
              icon: <Zap className="w-8 h-8 sm:w-10 sm:h-10 mr-3 text-yellow-400" />,
              color: "from-yellow-900/50 to-orange-900/40",
              borderColor: "border-yellow-400/40",
              textColor: "text-yellow-300",
              data: [
                { label: "Atomes de Carbone", value: formatLargeNumber(humanState.carbonAtoms), unit: "" },
                { label: "Atomes d'Hydrogène", value: formatLargeNumber(humanState.hydrogenAtoms), unit: "" },
                { label: "Atomes d'Oxygène", value: formatLargeNumber(humanState.oxygenAtoms), unit: "" },
                { label: "Atomes d'Azote", value: formatLargeNumber(humanState.nitrogenAtoms), unit: "" }
              ]
            },
            {
              title: "Échelle Nucléaire (10⁻¹⁵ m)",
              icon: <Atom className="w-8 h-8 sm:w-10 sm:h-10 mr-3 text-purple-400" />,
              color: "from-purple-900/50 to-violet-900/40",
              borderColor: "border-purple-400/40",
              textColor: "text-purple-300",
              data: [
                { label: "Protons", value: formatLargeNumber(humanState.protonCount), unit: "" },
                { label: "Neutrons", value: formatLargeNumber(humanState.neutronCount), unit: "" }
              ]
            },
            {
              title: "Échelle des Particules Fondamentales (10⁻¹⁸ m)",
              icon: <Cpu className="w-8 h-8 sm:w-10 sm:h-10 mr-3 text-red-400" />,
              color: "from-red-900/50 to-pink-900/40",
              borderColor: "border-red-400/40",
              textColor: "text-red-300",
              data: [
                { label: "Quarks Up", value: formatLargeNumber(humanState.upQuarks), unit: "" },
                { label: "Quarks Down", value: formatLargeNumber(humanState.downQuarks), unit: "" },
                { label: "Électrons", value: formatLargeNumber(humanState.electrons), unit: "" }
              ]
            }
          ].map((scale, index) => (
            <div key={index} className={`bg-gradient-to-br ${scale.color} backdrop-blur-sm rounded-xl p-4 sm:p-6 lg:p-8 border-2 ${scale.borderColor} shadow-2xl`}>
              <div className="flex items-center mb-4 sm:mb-6">
                {scale.icon}
                <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold ${scale.textColor}`}>
                  {scale.title} - CALCULÉ
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {scale.data.map((item, itemIndex) => (
                  <div key={itemIndex} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-white text-sm font-medium mb-1">{item.label}</div>
                    <div className="text-white text-lg font-bold">
                      {item.value} {item.unit}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Échelle de Planck - CONTRÔLABLE */}
          <div className="bg-gradient-to-br from-gray-900/50 to-slate-900/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 lg:p-8 border-2 border-gray-400/40 shadow-2xl">
            <div className="flex items-center mb-4 sm:mb-6">
              <Binary className="w-8 h-8 sm:w-10 sm:h-10 mr-3 text-gray-400" />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-300">
                Échelle de Planck (10⁻³⁵ m) - CONTRÔLABLE
              </h2>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <label className="block text-gray-200 text-sm font-medium mb-2">
                Bits Quantiques (modifiez pour voir l'effet sur toutes les échelles supérieures)
              </label>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => handleQuantumChange(Math.max(1e20, humanState.quantumBits * 0.9))}
                  className="bg-gray-600 hover:bg-gray-700 text-white rounded px-4 py-2"
                >
                  ÷ 1.1
                </button>
                <div className="flex-1 text-center">
                  <div className="text-white text-lg font-bold">
                    {formatLargeNumber(humanState.quantumBits)} bits
                  </div>
                  <input
                    type="range"
                    min={1e20}
                    max={1e28}
                    step={1e24}
                    value={humanState.quantumBits}
                    onChange={(e) => handleQuantumChange(parseInt(e.target.value))}
                    className="w-full mt-2"
                  />
                </div>
                <button 
                  onClick={() => handleQuantumChange(Math.min(1e28, humanState.quantumBits * 1.1))}
                  className="bg-gray-600 hover:bg-gray-700 text-white rounded px-4 py-2"
                >
                  × 1.1
                </button>
              </div>
            </div>
          </div>

          {/* Explication */}
          <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/40 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 border-2 border-indigo-400/40 shadow-2xl text-center">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-indigo-300 mb-4 sm:mb-6">
              Comment ça marche ?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="bg-blue-900/30 backdrop-blur-sm rounded-lg p-4 border-l-4 border-blue-400">
                <h3 className="text-blue-300 font-bold mb-2">⬇️ Propagation vers le bas</h3>
                <p className="text-gray-200 text-sm leading-relaxed">
                  Modifiez l'<strong>échelle macroscopique</strong> (âge, taille, poids) et observez comment ces changements 
                  se répercutent automatiquement sur toutes les échelles inférieures : moléculaire → atomique → nucléaire → particules → Planck.
                </p>
              </div>
              
              <div className="bg-purple-900/30 backdrop-blur-sm rounded-lg p-4 border-l-4 border-purple-400">
                <h3 className="text-purple-300 font-bold mb-2">⬆️ Propagation vers le haut</h3>
                <p className="text-gray-200 text-sm leading-relaxed">
                  Modifiez l'<strong>échelle de Planck</strong> (bits quantiques) et observez comment ces changements 
                  remontent automatiquement à travers toutes les échelles : particules → nucléaire → atomique → moléculaire → macroscopique.
                </p>
              </div>
            </div>
            
            <div className="mt-6 bg-yellow-900/30 backdrop-blur-sm rounded-lg p-4 border-l-4 border-yellow-400">
              <p className="text-gray-200 text-sm leading-relaxed">
                <strong className="text-yellow-300">Expérimentez !</strong> Essayez de "tuer" l'être humain en modifiant son état, 
                ou changez drastiquement les bits quantiques pour voir un être humain complètement différent émerger !
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};