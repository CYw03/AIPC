// /src/components/dashboard/ConversionChart.tsx
"use client";

import { useEffect, useRef } from "react";

export default function ConversionChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // 设置canvas尺寸
    canvas.width = canvas.clientWidth * 2;
    canvas.height = canvas.clientHeight * 2;
    ctx.scale(2, 2);
    
    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 模拟数据
    const data = [30, 35, 38, 40, 42, 45, 43, 42];
    const labels = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月"];
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    // 画网格
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 0.5;
    
    // 水平网格
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }
    
    // 画折线
    ctx.beginPath();
    data.forEach((value, index) => {
      const x = padding + (chartWidth / (data.length - 1)) * index;
      const y = padding + chartHeight - (value / 50) * chartHeight;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // 画数据点
    data.forEach((value, index) => {
      const x = padding + (chartWidth / (data.length - 1)) * index;
      const y = padding + chartHeight - (value / 50) * chartHeight;
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#3b82f6";
      ctx.fill();
      
      // 标签
      ctx.fillStyle = "#6b7280";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(`${value}%`, x, y - 10);
      
      // x轴标签
      ctx.fillText(labels[index], x, height - padding + 20);
    });
    
  }, []);
  
  return (
    <canvas 
      ref={canvasRef}
      className="h-full w-full"
    />
  );
}