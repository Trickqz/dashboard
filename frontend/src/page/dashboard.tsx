import { Navigation } from "@/components/navigation"
import Header from "../components/header"
import { Activity, CreditCard, DollarSign, UsersRound } from "lucide-react"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Label, PolarRadiusAxis, RadialBar, RadialBarChart, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import NumberTicker from "@/components/magicui/number-ticker"
import { BorderBeam } from "@/components/magicui/border-beam"
import { DockDemo } from "@/components/dockdemo"

export const description = "A bar chart"

const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
]
const chartConfig = {
    desktop: {
        label: "Profit",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

export const description2 = "A radial chart with stacked sections"
const chartData2 = [{ month: "january", desktop: 1260, mobile: 570 }]
const chartConfig2 = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export function Dashboard() {
    const totalVisitors = chartData[0].desktop + (chartData[0].mobile || 0);

    return (
        <div>
            <Header />
            <DockDemo />
            <div className="p-3 sm:p-14">
                <Navigation />
                <div className="mt-5">
                    <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-7">
                        <div className="h-[150px] relative border rounded-[0.6rem] p-7 flex justify-center flex-col">
                        <BorderBeam size={50} duration={12} delay={9} />
                            <div className="flex justify-between flex-row mb-1 items-center">
                                <h4 className="text-sm font-medium">Total Revenue</h4>
                                <DollarSign width={18} height={18} color="hsl(var(--muted-foreground))" />
                            </div>
                            <h1 className="text-2xl font-extrabold">$<NumberTicker value={4523189} /></h1>
                            <p className="text-[hsl(var(--muted-foreground))] text-sm">+20.1% from last month</p>
                        </div>
                        <div className="h-[150px] relative border rounded-[0.6rem] p-7 flex justify-center flex-col">
                        <BorderBeam size={50} duration={12} delay={9} />
                            <div className="flex justify-between flex-row mb-1 items-center">
                                <h4 className="text-sm font-medium">Subscriptions</h4>
                                <UsersRound width={18} height={18} color="hsl(var(--muted-foreground))" />
                            </div>
                            <h1 className="text-2xl font-extrabold">$<NumberTicker value={2350} /></h1>
                            <p className="text-[hsl(var(--muted-foreground))] text-sm">+180.1% from last month</p>
                        </div>
                        <div className="h-[150px] border relative rounded-[0.6rem] p-7 flex justify-center flex-col">
                        <BorderBeam size={50} duration={12} delay={9} />
                            <div className="flex justify-between flex-row mb-1 items-center">
                                <h4 className="text-sm font-medium">Sales</h4>
                                <CreditCard width={18} height={18} color="hsl(var(--muted-foreground))" />
                            </div>
                            <h1 className="text-2xl font-extrabold">$<NumberTicker value={2350} /></h1>
                            <p className="text-[hsl(var(--muted-foreground))] text-sm">+19% from last month</p>
                        </div>
                        <div className="h-[150px] border rounded-[0.6rem] relative p-7 flex justify-center flex-col">
                        <BorderBeam size={50} duration={12} delay={9} />
                            <div className="flex justify-between flex-row mb-1 items-center">
                                <h4 className="text-sm font-medium">Active Now</h4>
                                <Activity width={18} height={18} color="hsl(var(--muted-foreground))" />
                            </div>
                            <h1 className="text-2xl font-extrabold">$<NumberTicker value={2350} /></h1>
                            <p className="text-[hsl(var(--muted-foreground))] text-sm">+201 since last hour</p>
                        </div>
                        <Card className="col-span-1 relative xl:col-span-3">
                        <BorderBeam size={50} duration={30} delay={9} />
                            <CardHeader>
                                <CardTitle>Overview</CardTitle>
                                <CardDescription>January - September 2024</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer className="h-[290px] w-full" config={chartConfig}>
                                    <BarChart accessibilityLayer data={chartData}>
                                        <CartesianGrid vertical={false} />
                                        <XAxis
                                            dataKey="month"
                                            tickLine={false}
                                            tickMargin={10}
                                            axisLine={false}
                                            tickFormatter={(value) => value.slice(0, 3)}
                                        />
                                        <ChartTooltip
                                            cursor={false}
                                            content={<ChartTooltipContent hideLabel />}
                                        />
                                        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
                                    </BarChart>
                                </ChartContainer>
                            </CardContent>
                            <CardFooter className="flex-col items-start gap-2 text-sm">
                                <div className="flex gap-2 font-medium leading-none">
                                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                                </div>
                                <div className="leading-none text-muted-foreground">
                                    Showing the profit of each month
                                </div>
                            </CardFooter>
                        </Card>
                        <Card className="flex flex-col relative h-full">
                        <BorderBeam size={50} duration={24} delay={9} />
                            <CardHeader className="items-center pb-0">
                                <CardTitle>Visitors</CardTitle>
                                <CardDescription>January - September 2024</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-1 items-center pb-0">
                                <ChartContainer
                                    config={chartConfig2}
                                    className="mx-auto aspect-square w-full max-w-[250px]"
                                >
                                    <RadialBarChart
                                        data={chartData2}
                                        endAngle={180}
                                        innerRadius={80}
                                        outerRadius={130}
                                    >
                                        <ChartTooltip
                                            cursor={false}
                                            content={<ChartTooltipContent hideLabel />}
                                        />
                                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                                            <Label
                                                content={({ viewBox }) => {
                                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                        return (
                                                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                                                                <tspan
                                                                    x={viewBox.cx}
                                                                    y={(viewBox.cy || 0) - 16}
                                                                    className="fill-foreground text-2xl font-bold"
                                                                >
                                                                    {totalVisitors.toLocaleString()}
                                                                </tspan>
                                                                <tspan
                                                                    x={viewBox.cx}
                                                                    y={(viewBox.cy || 0) + 4}
                                                                    className="fill-muted-foreground"
                                                                >
                                                                    Visitors
                                                                </tspan>
                                                            </text>
                                                        )
                                                    }
                                                }}
                                            />
                                        </PolarRadiusAxis>
                                        <RadialBar
                                            dataKey="desktop"
                                            stackId="a"
                                            cornerRadius={5}
                                            fill="var(--color-desktop)"
                                            className="stroke-transparent stroke-2"
                                        />
                                        <RadialBar
                                            dataKey="mobile"
                                            fill="var(--color-mobile)"
                                            stackId="a"
                                            cornerRadius={5}
                                            className="stroke-transparent stroke-2"
                                        />
                                    </RadialBarChart>
                                </ChartContainer>
                            </CardContent>
                            <CardFooter className="flex-col gap-2 text-sm">
                                <div className="flex items-center gap-2 font-medium leading-none">
                                    Trending up by 3.2% this month <TrendingUp className="h-4 w-4" />
                                </div>
                                <div className="leading-none text-muted-foreground">
                                    Showing total visitors for the last 9 months
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}