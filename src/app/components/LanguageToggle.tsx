'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="join">
      <button 
        className={`join-item btn btn-sm ${language === 'ms' ? 'btn-active btn-primary' : 'btn-ghost'}`}
        onClick={() => setLanguage('ms')}
      >
        MY
      </button>
      <button 
        className={`join-item btn btn-sm ${language === 'en' ? 'btn-active btn-primary' : 'btn-ghost'}`}
        onClick={() => setLanguage('en')}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;

