import { useState, useEffect } from "react";
import { api } from "../services/api";
import type { Character } from "../types/api";
import SearchBar from "./SearchBar";
import { DetalleElemento } from "./ElementDetail";
import "../styles/ElementList.css";

const ElementList = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [busquedaConRetardo, setBusquedaConRetardo] = useState("");
  const [personajeSeleccionado, setPersonajeSeleccionado] =
    useState<Character | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setCargando(true);
        setError(false);
        const data = await api();
        setCharacters(data);
      } catch (e) {
        setError(true);
      } finally {
        setCargando(false);
      }
    };

    fetchCharacters();
  }, []);

  useEffect(() => {
    const temporizador = setTimeout(() => {
      setBusquedaConRetardo(busqueda);
    }, 400);

    return () => {
      clearTimeout(temporizador);
    };
  }, [busqueda]);

  const personajesFiltrados = characters.filter((character) =>
    character.attributes.name
      .toLowerCase()
      .includes(busquedaConRetardo.toLowerCase()),
  );

  if (cargando) {
    return <p className="status-message">Cargando personajes...</p>;
  }

  if (error) {
    return (
      <p className="status-message">
        Ocurrió un error al cargar los personajes.
      </p>
    );
  }

  if (personajeSeleccionado) {
    return (
      <DetalleElemento
        character={personajeSeleccionado}
        onVolver={() => setPersonajeSeleccionado(null)}
      />
    );
  }

  return (
    <div className="characters-container">
      <h1 className="characters-title">Personajes de Harry Potter</h1>

      <SearchBar value={busqueda} onChange={setBusqueda} />

      {personajesFiltrados.length === 0 ? (
        <p className="status-message">No se encontraron personajes.</p>
      ) : (
        <div className="characters-grid">
          {personajesFiltrados.map((character) => (
            <div
              className="character-card"
              key={character.id}
              onClick={() => setPersonajeSeleccionado(character)}
            >
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
