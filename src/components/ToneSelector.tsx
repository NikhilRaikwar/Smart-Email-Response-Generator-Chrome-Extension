import React from 'react';
import { ToneType } from '../types';

interface ToneSelectorProps {
  selectedTone: ToneType;
  onToneSelect: (tone: ToneType) => void;
}

const tones: { value: ToneType; label: string }[] = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'casual', label: 'Casual' },
  { value: 'formal', label: 'Formal' }
];

const ToneSelector: React.FC<ToneSelectorProps> = ({ selectedTone, onToneSelect }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tones.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onToneSelect(value)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            selectedTone === value
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-indigo-50'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default ToneSelector;