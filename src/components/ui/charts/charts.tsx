"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Misol uchun, oylik kasallik diagnostikasi statistikasi:
const data = [
  { month: "Jan", diabetes: 400, hypertension: 240, asthma: 240 },
  { month: "Feb", diabetes: 300, hypertension: 139, asthma: 221 },
  { month: "Mar", diabetes: 200, hypertension: 980, asthma: 229 },
  { month: "Apr", diabetes: 278, hypertension: 390, asthma: 200 },
  { month: "May", diabetes: 189, hypertension: 480, asthma: 218 },
  { month: "Jun", diabetes: 239, hypertension: 380, asthma: 250 },
  { month: "Jul", diabetes: 349, hypertension: 430, asthma: 210 },
];

export default function MedTechDashboard() {
  return (
    <div
      style={{
        width: "100%",
        height: 400,
        background: "#f8f9fa",
        padding: 20,
        borderRadius: 10,
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>
        MedTech Dashboard
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <Bar dataKey="diabetes" fill="#8884d8" radius={[5, 5, 0, 0]} />
          <Bar dataKey="hypertension" fill="#82ca9d" radius={[5, 5, 0, 0]} />
          <Bar dataKey="asthma" fill="#ffc658" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
