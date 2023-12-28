import {Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {dateFormat} from "@/lib/dateFormat.ts";

const average = (newEntry: number, averageWeight: number, count: number) => {
    return (averageWeight * count + newEntry) / (count + 1);
}

export interface Weight {
    entry: string,
    datadate: string,
}

interface WeightProps {
    data: Weight[];
}

const chart = (props: WeightProps) => {
    const {data} = props;
    let averageWeight = 0;
    let count = 0;
    const dataWithAverageWeight = data.map((weight: any) => {
        averageWeight = average(weight.entry, averageWeight, count);
        count++;
        return {
            ...weight,
            averageWeight: averageWeight,
        };
    });

    const maxWeight = Math.max(
        Math.max(...data.map((weight: any) => weight.entry)),
        Math.max(...data.map((weight: any) => weight.averageWeight))
    ) * 1.05;
    const minWeight = Math.min(
        Math.min(...data.map((weight: any) => weight.entry)),
        Math.min(...data.map((weight: any) => weight.averageWeight))
    ) * 0.95;

    return (
        <div className="p-4">
            <div>
                <div className="h-[250px] ml-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={dataWithAverageWeight}
                            margin={{
                                top: 5,
                                right: 10,
                                left: 10,
                                bottom: 0,
                            }}
                        >
                            <Tooltip
                                content={({active, payload}) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                                                <div>
                                                    {dateFormat(payload[0].payload.datadate)}
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="flex flex-col">
                                                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                            Weight
                                                        </span>
                                                        <span className="font-bold">
                                                            {payload[0].payload.entry}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                            Average
                                                        </span>
                                                        <span className="font-bold text-muted-foreground">
                                                            {payload[0].payload.averageWeight.toFixed(2)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <YAxis hide={true} domain={[minWeight, maxWeight]}/>
                            <XAxis hide={true} dataKey="datadate"/>
                            <Line
                                type="monotone"
                                dataKey="entry"
                                stroke="#000000"
                                strokeWidth={2}
                                activeDot={{
                                    r: 6,
                                    style: {fill: "#000000", opacity: 1},
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="averageWeight"
                                stroke="#bdbdbd"
                                strokeWidth={2}
                                activeDot={{
                                    r: 6,
                                    style: {fill: "#bdbdbd", opacity: 1},
                                }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default chart;
