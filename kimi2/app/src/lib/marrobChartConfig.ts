import type { ChartConfig } from "@/components/ui/chart"

/** Пример для ChartContainer: config={marrobChartConfig}, series с ключами primary, secondary, … */
export const marrobChartConfig = {
  primary: {
    label: "Основной",
    color: "var(--chart-1)",
  },
  secondary: {
    label: "Дополнительный",
    color: "var(--chart-2)",
  },
  neutral: {
    label: "Нейтраль",
    color: "var(--chart-3)",
  },
  sand: {
    label: "Песок",
    color: "var(--chart-4)",
  },
  deep: {
    label: "Акцент 2",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig
