import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function UsersLinerChart() {
  const data = [
    { role: "Admin", count: 4 },
    { role: "Doctor", count: 7 },
    { role: "Patient", count: 12 },
  ];

  return (
    <div className="w-full max-w-2xl bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barSize={40}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="role" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#6366f1" radius={[5, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
