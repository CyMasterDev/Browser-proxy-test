import React, { useState, useEffect } from 'react';
import { Search, Lock, ChevronLeft, ChevronRight, RotateCw, ShieldAlert } from 'lucide-react';
import { useBrowserStore } from '../store/browser';
import { useSettingsStore } from '../store/settings';
import { cn } from '../lib/utils';

export function AddressBar() {
  const { tabs, activeTabId, updateTab, setLoading } = useBrowserStore();
  const { proxyType, searchEngine } = useSettingsStore();
  const activeTab = tabs.find(tab => tab.id === activeTabId);
  const [input, setInput] = useState(activeTab?.url || '');
  const [isSecure, setIsSecure] = useState<boolean | null>(null);

  useEffect(() => {
    if (activeTab?.url?.startsWith('/uv/service/')) {
      try {
        const decodedUrl = atob(activeTab.url.replace('/uv/service/', ''));
        setInput(decodedUrl);
        setIsSecure(decodedUrl.startsWith('https://'));
      } catch {
        setInput(activeTab.url);
        setIsSecure(null);
      }
    } else {
      setInput(activeTab?.url === 'about:blank' ? '' : (activeTab?.url || ''));
      setIsSecure(null);
    }
  }, [activeTab?.url]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTabId || !input) return;

    let url = input;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      if (url.includes('.') && !url.includes(' ')) {
        url = `https://${url}`;
      } else {
        const searchUrls = {
          google: 'https://www.google.com/search?q=',
          duckduckgo: 'https://duckduckgo.com/?q=',
          bing: 'https://www.bing.com/search?q=',
        };
        url = `${searchUrls[searchEngine]}${encodeURIComponent(url)}`;
      }
    }

    setLoading(activeTabId, true);

    try {
      const encodedUrl = btoa(url);
      const proxyUrl = `/uv/service/${encodedUrl}`;

      // Attempt to fetch favicon
      const favicon = `https://www.google.com/s2/favicons?domain=${url}&sz=64`;

      updateTab(activeTabId, {
        url: proxyUrl,
        title: url,
        favicon,
      });

      setIsSecure(url.startsWith('https://'));
    } finally {
      setLoading(activeTabId, false);
    }
  };

  return (
    <div className="flex items-center gap-3 w-full max-w-4xl mx-auto px-6 py-3">
      <div className="flex items-center gap-2">
        <button
          className="w-10 h-10 rounded-2xl hover:bg-white/10 flex items-center justify-center
               transition-transform active:scale-90 shadow-lg shadow-white/5
               backdrop-blur-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          className="w-10 h-10 rounded-2xl hover:bg-white/10 flex items-center justify-center
               transition-transform active:scale-90 shadow-lg shadow-white/5
               backdrop-blur-lg"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <button
          className={cn(
            "w-10 h-10 rounded-2xl hover:bg-white/10 flex items-center justify-center",
            "transition-all active:scale-90 shadow-lg shadow-white/5 backdrop-blur-lg",
            activeTab?.loading && "animate-spin"
          )}
        >
          <RotateCw className="w-4 h-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex-1">
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            {isSecure === null ? (
              <Search className="h-4 w-4 text-white group-focus-within:text-white" />
            ) : isSecure ? (
              <Lock className="h-4 w-4 text-green-500 group-focus-within:text-green-400" />
            ) : (
              <ShieldAlert className="h-4 w-4 text-red-500 group-focus-within:text-red-400" />
            )}
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-12 bg-white/0 rounded-2xl pl-12 pr-4
                 text-sm text-white placeholder-white/40 
                 focus:outline-none focus:ring-2 focus:ring-white/20 
                 focus:bg-white/10 transition-all shadow-lg shadow-white/5 backdrop-blur-lg"
            placeholder="Search the web or enter URL"
          />
        </div>
      </form>
    </div>
  );
}