const ALLOWED_ORIGINS = new Set([
  'https://f-duck.github.io',
  'https://carddex-pokemon.luminousmeadow.chatgpt.site',
  'http://127.0.0.1:4199',
  'http://localhost:4199',
]);

function corsHeaders(request) {
  const origin = request.headers.get('Origin');
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.has(origin) ? origin : 'null',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}

function json(request, body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...corsHeaders(request) },
  });
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders(request) });
    const url = new URL(request.url);

    if (url.pathname === '/api/status' && request.method === 'GET') {
      return json(request, { ok: true, provider: 'tcgdex.net', recognition: 'local-ocr', ai: 'disabled', billableCalls: 0 });
    }
    return json(request, { error: 'NOT_FOUND', message: 'La reconnaissance distante est désactivée. Le scanner gratuit local utilise Tesseract.js et TCGdex.' }, 404);
  },
};
