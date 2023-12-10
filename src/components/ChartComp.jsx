import React, { useEffect, useState } from "react";
import { getData } from "../api/thegraph.js";
import { useGlobalContext } from "../context/walletContext";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import PieChart from "./PieChart.jsx";

Chart.register(CategoryScale);

function ChartComp() {
  const { address } = useGlobalContext();

  // State to hold the chart data
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Votes",
        data: [],
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  });

  // Fetch data from the API
  const fetchData = async () => {
    try {
      const response = await getData();
      const apiData = response.data.entityVoteCollecteds;

      // Extracting labels and data from the API response
      const labels = apiData.map((data) => data.entity);
      const dataValues = apiData.map((data) => data.voteCount);

      // Update the state with the new data
      setChartData({
        labels: labels,
        datasets: [
          {
            ...chartData.datasets[0],
            data: dataValues,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch data when the component mounts or when the address changes
    fetchData();
  }, [address]);

  return (
    <div style={{marginTop:"60%"}}>
      <PieChart chartData={chartData} />
    </div>
  );
}

export default ChartComp;
