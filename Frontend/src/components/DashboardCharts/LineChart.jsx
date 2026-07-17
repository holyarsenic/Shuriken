import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";


const LineGraphForViews = ({data}) => {
  return (
    <div className="bg-white dark:bg-[#181622] border border-[#2A2438] rounded-2xl p-6 w-1/2">

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-black dark:text-white text-xl font-bold">
          Views Analytics
        </h2>

        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Last month
        </p>

      </div>


     <div className="flex items-center justify-center h-auto w-ful">
      <ResponsiveContainer width="100%" height={350}>

        <LineChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#2A2438"
          />


          <XAxis
            dataKey="month"
            stroke="#9CA3AF"
          />


          <YAxis
            dataKey="views"
            stroke="#9CA3AF"
          />


          <Tooltip
            contentStyle={{
              backgroundColor: "#111",
              border: "1px solid #2A2438",
              borderRadius: "1rem",
              color: "white"
            }}
          />


          <Line
            type="monotone"
            dataKey="views"
            stroke="white"
            strokeWidth={1}
            dot={{
              r: 2,
              fill: "white"
            }}
          />


        </LineChart>

      </ResponsiveContainer>
     </div>
    </div>
  )
}

export default LineGraphForViews
