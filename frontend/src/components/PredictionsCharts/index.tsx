import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "../Card";

export const PredictionsCharts = ({ chartData, barChartData }) => (
  <div className="flex gap-8 mb-8">
      <Card className="w-1/2">
          <h2 className="text-2xl text-primary mb-6 block">Histórico de Previsões por tempo</h2>
          <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Line type="monotone" dataKey="result" stroke="#50C878" />
              </LineChart>
          </ResponsiveContainer>
      </Card>
      <Card className="w-1/2">
          <h2 className="text-2xl text-primary mb-6 block">Distribuição de Previsões por Usuário</h2>
          <ResponsiveContainer width="100%" height={400}>
              <BarChart data={barChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
          </ResponsiveContainer>
      </Card>
  </div>
);