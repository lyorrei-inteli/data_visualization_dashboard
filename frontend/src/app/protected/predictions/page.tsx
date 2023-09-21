import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { fetchInstance } from "@/config/fetch";
import { apiRoutes } from "@/config/routes";
import { formatDate } from "@/utils/date";

interface Prediction {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    authorId: string;
    result?: number;
}

const getPredictions = async () => {
    try {
        const data = await fetchInstance(apiRoutes.predictions.get, {
            cache: "no-cache",
        });

        return data;
    } catch (error) {
        return [];
    }
};

const PredictionsPage = async () => {
    const predictions: Prediction[] = await getPredictions();
    console.log(predictions)
    return (
        <>
            <PageHeader title="Predições" subtitle="Predições de severidade de acidentes" />
            <div className={`grid ${predictions.length > 0 ? "grid-cols-4" : ""} gap-8`}>
                {predictions.length > 0 ? (
                    predictions.map((prediction) => (
                        <Card key={prediction.id}>
                            <h2 className="text-xl font-medium">{prediction.name}</h2>
                            <p className="mt-2">
                                Predição:{" "}
                                {prediction.result != null ? (
                                    <span className={`${prediction.result ? 'text-red-400' : 'text-green-400'}`}>{prediction.result ? 'Acidente severo' : 'Acidente não severo'}</span>
                                ) : (
                                    <span className="text-blue-400">Pendente</span>
                                )}
                            </p>

                            <p className="mt-4">{formatDate(prediction.createdAt)}</p>
                        </Card>
                    ))
                ) : (
                    <p className="text-xl text-center w-full">Nenhum registro</p>
                )}
            </div>
        </>
    );
};

export default PredictionsPage;
