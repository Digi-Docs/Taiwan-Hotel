# Taiwan Hotel Mwanza — Site Update Log

Drop every file in this package into the site root and redeploy (flat structure — no subfolders). This package is self-contained.

## Real photos are now in place
Every image the code references now points to a real, processed photo — the logo, gym, rooftop pool, reception (desk + a staff-assisting-guest shot), garden walkway, lounge seating, entrance corridor, a guest-room detail shot, and the restaurant dish spread you supplied. Nothing renders as a broken image icon anywhere on the site.

- All photos were colour/contrast-balanced and cropped to the exact dimensions each slot needs, so nothing stretches or letterboxes.
- No single page repeats the same source photo twice (the one deliberate exception: the homepage hero and the "Swimming Pool" amenity card both use the rooftop pool photo, but in two different crops — wide/signage for the hero, tighter on the water for the card).
- Filenames that didn't match their real content (e.g. a file called "exterior-facade" that was never actually a building exterior) were renamed to something accurate, and alt text sitewide was rewritten to honestly describe what's actually in each photo — including softening two Events-page captions ("Taiwan Hall" and "Conference Room") so the copy doesn't overclaim what a corridor/reception photo can show.

## Hero section rebuilt
The homepage hero previously pointed at a video file and poster image that didn't exist in the package. It's now a professional, fully looping **photo slideshow** — five of the hotel's best shots (rooftop pool, lounge, gym, garden entrance, reception) cross-fading into one another with a slow cinematic zoom on each, pure CSS (no JavaScript dependency, so it always runs), respects "reduce motion" accessibility settings by freezing on the first photo, and uses `fetchpriority="high"` on the first slide only so page-load speed isn't affected.

## Premium "glass" card system
Every card on the site — room cards, venue cards, dish cards, testimonial cards, the "what's included" tiles, the booking widget, the contact form panel, and the closing call-to-action panel — now shares one cohesive frosted-glass treatment: soft translucency with backdrop blur, a fine light border, layered soft shadows, generously rounded corners (bumped the whole site's corner radius from a sharp 4px to a premium 1.1rem), and a thin gold-to-burgundy accent line on room/venue/dish cards. Hover states lift and scale slightly with a warmer shadow for a more tactile, premium feel. Form inputs and the booking-bar fields keep a smaller, crisper radius so they don't look like pills.

## Fixed a real video bug
The Deluxe room video's opening frame was a blurry, upside-down close-up of the logo embroidery. Trimmed the clip to start ~2.2s in, on a clean establishing shot (bed, wardrobe, AC unit) that matches its poster. Single, Twin, Triple and Double were checked frame-by-frame and were already clean — no changes needed there.

## Logo, favicon, and header fix
- Full favicon set generated from your logo: `favicon.ico` (multi-resolution), 16/32/48px PNGs, `apple-touch-icon.png`, Android Chrome 192/512px icons, and `site.webmanifest` — wired into all 8 pages.
- Found and fixed a real bug: the header/footer logo `<img>` was a rectangular logo-plus-tagline file being forced into a circular CSS mask, which cropped off the tagline. It's now a clean square "TH" emblem (transparent PNG) that fills its circular badge properly — used consistently across the nav, footer, and as the Schema.org `logo` field (a square mark is also what Google's structured-data guidelines actually prefer).
- Built a proper branded `og-rooms.jpg` (1200×630) for the Rooms page's social-share preview, composited from your logo and a room photo.

## Language toggle
Ran a full audit: every `data-i18n` key used in the HTML has a matching Swahili entry in `i18n.js` (281 entries, zero gaps), and confirmed "Taiwan Hotel" and all five room names (Single/Twin/Triple/Double/Deluxe Room) are never inside a translated string — they stay fixed in both languages, including on the two pages below.

## Added the two missing pages
`404.html` and `thank-you.html` were referenced (the contact form's `action` and Netlify's default error-page convention both depend on them) but weren't in the package — added both, on-brand, with the language toggle and full nav/footer, and matching `i18n.js` entries.

## Netlify forms — re-verified
Only one real Netlify form (`contact.html`'s enquiry form). Confirmed: hidden `form-name` matches the `<form name="enquiry">` attribute; honeypot field name matches `netlify-honeypot="bot-field"`; every submitted field — including the ones synced from the date pickers and guest selector — has a real static `name=` attribute for Netlify's build-time scanner. `action="/thank-you.html"` is a genuine no-JS fallback; the homepage's "quick check" bar is a plain GET redirect and correctly carries no `data-netlify` attribute.

## SEO
- Unique, length-checked title tags (all ≤ 56 chars) and meta descriptions (all ≤ 155 chars) on every page.
- `canonical` / `og:url` verified to match on every page, including the two new pages.
- All JSON-LD validated as parseable JSON: `Hotel` schema (homepage), `BreadcrumbList` (every subpage), `HotelRoom` × 5 (Rooms page).
- `sitemap.xml` image entries repointed to the real, renamed image files with today's date.
- `netlify.toml` now also sets cache headers for `.ico` and `.webmanifest`.

**Still outside this package's control:** actual Google Search Console verification/submission, and a confirmed review count for `aggregateRating` (see `SEO_Package.md`).
