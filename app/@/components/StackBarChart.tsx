import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type StackBarDaatType = {
  name: string;
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
  F: number;
  G: number;
}[];

export function StackBarChartUI({
  className,
  data,
}: {
  className?: string;
  data: StackBarDaatType;
}) {
  return (
    <ResponsiveContainer height={350} className={className}>
      <BarChart
        width={300}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="A" stackId="a" fill="#000" />
        <Bar dataKey="B" stackId="a" fill="#333" />
        <Bar dataKey="C" stackId="a" fill="#555" />
        <Bar dataKey="D" stackId="a" fill="#777" />
        <Bar dataKey="E" stackId="a" fill="#999" />
        <Bar dataKey="F" stackId="a" fill="#AAA" />
        <Bar dataKey="G" stackId="a" fill="#CCC" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
