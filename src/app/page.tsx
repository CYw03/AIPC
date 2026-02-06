// /src/app/page.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { TrendingUp, Users, Cpu, BarChart3 } from "lucide-react";

export default function Home() {
  const [stats, setStats] = useState({
    recommendations: 1024,
    conversions: 42,
    activeUsers: 28,
    sales: 18
  });

  // 模拟实时数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        recommendations: prev.recommendations + Math.floor(Math.random() * 10),
        activeUsers: prev.activeUsers + (Math.random() > 0.5 ? 1 : 0)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      {/* 顶部标题区域 */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          联想 AIPC 智能助手平台
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          全方位智能购机解决方案，赋能用户选购与销售转化
        </p>
        <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
          <span className="flex items-center">
            <div className="mr-1 h-2 w-2 rounded-full bg-green-500"></div>
            系统运行正常
          </span>
          <span>•</span>
          <span>今日活跃用户：{stats.activeUsers}</span>
          <span>•</span>
          <span>最后更新：刚刚</span>
        </div>
      </div>

      {/* 关键指标卡片 */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-lg transition-transform hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">AI推荐次数</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {stats.recommendations.toLocaleString()}
              </p>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <Cpu className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="mr-1 h-4 w-4" />
            <span>+12.5% 本月增长</span>
          </div>
        </div>

        <div className="rounded-2xl border border-green-100 bg-white p-6 shadow-lg transition-transform hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">咨询转化率</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stats.conversions}%</p>
            </div>
            <div className="rounded-full bg-green-100 p-3">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="mr-1 h-4 w-4" />
            <span>+3.2% 相比上周</span>
          </div>
        </div>

        <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-lg transition-transform hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">活跃用户数</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stats.activeUsers}</p>
            </div>
            <div className="rounded-full bg-purple-100 p-3">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="mr-1 h-4 w-4" />
            <span>+5 今日新增</span>
          </div>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-white p-6 shadow-lg transition-transform hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">模拟成交率</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stats.sales}%</p>
            </div>
            <div className="rounded-full bg-amber-100 p-3">
              <BarChart3 className="h-6 w-6 text-amber-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="mr-1 h-4 w-4" />
            <span>+2.1% 转化提升</span>
          </div>
        </div>
      </div>

      {/* 主要功能入口 */}
      <div className="mb-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">功能模块</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* AI购机助手卡片 */}
          <Link href="/assistant" className="group">
            <div className="relative overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-blue-300">
              <div className="relative z-10">
                <div className="mb-4 inline-flex rounded-xl bg-blue-100 p-3">
                  <div className="text-3xl">🤖</div>
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">用户 AI 购机助手</h3>
                <p className="mb-6 text-gray-600">
                  智能对话式购机推荐，通过AI分析用户需求，推荐最适合的AIPC设备
                </p>
                <div className="flex items-center text-blue-600">
                  <span className="font-medium">开始使用</span>
                  <svg 
                    className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
              <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-blue-100 opacity-50"></div>
              <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-blue-200 opacity-30"></div>
            </div>
          </Link>

          {/* 销售顾问助手卡片 */}
          <Link href="/sales" className="group">
            <div className="relative overflow-hidden rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-green-300">
              <div className="relative z-10">
                <div className="mb-4 inline-flex rounded-xl bg-green-100 p-3">
                  <div className="text-3xl">🧑‍💼</div>
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">销售顾问助手</h3>
                <p className="mb-6 text-gray-600">
                  专业销售工作台，客户管理、智能推荐、报价生成，提升销售转化效率
                </p>
                <div className="flex items-center text-green-600">
                  <span className="font-medium">进入工作台</span>
                  <svg 
                    className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
              <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-green-100 opacity-50"></div>
              <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-green-200 opacity-30"></div>
            </div>
          </Link>

          {/* 数据看板卡片 */}
          <Link href="/dashboard" className="group">
            <div className="relative overflow-hidden rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-purple-300">
              <div className="relative z-10">
                <div className="mb-4 inline-flex rounded-xl bg-purple-100 p-3">
                  <div className="text-3xl">📊</div>
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">管理数据看板</h3>
                <p className="mb-6 text-gray-600">
                  全方位数据可视化，监控系统运营状况、用户行为、销售转化等关键指标
                </p>
                <div className="flex items-center text-purple-600">
                  <span className="font-medium">查看数据</span>
                  <svg 
                    className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
              <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-purple-100 opacity-50"></div>
              <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-purple-200 opacity-30"></div>
            </div>
          </Link>
        </div>
      </div>

      {/* 底部：快速访问和系统状态 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="mb-4 font-semibold text-gray-900">快速访问</h3>
          <div className="space-y-3">
            <Link href="/assistant" className="flex items-center justify-between rounded-lg p-3 hover:bg-gray-50">
              <span className="flex items-center">
                <div className="mr-3 h-2 w-2 rounded-full bg-blue-500"></div>
                AI助手对话历史
              </span>
              <span className="text-gray-400">→</span>
            </Link>
            <Link href="/sales" className="flex items-center justify-between rounded-lg p-3 hover:bg-gray-50">
              <span className="flex items-center">
                <div className="mr-3 h-2 w-2 rounded-full bg-green-500"></div>
                待跟进客户列表
              </span>
              <span className="text-gray-400">→</span>
            </Link>
            <Link href="/dashboard" className="flex items-center justify-between rounded-lg p-3 hover:bg-gray-50">
              <span className="flex items-center">
                <div className="mr-3 h-2 w-2 rounded-full bg-purple-500"></div>
                月度数据报告
              </span>
              <span className="text-gray-400">→</span>
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 lg:col-span-2">
          <h3 className="mb-4 font-semibold text-gray-900">系统状态</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-gray-100 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">AI服务状态</span>
                <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
              </div>
              <div className="mt-2 text-lg font-medium">正常运行</div>
              <div className="mt-1 text-xs text-gray-500">响应时间: 2.3s</div>
            </div>
            <div className="rounded-lg border border-gray-100 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">数据库连接</span>
                <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
              </div>
              <div className="mt-2 text-lg font-medium">连接正常</div>
              <div className="mt-1 text-xs text-gray-500">查询延迟: 120ms</div>
            </div>
            <div className="rounded-lg border border-gray-100 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">今日活跃会话</span>
                <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>
              </div>
              <div className="mt-2 text-lg font-medium">24个</div>
              <div className="mt-1 text-xs text-gray-500">较昨日 +8%</div>
            </div>
            <div className="rounded-lg border border-gray-100 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">用户满意度</span>
                <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
              </div>
              <div className="mt-2 text-lg font-medium">96.2%</div>
              <div className="mt-1 text-xs text-gray-500">收集自124条反馈</div>
            </div>
          </div>
        </div>
      </div>

      {/* 页脚 */}
      <div className="mt-8 border-t pt-6 text-center text-sm text-gray-500">
        <p>联想 AIPC 智能助手平台 © 2024 - 赋能每一位用户找到最适合的AI PC</p>
        <p className="mt-2">
          <span className="mx-2">版本 2.1.0</span>•<span className="mx-2">技术支持热线: 400-100-3000</span>•<span className="mx-2">隐私政策</span>
        </p>
      </div>
    </div>
  );
}