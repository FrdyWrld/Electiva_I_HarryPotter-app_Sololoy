import { useState, useEffect } from "react";
import { api } from "../services/api";
import type { Character } from "../types/api";
import SearchBar from "./SearchBar";
import { DetalleElemento } from "./ElementDetail";
import { CardElement } from "./CardElement";
import "../styles/ElementList.css";

const ElementList = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [busquedaConRetardo, setBusquedaConRetardo] = useState("");
  const [personajeSeleccionado, setPersonajeSeleccionado] =
    useState<Character | null>(null);
  const [favoritos, setFavoritos] = useState<string[]>([]);


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
    const guardado = localStorage.getItem("favoritos");
    if (guardado) {
      setFavoritos(JSON.parse(guardado));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

    function toggleFavorito(id: string) {
    setFavoritos((prev) => {
      if (prev.includes(id)) {
        return prev.filter((favId) => favId !== id);
      }
      return [...prev, id];
    });
  }

  const cantidadFavoritos = favoritos.length;

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
      <p>Favoritos: {cantidadFavoritos}</p>
      {personajesFiltrados.length === 0 ? (
        <p className="status-message">No se encontraron personajes.</p>
      ) : (
        <div className="characters-grid">
          {personajesFiltrados.map((character) => (
            <CardElement
              key={character.id}
              character={character}
              onSeleccionar={setPersonajeSeleccionado}
              esFavorito={favoritos.includes(character.id)}
              onToggleFavorito={() => toggleFavorito(character.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ElementList;
