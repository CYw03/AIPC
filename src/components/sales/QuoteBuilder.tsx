// /src/components/sales/QuoteBuilder.tsx
"use client";

import { useState } from "react";

interface QuoteBuilderProps {
  customer: any;
}

export default function QuoteBuilder({ customer }: QuoteBuilderProps) {
  const [quoteItems, setQuoteItems] = useState([
    { id: 1, name: "ThinkPad X1 Carbon AI", price: 13999, quantity: 1 },
    { id: 2, name: "联想官方背包", price: 299, quantity: 1 },
    { id: 3, name: "三年全保服务", price: 999, quantity: 1 },
  ]);

  const subtotal = quoteItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 500;
  const total = subtotal - discount;

  const updateQuantity = (id: number, change: number) => {
    setQuoteItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setQuoteItems(items => items.filter(item => item.id !== id));
  };

  return (
    <div>
      <div className="mb-4 rounded-lg bg-gray-50 p-4">
        <h4 className="font-medium">为 {customer.name} 创建报价单</h4>
        <p className="text-sm text-gray-600">根据客户标签智能推荐产品</p>
      </div>

      <div className="space-y-3">
        {quoteItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-lg border p-3">
            <div>
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-gray-600">¥{item.price.toLocaleString()}</div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <button
                  className="h-6 w-6 rounded-full border"
                  onClick={() => updateQuantity(item.id, -1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="h-6 w-6 rounded-full border"
                  onClick={() => updateQuantity(item.id, 1)}
                >
                  +
                </button>
              </div>
              <div className="w-20 text-right font-medium">
                ¥{(item.price * item.quantity).toLocaleString()}
              </div>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => removeItem(item.id)}
              >
                移除
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t pt-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>小计</span>
            <span>¥{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>优惠折扣</span>
            <span>-¥{discount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between border-t pt-2 font-bold text-lg">
            <span>总计</span>
            <span>¥{total.toLocaleString()}</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button className="rounded-lg border border-blue-600 py-2 text-blue-600 hover:bg-blue-50">
            保存草稿
          </button>
          <button className="rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700">
            生成报价单
          </button>
        </div>
      </div>
    </div>
  );
}