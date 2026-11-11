const ALLOWED_ORIGINS = new Set([
  'https://f-duck.github.io',
  'https://carddex-pokemon.luminousmeadow.chatgpt.site',
  'http://127.0.0.1:4199',
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
      return json(request, { ok: true, provider: 'pokemontcgapi.com', recognitionConfigured: Boolean(env.PTCG_API_KEY) });
    }

    if (url.pathname !== '/api/identify' || request.method !== 'POST') return json(request, { error: 'NOT_FOUND' }, 404);
    if (!env.PTCG_API_KEY) return json(request, { error: 'RECOGNITION_NOT_CONFIGURED', message: 'La clé de reconnaissance n’est pas encore configurée.' }, 503);

    const incoming = await request.formData();
    const image = incoming.get('image');
    if (!(image instanceof File)) return json(request, { error: 'IMAGE_REQUIRED' }, 400);
    if (image.size > 10 * 1024 * 1024) return json(request, { error: 'IMAGE_TOO_LARGE' }, 413);

    const form = new FormData();
    form.set('image', image, image.name || 'card.jpg');
    form.set('top_k', '3');
    form.set('include', 'index');
    const upstream = await fetch('https://api.pokemontcgapi.com/v1/vision/identify', {
      method: 'POST',
      headers: { 'X-Api-Key': env.PTCG_API_KEY },
      body: form,
    });
    const payload = await upstream.json();
    return json(request, payload, upstream.status);
  },
};
