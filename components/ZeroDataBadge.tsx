import React from 'react';
import { Wifi } from 'lucide-react';
import Tooltip from './Tooltip';

const ZeroDataBadge: React.FC = () => {
  return (
    <Tooltip text="Fichiers compressés pour économiser votre forfait internet (3G/4G).">
      <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-900/30 border border-green-500/50 text-green-400 text-xs font-semibold cursor-help">
        <Wifi size={12} className="stroke-[3]" />
        <span>Zéro Data</span>
      </div>
    </Tooltip>
  );
};

export default ZeroDataBadge;