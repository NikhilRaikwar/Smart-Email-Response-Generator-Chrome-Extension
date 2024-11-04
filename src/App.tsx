import React, { useState, useCallback } from 'react';
import { PenLine, Wand2, Send, Copy } from 'lucide-react';
import EmailComposer from './components/EmailComposer';
import ToneSelector from './components/ToneSelector';
import { ToneType } from './types';
import { generateEmailResponse, adjustTone } from './utils/aiService';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTone, setSelectedTone] = useState<ToneType>('professional');

  const handleGenerate = useCallback(async () => {
    if (!emailContent.trim()) return;

    setIsGenerating(true);
    try {
      const response = await generateEmailResponse(emailContent, selectedTone);
      setEmailContent(response);
    } catch (error) {
      console.error('Failed to generate response:', error);
      // In a production app, show a proper error message to the user
    } finally {
      setIsGenerating(false);
    }
  }, [emailContent, selectedTone]);

  const handleToneChange = useCallback(async (newTone: ToneType) => {
    if (!emailContent.trim()) {
      setSelectedTone(newTone);
      return;
    }

    setIsGenerating(true);
    try {
      const adjustedText = await adjustTone(emailContent, newTone);
      setEmailContent(adjustedText);
      setSelectedTone(newTone);
    } catch (error) {
      console.error('Failed to adjust tone:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [emailContent]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(emailContent);
      // In a production app, show a success toast
    } catch (error) {
      console.error('Failed to copy:', error);
      // In a production app, show an error toast
    }
  }, [emailContent]);

  return (
    <div className="w-[400px] min-h-[500px] bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <PenLine className="w-6 h-6 text-indigo-600" />
          <h1 className="text-xl font-semibold text-gray-800">Smart Email Response</h1>
        </div>
      </header>

      <main className="space-y-4">
        <EmailComposer 
          value={emailContent}
          onChange={setEmailContent}
          isGenerating={isGenerating}
          onSubmit={handleGenerate}
        />

        <ToneSelector 
          selectedTone={selectedTone}
          onToneSelect={handleToneChange}
        />

        <div className="flex gap-2">
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !emailContent.trim()}
            className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Wand2 className="w-4 h-4" />
            Generate Response
          </button>
          
          <button
            onClick={handleCopy}
            disabled={!emailContent.trim()}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </main>

      <footer className="mt-6 text-center text-sm text-gray-500">
        <p>Press Cmd/Ctrl + Enter to generate</p>
      </footer>
    </div>
  );
}

export default App;