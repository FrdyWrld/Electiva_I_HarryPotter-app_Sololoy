import type { Character } from '../types/api';

export const api = async (signal?: AbortSignal): Promise<Character[]> => {
    const baseUrl = 'https://api.potterdb.com/v1/characters';
    const response = await fetch(baseUrl, { signal });

    if (!response.ok) {
        throw new Error(`Error al obtener los personajes: ${response.status}`);
    }

    const { data }: { data: Character[] } = await response.json();
    return data;
}