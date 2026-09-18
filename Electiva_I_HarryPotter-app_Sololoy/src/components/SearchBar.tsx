import "../styles/SearchBar.css";

interface SearchBarProps {
  value: string;
  onChange: (texto: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <input
      type="text"
      className="search-bar"
      placeholder="Buscar personaje"
      value={value}
      onChange={(evento) => onChange(evento.target.value)}
    />
  );
};

export default SearchBar;