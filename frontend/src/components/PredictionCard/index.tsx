import { formatDate } from "@/utils/date";
import { Card } from "../Card";

export const PredictionCard = ({ prediction }) => (
  <Card>
      <h2 className="text-xl font-medium">{prediction.name}</h2>
      <p className="mt-2">
          Predição:{" "}
          {prediction.result != null ? (
              <span className={prediction.result ? "text-red-400" : "text-green-400"}>
                  {prediction.result ? "Acidente severo" : "Acidente não severo"}
              </span>
          ) : (
              <span className="text-blue-400">Pendente</span>
          )}
      </p>
      <p className="mt-4">{formatDate(prediction.createdAt)}</p>
  </Card>
);