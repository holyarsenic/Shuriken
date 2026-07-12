import {
  Pie,
  PieChart,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer } from "recharts"

const COLORS = [
  "#7C3AED",
  "#A78BFA"
];

const PieChartView = ({followers,following}) => {

    const data = [
    { name: "Followers", value: followers },
    { name: "Following", value: following },
  ];

  return (
     <div className="bg-[#181622] border border-[#2A2438] rounded-2xl p-6 w-1/2">
    
          <div className="flex justify-between items-center mb-5">
    
            <h2 className="text-white text-xl font-bold">
              Followers/Following
            </h2>
    
          </div>
    
    
          <ResponsiveContainer width="100%" height={350}>
    
            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >

                {
                  data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index]}
                    />
                  ))
                }

              </Pie>


              <Tooltip
                contentStyle={{
                  backgroundColor: "#111",
                  border: "1px solid #2A2438",
                  borderRadius: "1rem",
                  color: "white"
                }}
              />


              <Legend />

            </PieChart>
    
          </ResponsiveContainer>
    
        </div>
  )
}

export default PieChartView
