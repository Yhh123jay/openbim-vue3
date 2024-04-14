import * as echarts from "echarts";

export const option1 = () => {
    const chartData = {
        szjhz: 23, // 水质净化站
        wsclc: 12, //污水处理厂
        wstsbz: 60, //污水提升泵站
        shuiba: 50
    };
    return {
        grid: {
            left: "3%",
            top: "5%",
            right: "3%",
            bottom: "0",
            containLabel: true,
        },
        xAxis: {
            type: "category",
            data: ["水质净化站", "污水处理厂", "污水提升泵站", '水坝'],
            axisLabel: {
                color: "rgba(255, 255, 255, 0.85)",
                fontSize: "14",
                interval: 0,
            },
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: "rgba(255, 255, 255, 0.85)",
                },
            },
        },
        yAxis: {
            type: "value",
            // logBase: 10,
            splitLine: {
                show: false,
            },
            axisLabel: {
                color: "rgba(255, 255, 255, 1)",
                fontSize: "16",
            },
        },
        tooltip: {
            trigger: "axis",
            formatter: "{b}:{c}座",
            axisPointer: {
                type: "shadow",
            },
        },
        series: [
            {
                data: [
                    chartData.szjhz,
                    chartData.wsclc,
                    chartData.wstsbz,
                    chartData.shuiba
                ],
                backgroundStyle: true,
                type: "bar",
                barWidth: 20,
                itemStyle: {
                    borderRadius: [30, 30, 0, 0],
                    // opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 1,
                            color: "rgba(20,150,243,0.80)",
                        },
                        {
                            offset: 0,
                            color: "rgba(0,211,158,0.80)",
                        },
                    ]),
                },
            },
        ],
    };
};

export const option2 = () => {
    const xData = [
        "车辆",
        "GPS",
        "全站仪",
        "吸雾车",
        "QV",
        "CCTV",
        "发电机",
        "空压机",
        "鼓风机",
        "无人机",
    ];
    const lineData = [12, 52, 48, 15, 25, 54, 55, 55, 65, 81];
    const options = {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
                label: {
                    show: true,
                    backgroundColor: "#333",
                },
            },
        },
        // legend: {
        //   data: ["line", "bar"],
        //   textStyle: {
        //     color: "#ccc",
        //   },
        // },
        grid: {
            left: "3%",
            top: "8%",
            right: "3%",
            bottom: "9%",
            containLabel: true,
        },
        xAxis: {
            data: xData,
            axisLabel: {
                fontSize: 16,
                show: true
            },
            axisLine: {
                lineStyle: {
                    color: "#ccc",
                },
            },
        },
        yAxis: {
            splitLine: { show: false },
            axisLine: {
                lineStyle: {
                    color: "#ccc",
                },
            },
        },
        series: [
            {
                name: "bar",
                type: "bar",
                barWidth: 10,
                itemStyle: {
                    borderRadius: 5,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "#14c8d4" },
                        { offset: 1, color: "#43eec6" },
                    ]),
                },
                data: lineData,
            },
            {
                name: "line",
                type: "bar",
                barGap: "-100%",
                barWidth: 10,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "rgba(20,200,212,0.5)" },
                        { offset: 0.2, color: "rgba(20,200,212,0.2)" },
                        { offset: 1, color: "rgba(20,200,212,0)" },
                    ]),
                },
                z: -12,
                data: [90, 90, 90, 90, 90, 90, 90, 90, 90, 90],
            },
            {
                name: "dotted",
                type: "pictorialBar",
                symbol: "rect",
                itemStyle: {
                    color: "#0f375f",
                },
                symbolRepeat: true,
                symbolSize: [12, 4],
                symbolMargin: 1,
                z: -10,
                data: [90, 90, 90, 90, 90, 90, 90, 90, 90, 90],
            },
        ],
    };
    return options;
};
