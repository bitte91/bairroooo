import { Event } from '../../../shared/types';
import { useQuery } from '@tanstack/react-query';

const MOCK_EVENTS: Event[] = [
    {
        id: 1,
        title: 'Feira de Orgânicos',
        description: 'Todo sábado de manhã, produtos frescos da região.',
        date: '2023-11-20T08:00:00',
        location: 'Praça Central',
        category: 'market'
    },
    {
        id: 2,
        title: 'Reunião de Segurança',
        description: 'Discussão sobre melhorias na iluminação pública.',
        date: '2023-11-22T19:00:00',
        location: 'Associação de Moradores',
        category: 'community'
    },
    {
        id: 3,
        title: 'Bazar Beneficente',
        description: 'Arrecadação de fundos para a creche comunitária.',
        date: '2023-11-25T14:00:00',
        location: 'Salão Paroquial',
        category: 'religious'
    }
];

const fetchEvents = async (): Promise<Event[]> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return MOCK_EVENTS;
}

export function useEvents() {
    return useQuery({
        queryKey: ['events'],
        queryFn: fetchEvents
    });
}
