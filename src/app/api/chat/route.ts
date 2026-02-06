// /api/chat/route.ts - 修复后的完整代码
import { NextResponse } from "next/server";

// 系统提示词
const SYSTEM_PROMPT = `你是联想AIPC专业购机助手。通过友好对话收集用户需求：

**需要收集的信息：**
1. 使用场景（如：AI开发、视频剪辑、3D建模、游戏、办公、编程等）
2. 预算范围（如：5k-8k、8k-12k、12k-15k、15k以上）
3. 便携性需求（经常携带、偶尔移动、基本固定）

**对话规则：**
1. 每次只问一个问题，循序渐进
2. 保持友好、热情、专业的语气
3. 如果用户没说清楚，礼貌地追问
4. 收集完所有信息后，表示将生成推荐

**回复格式必须是JSON：**
{
  "reply": "你的对话回复",
  "profile": {
    "useCase": ["场景1", "场景2"],
    "budget": "预算范围",
    "mobility": "便携性"
  },
  "step": 1/2/3/4,
  "completed": false/true
}

**步骤说明：**
- step=1: 收集使用场景
- step=2: 收集预算范围  
- step=3: 收集便携性需求
- step=4: 所有信息收集完成

现在开始对话吧！`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, context } = body;

    // 使用 fetch 调用大模型 API
    const API_KEY = process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY;
    const API_URL = process.env.DEEPSEEK_API_URL || "https://api.openai.com/v1/chat/completions";
    
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...(context?.history || []),
      { role: "user", content: message }
    ];

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.DEEPSEEK_API_KEY ? "deepseek-chat" : "gpt-3.5-turbo",
        messages,
        temperature: 0.7,
        max_tokens: 500,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API错误详情:", errorText);
      throw new Error(`API调用失败: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // 解析JSON
    let result;
    try {
      result = JSON.parse(content);
    } catch (parseError) {
      console.error("JSON解析失败:", content);
      // 如果返回的不是JSON，使用默认值
      result = {
        reply: content,
        profile: context?.profile || {},
        step: context?.step || 1,
        completed: false
      };
    }

    // 确保必要字段存在
    result.profile = result.profile || context?.profile || {};
    result.step = result.step || context?.step || 1;
    result.completed = result.completed || false;

    return NextResponse.json(result);

  } catch (error) {
    console.error("大模型调用失败:", error);
    
    // 降级：简单规则引擎
    return await simpleRuleEngine(req);
  }
}

// 简单的降级规则引擎
async function simpleRuleEngine(req: Request) {
  try {
    const body = await req.json();
    const { message, context = {} } = body; // ✅ 修复：给 context 默认值
    
    let profile = context.profile || {};
    let step = context.step || 1;
    let reply = "";
    
    if (step === 1) {
      const scenarios = [];
      if (message.includes("AI") || message.includes("人工智能")) scenarios.push("AI开发");
      if (message.includes("视频") || message.includes("剪辑")) scenarios.push("视频剪辑");
      if (message.includes("办公") || message.includes("文档")) scenarios.push("日常办公");
      if (message.includes("游戏") || message.includes("电竞")) scenarios.push("游戏娱乐");
      if (message.includes("编程") || message.includes("代码")) scenarios.push("编程开发");
      if (message.includes("设计") || message.includes("3D")) scenarios.push("设计创作");
      
      if (scenarios.length > 0) {
        profile.useCase = scenarios;
        step = 2;
        reply = `好的，您的使用场景是：${scenarios.join("、")}。\n\n请问您的预算范围是多少？（例如：5k-8k、8k-12k、12k-15k、15k以上）`;
      } else {
        reply = "请说说您的使用场景，比如：AI开发、视频剪辑、游戏娱乐、日常办公等。";
      }
    } 
    else if (step === 2) {
      let budget = "";
      if (message.includes("5k") || message.includes("5千") || message.includes("五千") || message.includes("5000")) {
        budget = "5k-8k";
      } else if (message.includes("8k") || message.includes("8千") || message.includes("八千") || message.includes("8000") || message.includes("1万以内")) {
        budget = "8k-12k";
      } else if (message.includes("12k") || message.includes("1.2万") || message.includes("一万二") || message.includes("12000")) {
        budget = "12k-15k";
      } else if (message.includes("15k") || message.includes("1.5万") || message.includes("一万五") || message.includes("15000") || message.includes("以上")) {
        budget = "15k以上";
      }
      
      if (budget) {
        profile.budget = budget;
        step = 3;
        reply = `预算设定为：${budget}。\n\n请问您对笔记本的便携性有什么要求？（经常携带/偶尔移动/基本固定）`;
      } else {
        reply = "请告诉我您的预算范围，比如：5k-8k、8k-12k、12k-15k、15k以上";
      }
    }
    else if (step === 3) {
      let mobility = "";
      if (message.includes("经常") || message.includes("天天") || message.includes("每天") || message.includes("通勤") || message.includes("随身")) {
        mobility = "经常携带";
      } else if (message.includes("偶尔") || message.includes("有时") || message.includes("出差") || message.includes("移动")) {
        mobility = "偶尔移动";
      } else if (message.includes("固定") || message.includes("台式") || message.includes("不移动") || message.includes("放家里")) {
        mobility = "基本固定";
      }
      
      if (mobility) {
        profile.mobility = mobility;
        step = 4;
        reply = `了解，便携性需求：${mobility}。\n\n✅ 所有信息已收集完成！正在为您推荐最适合的AIPC...`;
      } else {
        reply = "请说明对便携性的要求：\n1. 经常携带（天天带出门）\n2. 偶尔移动（偶尔带出门）\n3. 基本固定（很少移动）";
      }
    }
    else {
      reply = "正在为您智能推荐最适合的AIPC设备，请稍候...";
    }

    return NextResponse.json({
      reply,
      profile,
      step,
      completed: step === 4
    });
    
  } catch (error) {
    console.error("规则引擎也失败了:", error);
    
    // 最后的安全网
    return NextResponse.json({
      reply: "抱歉，服务暂时不可用。请描述您的需求，我会尽力为您推荐合适的AIPC。",
      profile: {},
      step: 1,
      completed: false
    });
  }
}