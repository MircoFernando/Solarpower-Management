"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { format, toDate } from "date-fns"
import { useGetenergyGenerationRecordQuery } from "../lib/redux/query.js"
export const description = "Interactive area chart using live data"

const chartConfig = {
  production: {
    label: "Energy Production (kWh)",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("7d")

  // ✅ Refetch when timeRange changes
  const { data, isLoading, isError, error } = useGetenergyGenerationRecordQuery({
    id: "68ec8e314c52df21ff6fdab8",
    groupBy: "date",
    range: timeRange, // <-- dynamically tied to selector
  })

  // Responsive default range
  React.useEffect(() => {
    if (isMobile) setTimeRange("7d")
  }, [isMobile])

  if (isLoading) return <div>Loading...</div>
  if (!data || isError)
    return <div>Error: {error?.message || "Failed to load data"}</div>

  const daysToShow = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90

// Find reference end date (latest date from the API)
const latestDate = new Date(
  Math.max(...data.map((d) => new Date(d._id.date).getTime()))
)
const startDate = new Date(latestDate)
startDate.setDate(startDate.getDate() - daysToShow)

// Filter by that range
const filtered = data.filter((el) => {
  const date = new Date(el._id.date)
  return date >= startDate && date <= latestDate
})

// Map to chart-friendly format
const energyData = filtered.map((el) => ({
  day: format(toDate(el._id.date), "EEE"),
  date: format(toDate(el._id.date), "MMM d"),
  production: Math.floor(el.totalEnergy),
  hasAnomaly: el.hasAnomaly,
}))

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Energy Production</CardTitle>
        <CardDescription>
          {timeRange === "7d"
            ? "Last 7 days"
            : timeRange === "30d"
            ? "Last 30 days"
            : "Last 3 months"}
        </CardDescription>

        <CardAction>
          {/* Desktop Toggle */}
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(v) => v && setTimeRange(v)}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
          </ToggleGroup>

          {/* Mobile Dropdown */}
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
            >
              <SelectValue placeholder="Last 7 days" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={energyData}>
            <defs>
              <linearGradient id="fillProduction" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-production)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-production)" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={16}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => value}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="production"
              type="natural"
              fill="url(#fillProduction)"
              stroke="var(--color-production)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
