// /src/app/sales/page.tsx
"use client";

import { useState } from "react";
import UserSummary from "@/components/UserSummary";
import ProductCatalog from "@/components/sales/ProductCatalog";
import SalesTools from "@/components/sales/SalesTools";
import CustomerNotes from "@/components/sales/CustomerNotes";
import QuoteBuilder from "@/components/sales/QuoteBuilder";
import RecentInteractions from "@/components/sales/RecentInteractions";

// 模拟客户数据
const mockCustomers = [
  { id: 1, name: "张先生", priority: "高", tags: ["AI开发", "预算充足"], lastContact: "今天 10:30" },
  { id: 2, name: "李女士", priority: "中", tags: ["视频剪辑", "学生"], lastContact: "今天 09:15" },
  { id: 3, name: "王工程师", priority: "高", tags: ["企业采购", "批量"], lastContact: "昨天 16:45" },
  { id: 4, name: "赵设计师", priority: "低", tags: ["创意设计", "自由职业"], lastContact: "昨天 14:20" },
  { id: 5, name: "刘同学", priority: "中", tags: ["编程学习", "性价比"], lastContact: "前天 11:10" },
];

export default function SalesPage() {
  const [selectedCustomer, setSelectedCustomer] = useState(mockCustomers[0]);
  const [activeTab, setActiveTab] = useState("summary");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* 顶部导航和标题 */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">销售顾问工作台</h1>
          <p className="text-gray-600">智能辅助销售，提升转化效率</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            新建客户
          </button>
          <button className="rounded-lg border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50">
            导出报告
          </button>
          <div className="text-sm text-gray-500">
            顾问：<span className="font-medium">张小凡</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* 左侧：客户列表 */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">客户列表</h3>
            <div className="space-y-2">
              {mockCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className={`cursor-pointer rounded-lg p-3 transition-colors ${
                    selectedCustomer.id === customer.id
                      ? "bg-blue-50 border border-blue-200"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedCustomer(customer)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className={`mr-3 h-2 w-2 rounded-full ${
                          customer.priority === "高"
                            ? "bg-red-500"
                            : customer.priority === "中"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                      />
                      <span className="font-medium">{customer.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{customer.lastContact}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {customer.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">今日跟进</span>
                <span className="font-medium">3/5</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                <div className="h-full w-3/5 rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>

          {/* 快速工具 */}
          <div className="mt-4 rounded-xl border bg-white p-4 shadow-sm">
            <h3 className="mb-3 text-lg font-semibold">快速工具</h3>
            <SalesTools />
          </div>
        </div>

        {/* 中间：客户详情和交互区 */}
        <div className="lg:col-span-2">
          {/* 客户摘要 */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">客户详情 - {selectedCustomer.name}</h2>
              <div className="flex space-x-2">
                <button className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                  标记为意向
                </button>
                <button className="rounded-lg border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50">
                  安排回访
                </button>
              </div>
            </div>
            
            {/* 标签导航 */}
            <div className="mb-6 border-b">
              <nav className="-mb-px flex space-x-8">
                {["summary", "interactions", "notes", "quotes"].map((tab) => (
                  <button
                    key={tab}
                    className={`border-b-2 px-1 py-3 text-sm font-medium ${
                      activeTab === tab
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === "summary" && "客户摘要"}
                    {tab === "interactions" && "互动记录"}
                    {tab === "notes" && "销售笔记"}
                    {tab === "quotes" && "报价方案"}
                  </button>
                ))}
              </nav>
            </div>

            {/* 标签内容 */}
            <div className="min-h-[400px]">
              {activeTab === "summary" && <UserSummary customer={selectedCustomer} />}
              {activeTab === "interactions" && <RecentInteractions customerId={selectedCustomer.id} />}
              {activeTab === "notes" && <CustomerNotes customerId={selectedCustomer.id} />}
              {activeTab === "quotes" && <QuoteBuilder customer={selectedCustomer} />}
            </div>
          </div>

          {/* AI销售建议 */}
          <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4">
            <div className="flex items-start">
              <div className="mr-3 rounded-full bg-blue-100 p-2">
                <span className="text-blue-600">🤖</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-blue-800">AI销售建议</h4>
                <p className="mt-1 text-blue-700">
                  根据客户标签分析，{selectedCustomer.name} 可能对性能配置比较关注。
                  建议重点介绍 {selectedCustomer.tags.includes("AI开发") ? "NPU算力" : "显卡性能"}，
                  并提供相关的应用场景演示。
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 hover:bg-blue-200">
                    准备演示材料
                  </button>
                  <button className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 hover:bg-blue-200">
                    生成对比表格
                  </button>
                  <button className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 hover:bg-blue-200">
                    安排产品体验
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：产品目录和推荐 */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">推荐产品</h3>
              <span className="text-sm text-blue-600">智能匹配</span>
            </div>
            <ProductCatalog customerTags={selectedCustomer.tags} />
          </div>

          {/* 销售目标 */}
          <div className="mt-4 rounded-xl border bg-white p-4 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">本月销售目标</h3>
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span>销售额</span>
                  <span className="font-medium">¥86,400 / ¥120,000</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div className="h-full w-3/4 rounded-full bg-green-500"></div>
                </div>
                <div className="mt-1 text-xs text-gray-500">72% 完成</div>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span>成交单数</span>
                  <span className="font-medium">18 / 25</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div className="h-full w-4/5 rounded-full bg-blue-500"></div>
                </div>
                <div className="mt-1 text-xs text-gray-500">72% 完成</div>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span>客户转化率</span>
                  <span className="font-medium">32%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div className="h-full w-1/3 rounded-full bg-purple-500"></div>
                </div>
                <div className="mt-1 text-xs text-gray-500">行业平均 28%</div>
              </div>
            </div>
            <button className="mt-4 w-full rounded-lg bg-gray-100 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
              查看详细报告
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}