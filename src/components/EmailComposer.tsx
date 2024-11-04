import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface EmailComposerProps {
  value: string;
  onChange: (value: string) => void;
  isGenerating: boolean;
  onSubmit: () => void;
}

const EmailComposer: React.FC<EmailComposerProps> = ({ 
  value, 
  onChange, 
  isGenerating,
  onSubmit 
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      onSubmit();
    }
  };

  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your email content or describe what you want to say..."
        className="w-full h-48 p-3 bg-white rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 resize-none transition-all"
        disabled={isGenerating}
      />
      {isGenerating && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-lg">
          <div className="flex items-center gap-2">
            <LoadingSpinner size={20} className="text-indigo-600" />
            <span className="text-indigo-600 font-medium">Generating response...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmailComposer;