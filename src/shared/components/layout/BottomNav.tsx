import React from 'react';
import { Home, MapPin, Calendar, MessageSquare, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../../lib/cn';

export const BottomNav: React.FC = () => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Feed', path: '/' },
    { id: 'map', icon: MapPin, label: 'Mapa', path: '/mapa' },
    { id: 'chat', icon: MessageSquare, label: 'Chat', path: '/chat' },
    { id: 'events', icon: Calendar, label: 'Eventos', path: '/eventos' },
    { id: 'profile', icon: User, label: 'Perfil', path: '/perfil' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border pb-safe md:hidden z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center w-full h-full transition-all active:scale-95",
              isActive
                ? 'text-primary'
                : 'text-muted-foreground hover:text-primary'
            )}
          >
            {({ isActive }) => (
              <>
                <item.icon
                  size={24}
                  className={cn(
                      isActive ? 'fill-current' : '',
                      "transition-all duration-300"
                  )}
                  strokeWidth={isActive ? 2.5 : 2}
                  aria-label={item.label}
                />
                <span className="text-[10px] mt-1 font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};
