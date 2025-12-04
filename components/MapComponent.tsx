import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Post, Event } from '../types';
import L from 'leaflet';

// Fix for default marker icon in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapComponentProps {
    items: (Post | Event)[];
    height?: string;
}

export const MapComponent: React.FC<MapComponentProps> = ({ items, height = '400px' }) => {
    // Default Center (São Paulo Mock)
    const center: [number, number] = [-23.5505, -46.6333];

    const validItems = items.filter(i => i.latitude && i.longitude);

    return (
        <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-700 z-0">
            <MapContainer center={center} zoom={15} style={{ height, width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {validItems.map(item => (
                    <Marker
                        key={item.id}
                        position={[item.latitude!, item.longitude!]}
                    >
                        <Popup>
                            <div className="p-1">
                                <h3 className="font-bold text-gray-800">{item.title}</h3>
                                <p className="text-xs text-gray-600 truncate max-w-[150px]">
                                    {'desc' in item ? item.desc : item.description}
                                </p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};
