import type { APIContext } from 'astro'
import { SITE, PACKAGES, ADD_ONS, FAQS } from '../../lib/config'

const SYSTEM_PROMPT = `You are the AI assistant for ${SITE.name}, a wedding floral and event design studio in ${SITE.location}.

IMPORTANT: This is a fictional demo business created by Upstate Web Co to showcase what a modern wedding florist website can do. If asked, clarify this is a portfolio demonstration — not a real business. All names and details are fictional.

=== FLORAL PACKAGES ===
${PACKAGES.map(p => `- ${p.name}: ${p.price}${p.popular ? ' [MOST POPULAR]' : ''} — ${p.description}`).join('\n')}
All packages include setup and teardown. Every package is a starting point — we customize everything around your vision, venue, and budget.

=== ADD-ON SERVICES ===
${ADD_ONS.map(a => `- ${a.name}: ${a.price} — ${a.description}`).join('\n')}

=== FREQUENTLY ASKED QUESTIONS ===
${FAQS.map(f => `Q: ${f.q}\nA: ${f.a}`).join('\n\n')}

=== SERVICE AREA ===
- Based in Greenville, SC
- Serves the entire Upstate SC, Asheville NC, and north Georgia
- Travel fees apply for venues more than 45 minutes from Greenville
- We visit every venue before the wedding to plan installations and logistics

=== BOOKING & TIMELINE ===
- Book 8-12 months in advance for peak season (April through October)
- Limited number of weddings per weekend to give each couple full attention
- Off-season (November-March) may have shorter booking windows
- Process: inquiry form → consultation call → proposal → signed contract with 30% deposit
- Remaining balance due 30 days before the wedding

=== FLORAL PHILOSOPHY ===
- We source locally when possible and supplement with premium wholesalers
- Seasonal blooms mean your flowers are at their most beautiful and most affordable
- We work with your color palette, venue aesthetic, and personal style
- No two weddings look the same — everything is designed specifically for you

=== NON-WEDDING EVENTS ===
- Also available for: corporate events, galas, showers, milestone celebrations, and proposals
- Fill out the inquiry form and select your event type for a custom quote

=== CONTACT ===
- Email: ${SITE.email}
- Phone: ${SITE.phone}
- Location: ${SITE.location}
- Best way to start: Fill out the inquiry form on the website — we respond within 48 hours

=== WHAT YOU CAN DO ===
- Answer questions about packages, pricing ranges, add-on services, and what's included.
- Help couples understand the booking process and timeline.
- Describe the floral design philosophy and what to expect.
- Answer FAQs about service area, seasonal flowers, and event types.

=== WHAT YOU CANNOT DO ===
- Confirm availability for specific dates.
- Provide exact final pricing (depends on customizations, venue, and flower choices).
- Book or schedule consultations directly.
- Process payments or deposits.
- Make guarantees about specific flower availability (seasonal).

TONE: Be warm, helpful, and romantic. Speak with excitement about weddings and florals. Keep answers to 2-3 sentences. For specific quotes or date availability, direct to the inquiry form.`

export async function POST({ request, locals }: APIContext) {
  try {
    const { message } = await request.json()
    if (!message) return Response.json({ reply: 'What can I help you with? Ask about packages, pricing, add-ons, seasonal flowers, or how to book!' })

    const env = (locals as Record<string, any>).runtime?.env
    const apiKey = env?.ANTHROPIC_API_KEY

    if (!apiKey) {
      const lower = message.toLowerCase()
      if (lower.includes('price') || lower.includes('cost') || lower.includes('how much') || lower.includes('budget') || lower.includes('afford'))
        return Response.json({ reply: `Our packages start at $1,500 (Petite) for intimate ceremonies, $3,500 (Garden — most popular) for full ceremony + reception florals including up to 10 centerpieces, and $6,000 (Estate) for complete venue design with custom installations. Everything is customized to your vision, venue, and budget!` })
      if (lower.includes('package') || lower.includes('what\'s included') || lower.includes('include') || lower.includes('option'))
        return Response.json({ reply: `We have three packages: Petite ($1,500+) covers bridal bouquet, boutonniere, 2 bridesmaid bouquets, and altar arrangement. Garden ($3,500+, most popular) adds centerpieces, ceremony arch, aisle markers, and welcome sign. Estate ($6,000+) is full venue design — ceremony, reception, hanging arrangements, cocktail hour, cake flowers, and all personal flowers. All include setup and teardown!` })
      if (lower.includes('petite') || lower.includes('small') || lower.includes('intimate') || lower.includes('elope') || lower.includes('simple'))
        return Response.json({ reply: `The Petite package starts at $1,500 — perfect for intimate ceremonies. It includes a bridal bouquet, groom's boutonniere, 2 bridesmaid bouquets, and an altar arrangement. Beautiful and focused on the essentials!` })
      if (lower.includes('garden') || lower.includes('popular') || lower.includes('recommend') || lower.includes('most'))
        return Response.json({ reply: `The Garden package ($3,500+) is our most popular! It includes everything in Petite plus centerpieces for up to 10 tables, ceremony arch florals, aisle markers, and a welcome sign arrangement. It's the sweet spot for full ceremony and reception coverage.` })
      if (lower.includes('estate') || lower.includes('full') || lower.includes('luxury') || lower.includes('big') || lower.includes('everything'))
        return Response.json({ reply: `The Estate package ($6,000+) is our complete venue design experience — custom installations, hanging arrangements, cocktail hour florals, cake flowers, all personal flowers, plus everything in ceremony and reception. For couples who want every detail covered.` })
      if (lower.includes('add-on') || lower.includes('extra') || lower.includes('additional') || lower.includes('more'))
        return Response.json({ reply: `We offer several add-ons: photography referrals (free), day-of coordination ($800+), rehearsal dinner florals ($400+), welcome bags ($15/bag), flower preservation ($250+), and proposal setups ($500+). Mix and match to build your perfect package!` })
      if (lower.includes('book') || lower.includes('available') || lower.includes('date') || lower.includes('reserve') || lower.includes('how to start'))
        return Response.json({ reply: `We recommend booking 8-12 months in advance, especially for peak season (April-October). We take a limited number of weddings per weekend to give each couple our full attention. Fill out the inquiry form with your date and we'll check availability and set up a consultation!` })
      if (lower.includes('travel') || lower.includes('where') || lower.includes('area') || lower.includes('far') || lower.includes('asheville') || lower.includes('georgia'))
        return Response.json({ reply: `We're based in Greenville, SC and serve the entire Upstate, Asheville NC, and north Georgia. We visit every venue beforehand to plan installations. Travel fees apply for venues more than 45 minutes from Greenville.` })
      if (lower.includes('photo') || lower.includes('photographer') || lower.includes('picture'))
        return Response.json({ reply: `We partner with 3 local wedding photographers and coordinate blooms and lighting for cohesive photos. The referral is completely free! Let us know if you'd like photographer recommendations when you fill out the inquiry form.` })
      if (lower.includes('coordinat') || lower.includes('day of') || lower.includes('day-of') || lower.includes('planner'))
        return Response.json({ reply: `We offer day-of coordination starting at $800 as an add-on. We manage all vendor arrivals, timeline, and setup so you can focus on getting married. It's a popular add-on for couples who don't have a separate planner.` })
      if (lower.includes('preserv') || lower.includes('keep') || lower.includes('save') || lower.includes('frame') || lower.includes('press'))
        return Response.json({ reply: `We offer flower preservation starting at $250 — we press and frame blooms from your bouquet as a beautiful keepsake. It's ready 4-6 weeks after your wedding. A lovely way to keep a piece of your day forever!` })
      if (lower.includes('proposal') || lower.includes('propose') || lower.includes('engagement'))
        return Response.json({ reply: `We create intimate floral installations for proposals starting at $500 — arches, petal paths, or garden setups at your chosen location. Fill out the inquiry form with details about what you're envisioning and we'll make it magical!` })
      if (lower.includes('season') || lower.includes('flower type') || lower.includes('what flower') || lower.includes('bloom') || lower.includes('rose') || lower.includes('peony'))
        return Response.json({ reply: `We work with seasonal blooms — which means your flowers are at their most beautiful and most affordable. We source locally when possible and supplement with premium wholesalers. During your consultation, we'll discuss what's in season for your date and build the design around your color palette.` })
      if (lower.includes('non-wedding') || lower.includes('corporate') || lower.includes('gala') || lower.includes('shower') || lower.includes('not a wedding') || lower.includes('other event'))
        return Response.json({ reply: `Yes, we do non-wedding events too! Corporate events, galas, showers, and milestone celebrations. Fill out the inquiry form and select your event type — we'll put together a custom proposal based on your venue and vision.` })
      if (lower.includes('after') || lower.includes('leftover') || lower.includes('take home') || lower.includes('what happens'))
        return Response.json({ reply: `Guests are welcome to take centerpieces home after the reception! We also offer flower preservation as an add-on ($250+) — we'll press and frame pieces from your bouquet as a keepsake. Setup and teardown are included in all packages.` })
      if (lower.includes('deposit') || lower.includes('payment') || lower.includes('when to pay') || lower.includes('contract'))
        return Response.json({ reply: `After your consultation, we send a custom proposal. Once you're ready, we lock in your date with a signed contract and a 30% deposit. The remaining balance is due 30 days before your wedding.` })
      if (lower.includes('demo') || lower.includes('real') || lower.includes('fake') || lower.includes('portfolio') || lower.includes('upstate'))
        return Response.json({ reply: `Great question! This is a fictional demo business created by Upstate Web Co to showcase what a modern wedding florist website can do. All names and details are illustrative — but the website technology is very real!` })
      if (lower.includes('rehearsal') || lower.includes('dinner'))
        return Response.json({ reply: `We offer rehearsal dinner florals starting at $400 — table arrangements and entrance pieces for your rehearsal venue. A beautiful way to set the tone for the whole wedding weekend!` })
      if (lower.includes('welcome') || lower.includes('bag') || lower.includes('gift'))
        return Response.json({ reply: `Our welcome bags are $15/bag — curated with local treats, personal notes, and a pressed flower from your wedding palette. A lovely touch for out-of-town guests staying at hotels!` })
      return Response.json({ reply: `I'd love to help! Ask about our floral packages, add-on services, pricing, seasonal flowers, the booking process, or our service area. For a custom quote, fill out the inquiry form and we'll respond within 48 hours!` })
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 256, system: SYSTEM_PROMPT, messages: [{ role: 'user', content: message }] }),
    })
    const data = await response.json() as { content?: { text: string }[] }
    return Response.json({ reply: data.content?.[0]?.text || 'I\'m not sure — email us at ' + SITE.email + ' and we\'ll help!' })
  } catch { return Response.json({ reply: 'Something went wrong. Email us at ' + SITE.email + '!' }) }
}
