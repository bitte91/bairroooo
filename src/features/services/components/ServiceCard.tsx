import React from 'react';
import { Business, ServiceProvider } from '../../../shared/types';
import { MapPin, Star, MessageCircle, Phone, Clock } from 'lucide-react';
import { Button } from '../../../shared/components/ui/Button';

interface ServiceCardProps {
    service: Business | ServiceProvider;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
    // Determine type by checking properties
    const isProvider = 'serviceType' in service;
    const rating = isProvider ? (service as ServiceProvider).rating : undefined;
    const reviews = isProvider ? (service as ServiceProvider).reviewsCount : undefined;
    const address = isProvider ? service.bairro : (service as Business).address;

    // Type guard hack for quick display
    const category = isProvider ? (service as ServiceProvider).serviceType : (service as Business).category;

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-4">
                <div className="flex justify-between items-start">
                    <div>
                        <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wide mb-2">
                            {category}
                        </span>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{service.name}</h3>
                    </div>
                    {rating && (
                        <div className="flex items-center bg-amber-50 dark:bg-amber-900/20 px-1.5 py-0.5 rounded">
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500 mr-1" />
                            <span className="font-bold text-amber-700 dark:text-amber-500 text-sm">{rating}</span>
                            <span className="text-xs text-slate-400 ml-1">({reviews})</span>
                        </div>
                    )}
                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                    {service.description}
                </p>

                <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                        <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                        <span className="truncate">{address}</span>
                    </div>
                    {'openingHours' in service && (service as Business).openingHours && (
                        <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                             <Clock className="w-4 h-4 mr-2 text-slate-400" />
                             <span className="truncate">{(service as Business).openingHours}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700 flex gap-2">
                <Button className="flex-1" variant="primary" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contato
                </Button>
                 {service.whatsapp && (
                    <Button variant="secondary" size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => window.open(`https://wa.me/${service.whatsapp}`, '_blank')}>
                         <Phone className="w-4 h-4" />
                    </Button>
                 )}
            </div>
        </div>
    );
};
