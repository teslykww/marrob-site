import { useState } from 'react';

export default function App() {
  const [page, setPage] = useState<'landing' | 'dealers'>('landing');

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center shadow-sm z-10">
        <div className="font-bold text-lg text-gray-800">MARROB Preview</div>
        <div className="flex gap-2">
          <button 
            onClick={() => setPage('landing')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${page === 'landing' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Главная (Лендинг)
          </button>
          <button 
            onClick={() => setPage('dealers')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${page === 'dealers' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Страница Дилеров (B2B)
          </button>
        </div>
      </div>
      <div className="flex-1 w-full bg-white">
        <iframe 
          src={page === 'landing' ? '/landing.html' : '/dealers.html'} 
          className="w-full h-full border-none"
          title="Preview"
        />
      </div>
    </div>
  );
}
