"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const description = "Gráfico de evolução dos resultados";

const chartData = [
  { date: "2024-04-01", acertos: 222, questoes: 150 },
  { date: "2024-04-02", acertos: 97, questoes: 180 },
  { date: "2024-04-03", acertos: 167, questoes: 120 },
  { date: "2024-04-04", acertos: 242, questoes: 260 },
  { date: "2024-04-05", acertos: 373, questoes: 290 },
  { date: "2024-04-06", acertos: 301, questoes: 340 },
  { date: "2024-04-07", acertos: 245, questoes: 180 },
  { date: "2024-04-08", acertos: 409, questoes: 320 },
  { date: "2024-04-09", acertos: 59, questoes: 110 },
  { date: "2024-04-10", acertos: 261, questoes: 190 },
  { date: "2024-04-11", acertos: 327, questoes: 350 },
  { date: "2024-04-12", acertos: 292, questoes: 210 },
  { date: "2024-04-13", acertos: 342, questoes: 380 },
  { date: "2024-04-14", acertos: 137, questoes: 220 },
  { date: "2024-04-15", acertos: 120, questoes: 170 },
  { date: "2024-04-16", acertos: 138, questoes: 190 },
  { date: "2024-04-17", acertos: 446, questoes: 360 },
  { date: "2024-04-18", acertos: 364, questoes: 410 },
  { date: "2024-04-19", acertos: 243, questoes: 180 },
  { date: "2024-04-20", acertos: 89, questoes: 150 },
  { date: "2024-04-21", acertos: 137, questoes: 200 },
  { date: "2024-04-22", acertos: 224, questoes: 170 },
  { date: "2024-04-23", acertos: 138, questoes: 230 },
  { date: "2024-04-24", acertos: 387, questoes: 290 },
  { date: "2024-04-25", acertos: 215, questoes: 250 },
  { date: "2024-04-26", acertos: 75, questoes: 130 },
  { date: "2024-04-27", acertos: 383, questoes: 420 },
  { date: "2024-04-28", acertos: 122, questoes: 180 },
  { date: "2024-04-29", acertos: 315, questoes: 240 },
  { date: "2024-04-30", acertos: 454, questoes: 380 },
  { date: "2024-05-01", acertos: 165, questoes: 220 },
  { date: "2024-05-02", acertos: 293, questoes: 310 },
  { date: "2024-05-03", acertos: 247, questoes: 190 },
  { date: "2024-05-04", acertos: 385, questoes: 420 },
  { date: "2024-05-05", acertos: 481, questoes: 390 },
  { date: "2024-05-06", acertos: 498, questoes: 520 },
  { date: "2024-05-07", acertos: 388, questoes: 300 },
  { date: "2024-05-08", acertos: 149, questoes: 210 },
  { date: "2024-05-09", acertos: 227, questoes: 180 },
  { date: "2024-05-10", acertos: 293, questoes: 330 },
  { date: "2024-05-11", acertos: 335, questoes: 270 },
  { date: "2024-05-12", acertos: 197, questoes: 240 },
  { date: "2024-05-13", acertos: 197, questoes: 160 },
  { date: "2024-05-14", acertos: 448, questoes: 490 },
  { date: "2024-05-15", acertos: 473, questoes: 380 },
  { date: "2024-05-16", acertos: 338, questoes: 400 },
  { date: "2024-05-17", acertos: 499, questoes: 420 },
  { date: "2024-05-18", acertos: 315, questoes: 350 },
  { date: "2024-05-19", acertos: 235, questoes: 180 },
  { date: "2024-05-20", acertos: 177, questoes: 230 },
  { date: "2024-05-21", acertos: 82, questoes: 140 },
  { date: "2024-05-22", acertos: 81, questoes: 120 },
  { date: "2024-05-23", acertos: 252, questoes: 290 },
  { date: "2024-05-24", acertos: 294, questoes: 220 },
  { date: "2024-05-25", acertos: 201, questoes: 250 },
  { date: "2024-05-26", acertos: 213, questoes: 170 },
  { date: "2024-05-27", acertos: 420, questoes: 460 },
  { date: "2024-05-28", acertos: 233, questoes: 190 },
  { date: "2024-05-29", acertos: 78, questoes: 130 },
  { date: "2024-05-30", acertos: 340, questoes: 280 },
  { date: "2024-05-31", acertos: 178, questoes: 230 },
  { date: "2024-06-01", acertos: 178, questoes: 200 },
  { date: "2024-06-02", acertos: 470, questoes: 410 },
  { date: "2024-06-03", acertos: 103, questoes: 160 },
  { date: "2024-06-04", acertos: 439, questoes: 380 },
  { date: "2024-06-05", acertos: 88, questoes: 140 },
  { date: "2024-06-06", acertos: 294, questoes: 250 },
  { date: "2024-06-07", acertos: 323, questoes: 370 },
  { date: "2024-06-08", acertos: 385, questoes: 320 },
  { date: "2024-06-09", acertos: 438, questoes: 480 },
  { date: "2024-06-10", acertos: 155, questoes: 200 },
  { date: "2024-06-11", acertos: 92, questoes: 150 },
  { date: "2024-06-12", acertos: 492, questoes: 420 },
  { date: "2024-06-13", acertos: 81, questoes: 130 },
  { date: "2024-06-14", acertos: 426, questoes: 380 },
  { date: "2024-06-15", acertos: 307, questoes: 350 },
  { date: "2024-06-16", acertos: 371, questoes: 310 },
  { date: "2024-06-17", acertos: 475, questoes: 520 },
  { date: "2024-06-18", acertos: 107, questoes: 170 },
  { date: "2024-06-19", acertos: 341, questoes: 290 },
  { date: "2024-06-20", acertos: 408, questoes: 450 },
  { date: "2024-06-21", acertos: 169, questoes: 210 },
  { date: "2024-06-22", acertos: 317, questoes: 270 },
  { date: "2024-06-23", acertos: 480, questoes: 530 },
  { date: "2024-06-24", acertos: 132, questoes: 180 },
  { date: "2024-06-25", acertos: 141, questoes: 190 },
  { date: "2024-06-26", acertos: 434, questoes: 380 },
  { date: "2024-06-27", acertos: 448, questoes: 490 },
  { date: "2024-06-28", acertos: 149, questoes: 200 },
  { date: "2024-06-29", acertos: 103, questoes: 160 },
  { date: "2024-06-30", acertos: 446, questoes: 400 },
];

const chartConfig = {
  desempenho: {
    label: "Desempenho",
  },
  acertos: {
    label: "Questões Acertadas",
    color: "var(--primary)",
  },
  questoes: {
    label: "Total de Questões",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Evolução dos Resultados</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">Acompanhe seu progresso nos últimos 3 meses</span>
          <span className="@[540px]/card:hidden">Últimos 3 meses</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Últimos 3 meses</ToggleGroupItem>
            <ToggleGroupItem value="30d">Últimos 30 dias</ToggleGroupItem>
            <ToggleGroupItem value="7d">Últimos 7 dias</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Últimos 3 meses" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Últimos 3 meses
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Últimos 30 dias
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Últimos 7 dias
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-acertos)" stopOpacity={1.0} />
                <stop offset="95%" stopColor="var(--color-acertos)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-questoes)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-questoes)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="questoes"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-questoes)"
              stackId="a"
            />
            <Area
              dataKey="acertos"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-acertos)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
