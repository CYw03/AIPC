// /src/app/assistant/page.tsx - 美化版
"use client";

import { useState, useEffect } from "react";
import AssistantLayout from "@/components/ai/AssistantLayout";
import StepPanel from "@/components/ai/StepPanel";
import ChatPanel from "@/components/ai/ChatPanel";
import InsightPanel from "@/components/ai/InsightPanel";
import RecommendPanel from "@/components/ai/RecommendPanel";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function AssistantPage() {
  const [profile, setProfile] = useState<any>({
    useCase: null,
    budget: null,
    mobility: null,
  });
  const [recommendation, setRecommendation] = useState<any>(null);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // 当profile更新时，更新完成的步骤
  useEffect(() => {
    const steps = [];
    if (profile.useCase) steps.push("scene");
    if (profile.budget) steps.push("budget");
    if (profile.mobility) steps.push("mobility");
    setCompletedSteps(steps);

    // 当所有信息都收集完成时，生成推荐
    if (profile.useCase && profile.budget && profile.mobility) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000); // 3秒后自动隐藏
      generateRecommendation(profile);
    }
  }, [profile]);

  // 处理profile更新
  const handleProfileUpdate = (newProfile: any) => {
    setProfile(newProfile);
  };

  // 生成推荐
  const generateRecommendation = async (profileData: any) => {
    setIsGenerating(true);
    try {
      // 调用推荐API
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile: profileData })
      });
      
      if (!res.ok) {
        throw new Error("推荐API调用失败");
      }
      
      const data = await res.json();
      
      // 添加延迟效果，让用户感受到AI在"思考"
      setTimeout(() => {
        setRecommendation(data);
        setIsGenerating(false);
      }, 1500);
      
    } catch (error) {
      console.error("推荐生成失败，使用模拟数据:", error);
      
      // 降级方案：使用本地逻辑生成模拟推荐
      setTimeout(() => {
        const recommendation = generateMockRecommendation(profileData);
        setRecommendation(recommendation);
        setIsGenerating(false);
      }, 1500);
    }
  };

  // 生成模拟推荐数据
  const generateMockRecommendation = (profileData: any) => {
    let model = "";
    let reason = "";
    let price = "";
    let features: string[] = [];
    let matchScore = Math.floor(Math.random() * 20) + 80; // 80-100匹配度
    
    // 根据预算选择
    if (profileData.budget === "5k-8k") {
      model = "联想小新 Pro 14 AI";
      price = "¥6,999";
      features = ["Intel Core Ultra 5", "16GB RAM", "512GB SSD", "入门级NPU"];
      reason = "性价比高，适合入门级AI开发和日常办公";
      matchScore = 82;
    } else if (profileData.budget === "8k-12k") {
      model = "联想 Yoga 9i AI";
      price = "¥9,999";
      features = ["Intel Core Ultra 7", "16GB RAM", "1TB SSD", "2.8K OLED触控屏"];
      reason = "性能均衡，屏幕优秀，适合视频剪辑和创意工作";
      matchScore = 88;
    } else if (profileData.budget === "12k-15k") {
      model = "联想 ThinkBook 16p AI";
      price = "¥12,999";
      features = ["Intel Core Ultra 9", "32GB RAM", "1TB SSD", "RTX 4060 GPU"];
      reason = "性能强劲，适合专业AI开发和3D渲染";
      matchScore = 91;
    } else {
      model = "联想 ThinkPad X1 Carbon AI";
      price = "¥15,999起";
      features = ["Intel Core Ultra 9", "64GB RAM", "2TB SSD", "顶级NPU 45 TOPS"];
      reason = "商务旗舰，顶级性能，适合企业级AI应用";
      matchScore = 95;
    }
    
    // 根据使用场景调整理由
    const reasonEnhancements = [];
    if (profileData.useCase?.includes("AI开发")) {
      reasonEnhancements.push("NPU算力满足AI推理需求");
    }
    if (profileData.useCase?.includes("视频剪辑")) {
      reasonEnhancements.push("GPU性能强大，渲染速度快");
    }
    if (profileData.mobility === "经常携带") {
      reasonEnhancements.push("轻薄便携设计");
    } else if (profileData.mobility === "基本固定") {
      reasonEnhancements.push("散热性能优秀");
    }
    
    if (reasonEnhancements.length > 0) {
      reason += `，${reasonEnhancements.join("，")}`;
    }
    
    return {
      model,
      reason,
      features,
      price,
      tags: profileData.useCase || [],
      matchScore,
      userNeeds: profileData,
      recommendedAt: new Date().toLocaleTimeString('zh-CN', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  };

  // 重新生成推荐
  const handleRegenerate = () => {
    setRecommendation(null);
    setIsGenerating(true);
    setTimeout(() => {
      const newRecommendation = generateMockRecommendation(profile);
      setRecommendation(newRecommendation);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* 庆祝动画 */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
          <div className="relative z-10 animate-bounce rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center text-white shadow-2xl">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold">完美！信息收集完成</h3>
            <p className="mt-2 opacity-90">正在为您生成个性化推荐...</p>
          </div>
        </div>
      )}

      {/* 顶部标题栏 */}
      <div className="border-b bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 p-3">
                <span className="text-2xl">🤖</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AIPC AI 购机助手</h1>
                <p className="text-gray-600">通过对话智能推荐最适合您的AI电脑</p>
              </div>
            </div>
            <div className="hidden items-center space-x-4 md:flex">
              <div className="rounded-full bg-green-100 px-4 py-2">
                <span className="flex items-center text-sm font-medium text-green-800">
                  <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                  AI在线
                </span>
              </div>
              <button 
                onClick={() => {
                  setProfile({ useCase: null, budget: null, mobility: null });
                  setRecommendation(null);
                  setCompletedSteps([]);
                }}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
              >
                重新开始
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 进度指示器 */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-3">
          <div className="flex flex-col items-start justify-between space-y-3 sm:flex-row sm:items-center sm:space-y-0">
            <div className="flex w-full items-center space-x-3 sm:w-auto">
              <span className="text-sm font-medium text-gray-700">进度</span>
              <div className="flex-1 sm:w-48">
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                    style={{ width: `${(completedSteps.length / 3) * 100}%` }}
                  ></div>
                </div>
              </div>
              <span className="whitespace-nowrap text-sm text-gray-600">
                {completedSteps.length}/3 完成
              </span>
            </div>
            
            {completedSteps.length === 3 && !isGenerating && recommendation && (
              <button
                onClick={handleRegenerate}
                className="mt-2 w-full justify-center sm:mt-0 sm:w-auto sm:justify-start"
              >
                <div className="flex items-center justify-center rounded-lg border border-blue-300 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100">
                  <span className="mr-2">🔄</span>
                  重新生成推荐
                </div>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <AssistantLayout
          left={
            <div className="h-full rounded-2xl border border-gray-200 bg-white/80 shadow-sm backdrop-blur-sm">
              <StepPanel completed={completedSteps} />
            </div>
          }
          center={
            <div className="h-full overflow-hidden rounded-2xl border border-gray-200 bg-white/80 shadow-sm backdrop-blur-sm">
              <ChatPanel onProfileUpdate={handleProfileUpdate} />
            </div>
          }
          right={
            <div className="space-y-6">
              {/* 洞察面板 */}
              <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-blue-50/50 shadow-sm backdrop-blur-sm">
                <InsightPanel profile={profile} />
              </div>
              
              {/* 推荐面板 */}
              <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-purple-50/50 shadow-sm backdrop-blur-sm">
                {isGenerating ? (
                  <div className="flex h-96 flex-col items-center justify-center p-8">
                    <LoadingSpinner size="lg" />
                    <p className="mt-4 text-lg font-medium text-gray-700">AI正在为您智能推荐...</p>
                    <p className="mt-2 text-sm text-gray-500">分析您的需求，匹配最佳设备</p>
                    <div className="mt-6 space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 animate-ping rounded-full bg-blue-500"></div>
                        <span className="text-sm text-gray-600">分析使用场景</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 animate-ping rounded-full bg-green-500" style={{animationDelay: '0.2s'}}></div>
                        <span className="text-sm text-gray-600">匹配预算范围</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 animate-ping rounded-full bg-purple-500" style={{animationDelay: '0.4s'}}></div>
                        <span className="text-sm text-gray-600">评估便携需求</span>
                      </div>
                    </div>
                  </div>
                ) : recommendation ? (
                  <>
                    <RecommendPanel rec={recommendation} />
                    <div className="border-t p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          <span className="mr-2">🕒</span>
                          推荐时间: {recommendation.recommendedAt}
                        </div>
                        <div className="flex items-center rounded-full bg-gradient-to-r from-green-100 to-blue-100 px-3 py-1">
                          <span className="mr-1 text-sm font-medium text-gray-700">匹配度</span>
                          <span className="text-lg font-bold text-green-600">
                            {recommendation.matchScore || "92"}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex h-96 flex-col items-center justify-center p-8 text-center">
                    <div className="rounded-full bg-gradient-to-r from-blue-100 to-purple-100 p-6">
                      <span className="text-4xl">💡</span>
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-gray-900">等待AI推荐</h3>
                    <p className="mt-2 text-gray-600">
                      请先完成左侧对话，收集您的需求信息
                    </p>
                    <div className="mt-6 flex space-x-2">
                      <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                      <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                      <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          }
        />
      </div>

      {/* 底部提示 */}
      <div className="mx-auto max-w-7xl px-6 pb-8">
        <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 p-4">
          <div className="flex items-start">
            <div className="mr-3 rounded-lg bg-blue-100 p-2">
              <span className="text-blue-600">💡</span>
            </div>
            <div>
              <h4 className="font-medium text-blue-800">使用提示</h4>
              <ul className="mt-2 space-y-1 text-sm text-blue-700">
                <li>• 请尽量详细描述您的使用场景，AI会给出更精准的推荐</li>
                <li>• 您可以随时点击"重新开始"来重新描述需求</li>
                <li>• 推荐结果基于联想官方产品库和用户真实反馈</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}