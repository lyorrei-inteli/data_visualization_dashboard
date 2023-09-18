import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { fetchInstance } from "@/config/fetch";
import { apiRoutes, routes } from "@/config/routes";
import { formatDate } from "@/utils/date";
import { redirect } from "next/navigation";
import React from "react";

interface Flight {
    id: number;
    name: string;
    fileName: string;
    createdAt: string;
    updatedAt: string;
    s3Path: string;
    userId: string;
    predictionResult?: string;
}

const getFlights = async () => {
    try {
        const data = await fetchInstance(apiRoutes.flight.get, {
            cache: "no-cache",
        });

        return data;
    } catch (error) {
        return [];
    }
};

const FlightsPage = async () => {
    const flights: Flight[] = await getFlights();

    return (
        <>
            <PageHeader title="Voos" subtitle="Predições do sistema de bleed dos voos" />
            <div className="grid grid-cols-4 gap-8">
                {flights.length > 0 ? (
                    flights.map((flight) => (
                        <Card key={flight.id}>
                            <h2 className="text-xl font-medium">{flight.name}</h2>
                            <p className="mt-2">
                                Predição:{" "}
                                {flight.predictionResult ? (
                                    <span className="text-green-400">Pendente</span>
                                ) : (
                                    <span className="text-red-400">Pendente</span>
                                )}
                            </p>

                            <a href={flight.s3Path} className="text-primary block mt-12 hover:scale-105 transition-all">
                                Baixar detalhes do voo
                            </a>
                            <p className="mt-4">{formatDate(flight.createdAt)}</p>
                        </Card>
                    ))
                ) : (
                    <p className="text-xl text-center w-full">Nenhum registro</p>
                )}
            </div>
        </>
    );
};

export default FlightsPage;
