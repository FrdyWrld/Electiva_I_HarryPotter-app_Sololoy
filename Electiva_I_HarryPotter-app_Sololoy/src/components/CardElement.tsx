import type { Character } from "../types/api";

interface CardElementProps {
  character: Character;
  onSeleccionar: (character: Character) => void;
  esFavorito: boolean;
  onToggleFavorito: () => void;
}

export function CardElement({
  character,
  onSeleccionar,
  esFavorito,
  onToggleFavorito,
}: CardElementProps) {
  const { attributes } = character;

  return (
    <div className="character-card" onClick={() => onSeleccionar(character)}>
      <img
        className="character-image"
        src={attributes.image ?? ""}
        alt={attributes.name}
      />
      <div className="character-info">
        <h2>{attributes.name}</h2>
        <p>{attributes.slug}</p>
        <span className="character-house">
          {attributes.house ?? "Sin casa"}
        </span>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorito();
        }}
      >
        {esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
      </button>
    </div>
  );
}
