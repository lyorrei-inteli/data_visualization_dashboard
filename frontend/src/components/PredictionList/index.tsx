import { PredictionCard } from "../PredictionCard";


export const PredictionList = ({ predictions }) => (
  <div className="grid grid-cols-4 gap-8">
      {predictions.map(prediction => <PredictionCard key={prediction.id} prediction={prediction} />)}
  </div>
);