import React from 'react';
import { useBrowserStore } from '../store/browser';
import { useSettingsStore } from '../store/settings';
import { AddressBar } from './AddressBar';
import { Settings } from './Settings';
import { cn } from '../lib/utils';
import { Settings as SettingsIcon } from 'lucide-react';

export function Browser() {
  const { tabs, activeTabId } = useBrowserStore();
  const activeTab = tabs.find(tab => tab.id === activeTabId);
  const isSettingsPage = activeTab?.url === 'browser://settings';

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="h-20 flex items-center bg-black/30 backdrop-blur-2xl border-b border-white/10">
        <AddressBar />
      </div>
      
      <div className="flex-1 bg-white relative">
        {isSettingsPage ? (
          <Settings />
        ) : activeTab?.url !== 'about:blank' ? (
          <iframe
            key={activeTab?.id}
            src={activeTab?.url}
            className={cn(
              "w-full h-full border-none transition-opacity duration-300",
              activeTab?.loading ? "opacity-50" : "opacity-100"
            )}
            title={activeTab?.title}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
            <div className="text-center scale-up-animation">
              <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent 
                           bg-gradient-to-r from-blue-500 to-purple-600">
                New Tab
              </h1>
              <p className="text-white/60 text-lg">Search the web or enter URL</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}