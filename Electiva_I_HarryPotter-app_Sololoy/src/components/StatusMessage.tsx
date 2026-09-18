import "../styles/StatusMessage.css";

type StatusType = "loading" | "error" | "empty";

interface StatusMessageProps {
  type: StatusType;
  message?: string;
}

const StatusMessage = ({ type, message }: StatusMessageProps) => {
  const defaultMessages: Record<StatusType, string> = {
    loading: "Cargando personajes...",
    error: "Ocurrió un error al cargar los personajes.",
    empty: "No se encontraron resultados.",
  };

  return (
    <div className={`status-message status-message--${type}`}>
      <p>{message ?? defaultMessages[type]}</p>
    </div>
  );
};

export default StatusMessage;