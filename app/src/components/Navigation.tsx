
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface NavigationProps {
  items: NavigationItem[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ items, activeTab, onTabChange }) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden lg:flex lg:flex-col lg:fixed lg:top-0 lg:left-0 lg:w-64 lg:h-full bg-white/95 backdrop-blur-md border-r border-gray-200/50 z-50">
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center h-16 px-6 border-b border-gray-200/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TM</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                TeacherHub
              </h1>
            </div>
          </div>
          
          <div className="flex-1 px-4 py-6">
            <ul className="space-y-2">
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => onTabChange(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl transition-all duration-200 group",
                        isActive 
                          ? "bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-600 shadow-lg shadow-blue-500/10" 
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50/80"
                      )}
                    >
                      <Icon className={cn(
                        "h-5 w-5 transition-colors duration-200",
                        isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
                      )} />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200/50 z-50">
        <div className="flex">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "flex-1 flex flex-col items-center gap-1 py-3 px-2 transition-colors duration-200",
                  isActive ? "text-blue-600" : "text-gray-400"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
