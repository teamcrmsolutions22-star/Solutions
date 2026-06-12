import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

// === frame-ocr Edge Function ===
// POST { action?, image_url, prompt? } -> { ok, model, text }
// Прогоняет кадр (по публичному URL) через Groq Vision (бесплатные Llama-vision модели):
// описание экрана + OCR всего видимого текста. Воркер зовёт это для каждого кадра.
// Secret: GROQ_API_KEY (тот же, что у audio-transcribe). Модель: env GROQ_VISION_MODEL.

const GROQ_KEY = Deno.env.get('GROQ_API_KEY') ?? '';
const MODEL = Deno.env.get('GROQ_VISION_MODEL') || 'meta-llama/llama-4-scout-17b-16e-instruct';
const DEFAULT_PROMPT =
  'Опиши коротко, що показано на цьому кадрі (екран, інтерфейс, слайд), і ВИТЯГНИ ВЕСЬ видимий ' +
  'текст дослівно: назви полів, кнопки, заголовки, цифри, значення. Відповідай українською, стисло.';

Deno.serve(async (req) => {
  let body: any = {};
  try { body = await req.json(); } catch { /* none */ }
  if (body.action === 'ping') return Response.json({ ok: true, model: MODEL, key_set: GROQ_KEY.length > 0 });
  const url = body.image_url;
  if (!url) return Response.json({ ok: false, error: 'missing image_url' }, { status: 400 });
  if (!GROQ_KEY) return Response.json({ ok: false, error: 'GROQ_API_KEY not set' }, { status: 500 });
  try {
    const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${GROQ_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL, max_tokens: 600, temperature: 0.2,
        messages: [{ role: 'user', content: [
          { type: 'text', text: body.prompt || DEFAULT_PROMPT },
          { type: 'image_url', image_url: { url } },
        ] }],
      }),
    });
    const j = await r.json();
    if (!r.ok) return Response.json({ ok: false, model: MODEL, error: JSON.stringify(j).slice(0, 300) }, { status: 502 });
    return Response.json({ ok: true, model: MODEL, text: j.choices?.[0]?.message?.content ?? '' });
  } catch (e) {
    return Response.json({ ok: false, error: String(e) }, { status: 500 });
  }
});
