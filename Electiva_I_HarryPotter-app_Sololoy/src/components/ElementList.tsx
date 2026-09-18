import { useState, useEffect } from "react";
import { api } from "../services/api";
import type { Character } from "../types/api";
import '../styles/ElementList.css';

const ElementList = () => {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      const characters = await api();
      setCharacters(characters);
    };

    fetchCharacters();
  }, []);

  return (
    <div className="characters-container">
      <h1 className="characters-title">Personajes de Harry Potter</h1>
      <div className="characters-grid">
        {characters.map((character) => (
          <div className="character-card" key={character.id}>
            <img
              className="character-image"
              src={character.attributes.image ?? ""}
              alt={character.attributes.name}
            />
            <div className="character-info">
              <h2>{character.attributes.name}</h2>
              <p>{character.attributes.slug}</p>
              <span className="character-house">
                {character.attributes.house ?? "Sin casa"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElementList;