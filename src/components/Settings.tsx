import React from 'react';
import { useSettingsStore } from '../store/settings';

export function Settings() {
  const {
    theme,
    setTheme,
    proxyType,
    setProxyType,
    searchEngine,
    setSearchEngine
  } = useSettingsStore();

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black text-white overflow-auto">
      <div className="max-w-3xl mx-auto py-12 px-6">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Settings</h1>
          <p className="text-white/60">Customize your browsing experience</p>
        </div>

        <div className="space-y-12">
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-6">Appearance</h3>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm
                       focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-6">Proxy Transport</h3>
            <select
              value={proxyType}
              onChange={(e) => setProxyType(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm
                       focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              <option value="ultraviolet">Ultraviolet</option>
              <option value="bare">Bare</option>
              <option value="epoxy">Epoxy</option>
              <option value="libcurl">LibCurl</option>
            </select>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-6">Search Engine</h3>
            <select
              value={searchEngine}
              onChange={(e) => setSearchEngine(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm
                       focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              <option value="google">Google</option>
              <option value="duckduckgo">DuckDuckGo</option>
              <option value="bing">Bing</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}