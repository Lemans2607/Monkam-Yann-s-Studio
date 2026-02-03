import React from 'react';
import { Wifi } from 'lucide-react';

const ZeroDataBadge: React.FC = () => {
  return (
    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-900/30 border border-green-500/50 text-green-400 text-xs font-semibold" title="Optimisé pour économiser votre forfait internet">
      <Wifi size={12} className="stroke-[3]" />
      <span>Zéro Data</span>
    </div>
  );
};

export default ZeroDataBadge;