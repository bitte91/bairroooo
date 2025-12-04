import { Badge } from '../types';

export const BADGES: Badge[] = [
    { id: 'helper', name: 'Ajudante', icon: '🤝', description: 'Ajudou mais de 10 vizinhos.' },
    { id: 'donor', name: 'Doador', icon: '🎁', description: 'Realizou 5+ doações.' },
    { id: 'trusted', name: 'Confiável', icon: '⭐', description: '20+ avaliações positivas.' },
    { id: 'regular', name: 'Ativo', icon: '📅', description: 'Ativo por 30+ dias.' },
    { id: 'elder_wisdom', name: 'Sábio', icon: '👴', description: 'Membro experiente da comunidade.' }
];

// Mock function to get badges for a user (random for now as we don't have backend logic)
export const getUserBadges = (username: string): Badge[] => {
    // Deterministic random based on string
    const hash = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const badges = [];
    if (hash % 2 === 0) badges.push(BADGES[0]);
    if (hash % 3 === 0) badges.push(BADGES[1]);
    if (hash % 5 === 0) badges.push(BADGES[2]);
    return badges;
};
