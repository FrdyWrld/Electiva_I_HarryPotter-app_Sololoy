import type { Character } from '../types/api';

export const api = async (): Promise<Character[]> => {
    const baseUrl = 'https://api.potterdb.com/v1/characters';
    const response = await fetch(baseUrl);
    const { data } = await response.json();
    return data;
}