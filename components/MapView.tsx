import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useApp } from '../contexts/AppContext';
import { Post, Alert } from '../types';
import L from 'leaflet';
import { Navigation, MapPin, Filter } from 'lucide-react';

// Custom Icons
const createIcon = (color: string) => {
    return L.divIcon({
        className: 'custom-icon',
        html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });
};

const icons = {
    comercio: createIcon('#0d9488'), // teal-600
    autonomo: createIcon('#ca8a04'), // yellow-600
    promocao: createIcon('#e11d48'), // rose-600
    vaga: createIcon('#4f46e5'),     // indigo-600
    default: createIcon('#64748b')   // slate-500
};

// Component to handle map view updates
const MapController: React.FC<{ center: [number, number], zoom?: number }> = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        map.flyTo(center, zoom || map.getZoom());
    }, [center, zoom, map]);
    return null;
};

export const MapView: React.FC = () => {
  const { posts } = useApp();
  const [center, setCenter] = useState<[number, number]>([-23.5505, -46.6333]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [radius, setRadius] = useState<number>(0); // 0 = all, values in meters
  const [activeCategory, setActiveCategory] = useState<string | 'all'>('all');

  // Filter items
  const mapPosts = posts.filter(p => {
      if (!p.latitude || !p.longitude) return false;

      // Category filter
      if (activeCategory !== 'all' && p.type !== activeCategory) return false;

      // Radius filter (simple distance calc)
      if (radius > 0 && userLocation) {
          const R = 6371e3; // metres
          const φ1 = userLocation[0] * Math.PI/180;
          const φ2 = p.latitude * Math.PI/180;
          const Δφ = (p.latitude - userLocation[0]) * Math.PI/180;
          const Δλ = (p.longitude - userLocation[1]) * Math.PI/180;

          const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                  Math.cos(φ1) * Math.cos(φ2) *
                  Math.sin(Δλ/2) * Math.sin(Δλ/2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
          const d = R * c;

          if (d > radius) return false;
      }

      return true;
  });

  const handleNearMe = () => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
              const { latitude, longitude } = position.coords;
              setUserLocation([latitude, longitude]);
              setCenter([latitude, longitude]);
          }, (error) => {
              alert("Não foi possível obter sua localização. Usando centro padrão.");
          });
      } else {
          alert("Geolocalização não suportada neste navegador.");
      }
  };

  return (
    <div className="relative h-[calc(100vh-200px)] w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 z-0">

      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2">
          <button
            onClick={handleNearMe}
            className="bg-white dark:bg-slate-800 p-3 rounded-xl shadow-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
            title="Perto de mim"
          >
              <Navigation size={20} />
          </button>
      </div>

      {/* Filters Overlay */}
      <div className="absolute bottom-4 left-4 right-4 z-[400] bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 flex flex-col gap-3">
         <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
             <button
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${activeCategory === 'all' ? 'bg-slate-800 text-white dark:bg-white dark:text-slate-900' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}
             >
                 Todos
             </button>
             <button
                onClick={() => setActiveCategory('comercio')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1 ${activeCategory === 'comercio' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}
             >
                 <span className="w-2 h-2 rounded-full bg-teal-600 inline-block border border-white"></span> Comércio
             </button>
             <button
                onClick={() => setActiveCategory('autonomo')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1 ${activeCategory === 'autonomo' ? 'bg-yellow-600 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}
             >
                 <span className="w-2 h-2 rounded-full bg-yellow-600 inline-block border border-white"></span> Autônomos
             </button>
             <button
                onClick={() => setActiveCategory('promocao')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1 ${activeCategory === 'promocao' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}
             >
                 <span className="w-2 h-2 rounded-full bg-rose-600 inline-block border border-white"></span> Promoções
             </button>
         </div>

         <div className="flex items-center gap-3">
             <span className="text-xs font-semibold text-slate-500">Raio:</span>
             <select
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="bg-slate-100 dark:bg-slate-800 text-xs font-semibold px-2 py-1 rounded-lg border-none outline-none text-slate-700 dark:text-slate-300"
             >
                 <option value={0}>Todo o Bairro</option>
                 <option value={500}>5 min (500m)</option>
                 <option value={1000}>10 min (1km)</option>
                 <option value={2000}>20 min (2km)</option>
             </select>
             {radius > 0 && !userLocation && <span className="text-[10px] text-red-500 animate-pulse">Ative "Perto de mim"</span>}
         </div>
      </div>

      <MapContainer
        center={center}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <MapController center={center} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {userLocation && (
            <Marker position={userLocation} icon={L.divIcon({
                className: 'user-pin',
                html: '<div style="background-color: #3b82f6; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3);"></div>',
                iconSize: [20, 20]
            })}>
                <Popup>Você está aqui</Popup>
            </Marker>
        )}

        {mapPosts.map(post => (
          <Marker
            key={`post-${post.id}`}
            position={[post.latitude!, post.longitude!]}
            icon={icons[post.type] || icons.default}
          >
            <Popup>
              <div className="p-1 min-w-[150px]">
                <strong className="block text-sm font-bold mb-1 text-slate-800">{post.title}</strong>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded text-white mb-2 inline-block ${
                    post.type === 'comercio' ? 'bg-teal-600' :
                    post.type === 'autonomo' ? 'bg-yellow-600' :
                    post.type === 'promocao' ? 'bg-rose-600' : 'bg-indigo-600'
                }`}>
                    {post.type.toUpperCase()}
                </span>
                <p className="text-xs text-slate-600">{post.desc}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
