import ReactECharts from "echarts-for-react";
export default function Distribution() {
  const options = {
    color: [
      "rgba(238, 202, 255, 0.5)",
      "#D4C2DC",
      "#90B4CF",
      "#9379A7",
      "#7F8CB9",
    ],

    title: {
      text: "Active Holder Distribution",
      textStyle: {
        color: "Grey",
        fontFamily: "Roboto",
        fontWeight: "400",
        fontSize: "20px",
      },

      left: "left",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "horizontal",
      left: "left",
      bottom: "bottom",
      textStyle: {
        color: "white",
      },
    },
    series: [
      {
        name: "All Investments",
        type: "pie",
        radius: [0, "30%"],

        data: [{ name: "Overall", value: 7688 }],
        itemStyle: {
          shadowBlur: 200,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0)",
        },
        label: { show: false },
      },
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "60%"],
        data: [
          {
            value: 769,
            name: "IR Reserve 10%",
          },
          { value: 1153, name: "Locked 15%" },
          { value: 2306, name: "IR-Staking 30%" },
          { value: 3460, name: "Retail Investor 45%" },
        ],
        itemStyle: {
          shadowBlur: 45,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 40, 80)",
        },

        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0)",
          },
        },
      },
    ],
  };

  return (
    <ReactECharts
      option={options}
      style={{
        height: 400,
        width: "80%",
        position: "relative",
        left: 50,
        top: 50,
      }}
    />
  );
}
