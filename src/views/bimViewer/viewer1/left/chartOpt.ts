import * as echarts from "echarts";

export const option1 = () => {
    const indicator = [
        { name: "风速", max: 100, num: 1 },
        { name: "大气稳定性", max: 100, num: 2 },
        { name: "能见度", max: 100, num: 3 },
        { name: "云层高度", max: 100, num: 4 },
        { name: "天气情况", max: 100, num: 5 },
    ];
    const dataValue1 = [43, 90, 80, 53, 78, 89, 77, 50];
    const dataArr = [
        {
            value: dataValue1,
            name: "",
            itemStyle: {
                normal: {
                    lineStyle: {
                        color: "#17E7FF",
                    },
                    shadowColor: "#17E7FF",
                    shadowBlur: 5,
                },
            },
        },
    ];

    //@ts-ignore
    function contains(arr: any[], obj: any) {
        let i = arr.length;
        while (i--) {
            if (arr[i].name === obj) {
                return i;
            }
        }
        return false;
    }
    //@ts-ignore
    const num = 80;
    return {
        // backgroundColor: '#000928',
        color: ["#17E7FF"],
        // title: {
        //     text: [`{span|${num}}\n{b|综合评分}`].join(''),
        //     bottom: 'center',
        //     left: 'center',
        //     // triggerEvent: true, //开启雷达图的边角名称可点击
        //     textStyle: {
        //         rich: {
        //             span: {
        //                 fontSize: 50,
        //                 fontWeight: 500,
        //                 color: '#fff',
        //                 textShadowColor: 'rgba(120, 246, 255, 0.73)',
        //                 textShadowBlur: -1,
        //                 textShadowOffsetX: 0,
        //                 textShadowOffsetY: 2,
        //             },
        //             b: {
        //                 fontSize: 25,
        //                 color: '#D7F6F3',
        //                 lineHeight: 40,
        //             },
        //         },
        //     },
        // },
        radar: {
            radius: "65%",
            // startAngle: 60, //坐标系起始角度，也就是第一个指示器轴的角度
            // z:5,
            // shape: 'circle',
            center: ["50%", "50%"],
            triggerEvent: true, //开启雷达图的边角名称可点击
            name: {
                // (圆外的标签)雷达图每个指示器名称的配置项。分
                // formatter: (value: any) => {
                //     const i = contains(indicator, value); // 处理对应要显示的样式
                //     return '{a|' + dataValue1[Number(i)] + '}\n' + '{b|' + value + '}';
                // },
                textStyle: {
                    padding: [5, 5, 5, 5],
                    color: "#fff",
                },
                // backgroundColor: {
                // image: uploadedDataURL2,
                // },
                // width: 200,
                // height: 70,
                // rich: {
                //     a: {
                //         align: 'center',
                //         color: '#6EFFFD',
                //         fontWeight: 500,
                //         height: 30,
                //         fontSize: 16,
                //     },
                //     b: {
                //         align: 'center',
                //         color: '#FFFFFF',
                //         fontSize: 14,
                //     },
                //     // triggerEvent: true,//开启雷达图的边角名称可点击
                // },
            },

            // nameGap: 6,
            indicator: indicator,
            splitArea: {
                // 坐标轴在 grid 区域中的分隔区域，默认不显示。
                show: false,
            },
            axisLine: {
                //轴线
                show: true,
                lineStyle: {
                    color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                        {
                            color: "#15506D0D",
                            offset: 0,
                        },
                        {
                            color: "#95E4F0",
                            offset: 0.9,
                        },
                    ]),
                },
            },
            splitLine: {
                show: true,
                lineStyle: {
                    width: 1,
                    color: "rgba(153, 209, 246, 0.5)", // 网格分割线颜色
                },
            },
        },
        series: [
            {
                type: "radar",
                symbolSize: 6,
                symbol: "circle",
                data: dataArr,
                areaStyle: {
                    color: "#9EDDFF",
                    opacity: 0.3,
                },
                lineStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                            {
                                offset: 0,
                                color: "#00D1FF",
                            },
                            {
                                offset: 1,
                                color: "#00A5FE",
                            },
                        ],
                        false
                    ),
                    width: 2,
                },
                itemStyle: {
                    color: "#fff ",
                    borderColor: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                            {
                                offset: 0,
                                color: "#00D1FF",
                            },
                            {
                                offset: 1,
                                color: "#00A5FE",
                            },
                        ],
                        false
                    ),
                    borderWidth: 2,
                    opacity: 1,
                },
            },
        ],
    };
};

export const option2 = () => {
    const chartData = {
        ys: [50, 20, 30, 40, 50, 44],
        ws: [50, 56, 60, 80, 81, 96],
        hl: [20, 30, 44, 55, 57, 59],
        jl: [12, 15, 16, 18, 20, 23],
    };
    //@ts-ignore
    const tq = [80, 120, 30, 49, 18, 90, 48, 39, 27, 49, 58, 20];
    //@ts-ignore
    const tq1 = [0, 20, 30, 60, 49, 18, 90, 48, 39, 30, 27, 40].map(
        (item) => ~~(item * 1.1)
    );
    //@ts-ignore
    const tq2 = [12, 50, 50, 27, 49, 58, 80, 80, 19, 60, 30, 30];
    //@ts-ignore
    const tq3 = [];
    return {
        // title: {
        //   text: "排查管长（m）",
        //   left: "center",
        //   top: "0",
        //   textStyle: {
        //     fontSize: 18,
        //     color: "rgba(255,255,255,0.8)",
        //     fontWeight: "normal",
        //   },
        // },
        color: ["#80FFA5", "#00DDFF", "#37A2FF", "#40E0D0", "#FFBF00"],
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "cross",
                label: {
                    backgroundColor: "#6a7985",
                },
            },
        },
        legend: {
            top: "0",
            data: [
                {
                    icon: "circle",
                    name: "雨水",
                },

                {
                    icon: "circle",
                    name: "污水",
                },
                {
                    icon: "circle",
                    name: "合流",
                },
                {
                    icon: "circle",
                    name: "截流",
                },
            ],
            textStyle: {
                color: "rgba(255, 255, 255, 1)",
            },
        },
        grid: {
            left: "3%",
            right: "3%",
            bottom: "1%",
            top: "13%",
            containLabel: true,
        },
        xAxis: [
            {
                type: "category",
                boundaryGap: false,
                data: ["7月", "8月", "9月", "10月", "11月", "12月"],
                axisLine: {
                    // show: false,
                    lineStyle: {
                        color: "rgba(255, 255, 255, 0.2)",
                    },
                },
                splitLine: {
                    show: false,
                },
                axisTick: {
                    inside: true,
                    lineStyle: {
                        color: "rgba(255, 255, 255, 0.5)",
                    },
                },
                axisLabel: {
                    color: "rgba(255, 255, 255, 1)",
                    fontSize: 12,
                },
            },
        ],
        yAxis: [
            {
                type: "value",
                // logBase,
                splitLine: {
                    show: false,
                },
                axisLabel: {
                    color: "rgba(255, 255, 255, 1)",
                    fontSize: 12,
                },
            },
        ],
        series: [
            {
                animationDuration: 3000,
                name: "雨水",
                type: "line",
                smooth: true,
                showSymbol: false,
                zlevel: 1,
                z: 1,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: "rgba(2,168,229,0.50)",
                        },
                        {
                            offset: 1,
                            color: "rgba(1,184,251,0.00)",
                        },
                    ]),
                },
                emphasis: {
                    focus: "series",
                },
                data: chartData.ys,
                lineStyle: {
                    width: 1,
                    color: "rgba(2,168,229,1)",
                },
                // endLabel: {
                //   show: true,
                //   formatter: "{a}",
                //   color: "rgba(255, 255, 255, 1)",
                //   fontSize: 14,
                //   offset: [-50, 0],
                // },
            },
            {
                animationDuration: 3000,
                name: "污水",
                type: "line",
                smooth: true,
                showSymbol: false,
                zlevel: 1,
                z: 1,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: "rgba(90,216,166,0.50)",
                        },
                        {
                            offset: 1,
                            color: "rgba(90,216,166,0.00)",
                        },
                    ]),
                },
                emphasis: {
                    focus: "series",
                },
                data: chartData.ws,
                lineStyle: {
                    width: 1,
                    color: "rgba(90,216,166,1)",
                },
            },
            {
                animationDuration: 3000,
                name: "合流",
                type: "line",
                smooth: true,
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: "rgba(91,143,249,0.50)",
                        },
                        {
                            offset: 1,
                            color: "rgba(91,143,249,0.00)",
                        },
                    ]),
                },
                emphasis: {
                    focus: "series",
                },
                data: chartData.hl,
                lineStyle: {
                    width: 1,
                    color: "rgba(91,143,249,1)",
                },
            },
            {
                animationDuration: 3000,
                name: "截流",
                type: "line",
                smooth: true,
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: "rgba(91,143,249,0.50)",
                        },
                        {
                            offset: 1,
                            color: "rgba(91,143,249,0.00)",
                        },
                    ]),
                },
                emphasis: {
                    focus: "series",
                },
                data: chartData.jl,
                lineStyle: {
                    width: 1,
                    color: "rgba(91,143,249,1)",
                },
            },
        ],
    };
};
