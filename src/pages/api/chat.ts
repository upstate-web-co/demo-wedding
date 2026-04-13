import type { APIContext } from 'astro'
import { SITE, PACKAGES, ADD_ONS, FAQS } from '../../lib/config'

const SYSTEM_PROMPT = `You are the AI assistant for ${SITE.name}, a wedding floral and event design studio in ${SITE.location}.

PACKAGES:
${PACKAGES.map(p => `- ${p.name}: ${p.price} — ${p.description}`).join('\n')}

ADD-ON SERVICES:
${ADD_ONS.map(a => `- ${a.name}: ${a.price} — ${a.description}`).join('\n')}

FAQS:
${FAQS.map(f => `Q: ${f.q}\nA: ${f.a}`).join('\n\n')}

DETAILS:
- Based in Greenville SC, serves Upstate SC, Asheville, north GA
- Book 8-12 months in advance for peak season (Apr-Oct)
- All packages include setup and teardown
- Uses seasonal blooms, sources locally when possible
- Contact: ${SITE.email}, ${SITE.phone}

RULES: Be warm, helpful, romantic. Keep answers 2-3 sentences. For specific quotes, direct to the inquiry form.`

export async function POST({ request, locals }: APIContext) {
  try {
    const { message } = await request.json()
    if (!message) return Response.json({ reply: 'What can I help you with?' })

    const env = (locals as Record<string, any>).runtime?.env
    const apiKey = env?.ANTHROPIC_API_KEY

    if (!apiKey) {
      const lower = message.toLowerCase()
      if (lower.includes('price') || lower.includes('cost') || lower.includes('package')) return Response.json({ reply: `Our packages start at $1,500 (Petite) for intimate ceremonies, $3,500 (Garden, most popular) for full ceremony + reception, and $6,000 (Estate) for complete venue design. Everything is customized to your vision!` })
      if (lower.includes('book') || lower.includes('available') || lower.includes('date')) return Response.json({ reply: `We recommend booking 8-12 months in advance, especially for peak season (April-October). Fill out the inquiry form with your date and we'll check availability!` })
      if (lower.includes('travel') || lower.includes('where')) return Response.json({ reply: `We're based in Greenville SC and serve the entire Upstate, Asheville NC, and north Georgia. Travel fees apply for venues over 45 minutes away.` })
      if (lower.includes('photo') || lower.includes('add-on') || lower.includes('coordination')) return Response.json({ reply: `We offer several add-ons: photography referrals (free), day-of coordination ($800+), rehearsal dinner florals ($400+), welcome bags ($15/bag), flower preservation ($250+), and proposal setups ($500+).` })
      return Response.json({ reply: `I'd love to help! Ask about our packages, availability, add-on services, or what's in season. For a custom quote, fill out the inquiry form and we'll respond within 48 hours.` })
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 256, system: SYSTEM_PROMPT, messages: [{ role: 'user', content: message }] }),
    })
    const data = await response.json() as { content?: { text: string }[] }
    return Response.json({ reply: data.content?.[0]?.text || 'I\'m not sure — email us at ' + SITE.email })
  } catch { return Response.json({ reply: 'Something went wrong. Email us at ' + SITE.email + '!' }) }
}
