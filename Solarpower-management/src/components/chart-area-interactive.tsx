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
import { useGetEnergyGenerationRecordQuery, useGetSolarUnitsByClerkUserIdQuery } from "../lib/redux/query.js"
import { useUser } from "@clerk/clerk-react"

export const description = "Interactive area chart using live data"

// UPDATED: Changed color to a vibrant blue hex code (#2563eb - Tailwind Blue 600)
const chartConfig = {
  production: {
    label: "Energy Production (kWh)",
    color: "#2563eb", 
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState(7)

  const {user, isLoaded} = useUser();

  const {
    data: SolarUnitData,
    isLoading: solarUnitLoading,
    isError: solarUnitError,
    error: solarUnitFetchError,
  } = useGetSolarUnitsByClerkUserIdQuery({skip: !isLoaded});

  if (solarUnitLoading) console.log("Loading solar units...");
  if (solarUnitError)
    console.error("Error fetching solar unit:", solarUnitFetchError);

  //Api data fetching using RTK query
  const { data, isLoading, isError, error } = useGetEnergyGenerationRecordQuery(
    {
      id: SolarUnitData?._id,
      groupBy: "date",
      limit: timeRange
    }
  );

  // Responsive default range
  React.useEffect(() => {
    if (isMobile) setTimeRange(7)
  }, [isMobile])

  if (isLoading) return <div className="flex items-center justify-center h-[250px] text-muted-foreground animate-pulse">Loading data...</div>
  if (!data || isError)
    return <div className="flex items-center justify-center h-[250px] text-destructive">Error: {error?.message || "Failed to load data"}</div>

  // Find reference end date (latest date from the API)
  const latestDate = new Date(
    Math.max(...data.map((d) => new Date(d._id.date).getTime()))
  )
  const startDate = new Date(latestDate)
  startDate.setDate(startDate.getDate() - timeRange)

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
    <Card className="@container/card shadow-sm border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle className="text-lg font-semibold tracking-tight">Energy Production</CardTitle>
                <CardDescription className="text-xs text-muted-foreground mt-1">
                {timeRange == 7
                    ? "Past 7 days performance"
                    : timeRange == 30
                    ? "Monthly overview"
                    : "Quarterly trends"}
                </CardDescription>
            </div>
        </div>

        <CardAction className="mt-4">
          {/* Desktop Toggle */}
          <ToggleGroup
            type="single"
            value={String(timeRange)}
            onValueChange={(v) => v && setTimeRange(Number(v))}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-3 *:data-[slot=toggle-group-item]:!text-xs @[767px]/card:flex"
          >
            <ToggleGroupItem value="7">7 Days</ToggleGroupItem>
            <ToggleGroupItem value="30">30 Days</ToggleGroupItem>
            <ToggleGroupItem value="90">3 Months</ToggleGroupItem>
          </ToggleGroup>

          {/* Mobile Dropdown */}
          <Select value={String(timeRange)} onValueChange={(v) => setTimeRange(Number(v))}>
            <SelectTrigger
              className="flex w-32 h-8 text-xs @[767px]/card:hidden"
            >
              <SelectValue placeholder="Last 7 days" />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 3 months</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={energyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="fillProduction" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-production)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-production)" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} strokeDasharray="3 3" strokeOpacity={0.4} />
            
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              minTickGap={20}
              tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
            />
            
            <ChartTooltip
              cursor={{ stroke: 'var(--muted-foreground)', strokeWidth: 1, strokeDasharray: '4 4' }}
              content={
                <ChartTooltipContent
                  className="w-[150px] bg-background/95 backdrop-blur-sm border-border/50 shadow-xl"
                  labelFormatter={(value) => (
                    <span className="text-muted-foreground font-medium text-xs uppercase tracking-wider">{value}</span>
                  )}
                  indicator="dot"
                />
              }
            />
            
            <Area
              dataKey="production"
              type="monotone" 
              fill="url(#fillProduction)"
              stroke="var(--color-production)"
              strokeWidth={2.5}
              activeDot={{ r: 6, strokeWidth: 0, fill: "var(--color-production)" }}
              animationDuration={1500}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}