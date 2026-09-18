import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Character } from "../types/api";
import SearchBar from "./SearchBar";
import { DetalleElemento } from "./ElementDetail";
import { CardElement } from "./CardElement";
import StatusMessage from "./StatusMessage";
import "../styles/ElementList.css";

const ElementList = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [busquedaConRetardo, setBusquedaConRetardo] = useState("");
  const [personajeSeleccionado, setPersonajeSeleccionado] = useState<Character | null>(null);
  const [favoritos, setFavoritos] = useState<string[]>(() => {
    try {
      const guardado = localStorage.getItem("favoritos");
      return guardado ? JSON.parse(guardado) : [];
    } catch {
      return [];
    }
  });

  async function fetchCharacters(signal?: AbortSignal) {
    try {
      setCargando(true);
      setError(false);
      const data = await api(signal);
      setCharacters(data);
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") {
        return;
      }
      setError(true);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    fetchCharacters(controller.signal);
    return () => controller.abort();
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
    return <StatusMessage type="loading" />;
  }

  if (error) {
    return (
      <div className="status-message">
        <StatusMessage type="error" />
        <button onClick={() => fetchCharacters()}>Reintentar</button>
      </div>
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
        <StatusMessage type="empty" message="No se encontraron personajes" />
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