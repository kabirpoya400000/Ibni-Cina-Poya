import { GoogleGenAI, Type, Modality } from '@google/genai';

// استفاده از کلید API محیط AI Studio یا کلید محلی/Vercel
const apiKey = process.env.GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyDuksTPL0hMGZI5fTrlY1oLpVRTzxjOmqY';
const ai = new GoogleGenAI({ apiKey });

export async function* chatWithHakimStream(history: any[], message: string) {
  const fullPrompt = `تاریخچه گفتگو:\n${history.map(m => `${m.role === 'user' ? 'بیمار' : 'حکیم'}: ${m.text}`).join('\n')}\n\nبیمار: ${message}`;
  
  const responseStream = await ai.models.generateContentStream({
    model: 'gemini-3.1-pro-preview',
    contents: fullPrompt,
    config: {
      systemInstruction: `شما حکیم ابن سینا، دانشمند و طبیب بزرگ هستید. با لحنی بسیار دلسوزانه، پدرانه (مانند خطاب کردن با واژه 'فرزندم')، حکیمانه و تاریخی پاسخ دهید.
پاسخ‌های شما باید بسیار جامع، دقیق، مفصل و ساختاریافته باشد.
در پاسخ به هر بیماری یا مشکل، حتماً موارد زیر را رعایت کنید:
۱. همدلی و ریشه‌یابی: ابتدا با کاربر همدلی کنید (با اشاره به پیوندهای فرهنگی و تاریخی مانند خراسان بزرگ در صورت نیاز) و سپس ریشه بیماری را بر اساس طب اخلاطی (غلبه دم، صفرا، بلغم یا سودا) به زبان ساده و علمی توضیح دهید.
۲. اصلاح تغذیه (پرهیزات و توصیه‌ها): پرهیزات غذایی دقیق (غذاهایی که باید ترک شوند) و توصیه‌های غذایی مناسب مزاج بیمار را به روشنی بیان کنید.
۳. نسخه‌های خانگی و ایمن: نسخه‌های گیاهی خانگی، ایمن و در دسترس را با ذکر دقیق نحوه ترکیب و مصرف (مانند استفاده از مصلح‌ها و بدرقه‌ها مثل سرکه یا عسل) تجویز کنید.
۴. هشدارها: در صورت نیاز به گیاهان قوی‌تر یا سمی، حتماً هشدارهای لازم برای اصلاح (گرفتن زهر گیاه) را ذکر کنید و تاکید کنید که بدون نظارت طبیب حاذق استفاده نشوند.
از کلمات اصیل فارسی و اصطلاحات طب سنتی استفاده کنید و هرگز پاسخ‌های کوتاه ندهید؛ بلکه مانند یک طبیب دلسوز که برای بیمارش وقت می‌گذارد، پاسخی کامل و راهگشا ارائه کنید.`,
    }
  });

  for await (const chunk of responseStream) {
    yield chunk.text;
  }
}

export async function generateHakimVoice(text: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: text,
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Zephyr' },
        },
      },
    },
  });
  return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
}

export async function generateInventionFormula(plantName: string, goal: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Plant: ${plantName}\nGoal: ${goal}\nGenerate a botanical extraction formula in Persian.`,
    config: {
      systemInstruction: 'You are an expert alchemist and botanist. Generate a structured formula in Persian for extracting and preparing the given plant for the given therapeutic goal. Provide a simple home method and an advanced laboratory method. Also provide p5.js code to visualize the extraction process (e.g., particles, boiling flask, molecular structures). The p5.js code should ONLY contain the JavaScript code (setup and draw functions), no HTML or markdown formatting.',
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          simple: {
            type: Type.OBJECT,
            properties: {
              materials: { type: Type.ARRAY, items: { type: Type.STRING } },
              tools: { type: Type.ARRAY, items: { type: Type.STRING } },
              steps: { type: Type.ARRAY, items: { type: Type.STRING } },
              safety: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ['materials', 'tools', 'steps', 'safety']
          },
          advanced: {
            type: Type.OBJECT,
            properties: {
              materials: { type: Type.ARRAY, items: { type: Type.STRING } },
              tools: { type: Type.ARRAY, items: { type: Type.STRING } },
              steps: { type: Type.ARRAY, items: { type: Type.STRING } },
              safety: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ['materials', 'tools', 'steps', 'safety']
          },
          p5Code: { type: Type.STRING, description: 'Raw p5.js code (setup and draw functions) to visualize the process. Assume a 400x400 canvas.' }
        },
        required: ['title', 'description', 'simple', 'advanced', 'p5Code']
      }
    }
  });
  
  return JSON.parse(response.text);
}
