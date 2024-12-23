"use client"

import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
} from "@/app/_components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart"
import { TransactionType } from "@prisma/client"
import { TransactionPercentagePerType } from "@/app/_data/get-dashboard/types"
import PercentageItem from "./percentage-item"
import { PiggyBankIcon, TrendingUpDownIcon, TrendingUpIcon } from "lucide-react"


const chartConfig = {
  [TransactionType.INVESTIMENT]: {
    label: "Investido",
    color: "#fffff",
  },
  [TransactionType.DEPOSIT]: {
    label: "Receita",
    color: "#55b02e",
  },
  [TransactionType.EXPENSE]: {
    label: "Despesas",
    color: "#e93030",
  },
} satisfies ChartConfig

interface TransactionsPieChartProps {
  typesPercentage: TransactionPercentagePerType
  depositsTotal: number,
  investmentsTotal: number,
  expensesTotal: number,
}




const TransactionsPieChart = ({ depositsTotal, expensesTotal, investmentsTotal, typesPercentage }: TransactionsPieChartProps) => {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: depositsTotal,
      fill: "#55b02e"
    },
    {
      type: TransactionType.EXPENSE,
      amount: expensesTotal,
      fill: "#e93030"
    },
    {
      type: TransactionType.INVESTIMENT,
      amount: investmentsTotal,
      fill: "#fffff"
    }
  ];
  return (
    <Card className="flex flex-col p-6">

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>

        <div className="space-y-3">
          <PercentageItem
            icon={<TrendingUpIcon size={16} className="text-primary" />}
            title="Receita"
            value={typesPercentage[TransactionType.DEPOSIT]}
          />
          <PercentageItem
            icon={<TrendingUpDownIcon size={16} className="text-red-500" />}
            title="Receita"
            value={typesPercentage[TransactionType.EXPENSE]}
          />
          <PercentageItem
            icon={<PiggyBankIcon size={16} />}
            title="Receita"
            value={typesPercentage[TransactionType.INVESTIMENT]}
          />

        </div>
      </CardContent>

    </Card>
  )
}

export default TransactionsPieChart;
