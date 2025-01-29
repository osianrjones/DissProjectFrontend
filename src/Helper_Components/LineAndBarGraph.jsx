import react from 'react';
import {Line, Bar} from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels,
);

const LineAndBarGraph = ({labels, data}) => {
    const lineData = {
        labels: labels,
        datasets: [
            { label: 'Votes',
               data: data,
               borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                pointBackgroundColor: 'rgba(75,192,192,1)',
                tension: 0.4,
            },
        ],
    };

    const barData = {
        labels: labels,
        datasets : [
            {
                label: "Votes",
                textColor: 'white',
                data: data,
                backgroundColor:['rgba(255, 99, 132, 0.6)'],
                borderColor: ['rgba(255, 99, 132, 0.6)'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins : {
            legend: {
                position: 'top',
                labels : {
                    color: 'white',
                },
            },
            title: {
                display: true,
                text: 'Graph Representation',
                color: 'white',
            },
        },
        scales : {
            x: {
                ticks: {
                    color: 'white',
                },
                grid : {
                    color: 'rgba(255, 255, 255, 0.2)',
                },
            },
            y: {
                ticks: {
                    color: 'white',
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)',
                },
            },
        },
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-2 md:gap-4 mt-10 w-full mb-2 ml-2 mr-2">
            <div className="flex flex-col items-center justify-center">
                <h2>Line Graph</h2>
                <Line data={lineData} options={options}/>
            </div>
            <div className="flex flex-col items-center justify-center">
                <h2>Bar Graph</h2>
                <Bar data={barData} options={options}/>
            </div>
        </div>
    );
};

export default LineAndBarGraph;