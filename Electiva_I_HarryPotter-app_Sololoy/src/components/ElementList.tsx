import { useState, useEffect } from "react";
import { api } from "../services/api";
import type { Character } from "../types/api";
import StatusMessage from "./StatusMessage";
import "../styles/ElementList.css";

type Status = "loading" | "error" | "empty" | "success";

const ElementList = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const fetchCharacters = async () => {
      setStatus("loading");
      try {
        const data = await api();

        if (data.length === 0) {
          setStatus("empty");
        } else {
          setCharacters(data);
          setStatus("success");
        }
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    };

    fetchCharacters();
  }, []);

  return (
    <div className="characters-container">
      <h1 className="characters-title">Personajes de Harry Potter</h1>

      {status === "loading" && <StatusMessage type="loading" />}
      {status === "error" && <StatusMessage type="error" />}
      {status === "empty" && <StatusMessage type="empty" />}

      {status === "success" && (
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
      )}
    </div>
  );
};

export default ElementList;
