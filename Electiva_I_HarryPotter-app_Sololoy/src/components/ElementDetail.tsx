import type { Character } from "../types/api";

interface DetalleElementoProps {
  character: Character;
  onVolver: () => void;
}

export function DetalleElemento({ character, onVolver }: DetalleElementoProps) {
  const { attributes } = character;

  return (
    <div>
      <button onClick={onVolver}>Volver</button>

      <h2>{attributes.name}</h2>
      <p>Casa: {attributes.house ?? "Desconocida"}</p>
      <p>Nacido: {attributes.born ?? "Desconocido"}</p>
      <p>Fallecido: {attributes.died ?? "Desconocido"}</p>
      <p>Patronus: {attributes.patronus ?? "Desconocido"}</p>
      <p>Especie: {attributes.species ?? "Desconocida"}</p>
    </div>
  );
}
