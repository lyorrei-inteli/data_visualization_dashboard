'use client'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { PageHeader } from "@/components/PageHeader";
import { PredictionList } from "@/components/PredictionList";
import { PredictionsCharts } from "@/components/PredictionsCharts";
import { Spinner } from "@/components/Spinner";
import { fetchInstance } from "@/config/fetch";
import { apiRoutes } from "@/config/routes";

interface User {
    id: string
    name: string
    email: string
}

interface Prediction {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    authorId: string;
    result?: number;
    author: User
}

const PredictionsPage = () => {
    const [predictions, setPredictions] = useState<Prediction[]>([]);
    const [loading, setLoading] = useState(true);

    const getPredictions = async () => {
        try {
            const data = await fetchInstance(apiRoutes.predictions.get, {});
            setPredictions(data);
        } catch (error) {
            console.log(error);
            toast.error("Ocorreu um erro ao buscar as predições.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPredictions();
    }, []);

    const chartData = predictions.map(({ name, createdAt, result }) => ({
        name,
        date: new Date(createdAt).toLocaleDateString(),
        result
    }));

    const aggregatedData = predictions.reduce((acc, { author }) => {
        if (!acc[author.name]) {
            acc[author.name] = { name: author.name, count: 0 };
        }
        acc[author.name].count++;
        return acc;
    }, {});

    const barChartData = Object.values(aggregatedData);

    return (
        <>
            <PageHeader title="Predições" subtitle="Predições de severidade de acidentes" />
            {loading ? <Spinner /> : <Content predictions={predictions} chartData={chartData} barChartData={barChartData} />}
        </>
    );
};

const Content = ({ predictions, chartData, barChartData }) => (
    <div>
        <PredictionsCharts chartData={chartData} barChartData={barChartData} />
        {predictions.length > 0 ? (
            <PredictionList predictions={predictions} />
        ) : (
            <p className="text-xl text-center w-full">Nenhum registro</p>
        )}
    </div>
);

export default PredictionsPage;
