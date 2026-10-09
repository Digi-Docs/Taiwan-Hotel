# Taiwan Hotel Mwanza - SEO Launch Package

Brand: Taiwan Hotel | Location: Mwanza, Tanzania | Positioning: Affordable comfort, rates quoted on request (confidential) | Audience: business travellers, tourists, local event bookers

---

## FILE 1 - Metadata & Page-Level Architecture Matrix

| Page | URL Slug | Title Tag (<=60 char) | Meta Description (<=160 char) | H1 | Key H2s |
|---|---|---|---|---|---|
| Home | `/` | Taiwan Hotel Mwanza \| Boutique Hotel in Mwanza, Tanzania | Taiwan Hotel Mwanza offers comfortable rooms, a rooftop gym, garden courtyards and warm Tanzanian hospitality. Book your stay today. | Taiwan Hotel - Your Home Away From Home | Mwanza's Finest Hotel Experience | Built on Tanzanian Hospitality | Amenities & Services | Rest Easy, In Style | What Our Guests Say |
| Rooms | `/rooms.html` | Rooms & Suites \| Taiwan Hotel Mwanza | Tour our Single, Twin, Triple, Double and Deluxe rooms at Taiwan Hotel Mwanza - en-suite bathrooms, canopy netting and free Wi-Fi throughout. | Rest Easy, In Style | Single Room | Twin Room | Triple Room | Double Room | Deluxe Room | What Every Room Comes With |
| Dining | `/dining.html` | Dining \| Taiwan Hotel Mwanza | Restaurant, bar and lounge dining at Taiwan Hotel Mwanza - local and international dishes in a relaxed, welcoming setting. | Dine, Relax & Celebrate | Local & International Dishes | Bar & Lounge | Private Dining |
| Events | `/events.html` | Events & Meetings \| Taiwan Hotel Mwanza | Host weddings, conferences and celebrations at Taiwan Hotel Mwanza - flexible spaces with catering and set-up handled for you. | Host Your Next Event With Us | Conference Room | Private Celebrations | Garden Ceremony |
| Amenities | `/amenities.html` | Amenities & Services \| Taiwan Hotel Mwanza | Gym, garden courtyards, 24/7 reception and airport shuttle - see every amenity included at Taiwan Hotel Mwanza. | Amenities & Services | Fitness Gym | 24/7 Reception & Security | Airport Shuttle | Garden Courtyards |
| Contact | `/contact.html` | Contact & Location \| Taiwan Hotel Mwanza | Contact Taiwan Hotel Mwanza for bookings, dining, and event enquiries. Find our location and get directions on Google Maps. | Send Us a Message | You're Always Welcome Here |

---

## FILE 2 - On-Page Content Foundations (Home, first ~100 words)

> Since 2018, **Taiwan Hotel** has been the place Mwanza travellers come back to - again and again. Tucked right in the heart of **Mwanza, Tanzania**, we pair comfortable, en-suite rooms with a **rooftop fitness gym**, quiet **garden courtyards**, and a front desk staffed **24 hours a day**, every day of the year. Whether you're in town on business, hosting a small celebration, or simply passing through the lake city, our team looks after the details so you feel cared for from the moment you arrive - genuinely your home away from home.

---

## FILE 3a - Room Tour Video Assets

Portrait room tours (1080x1440 source) re-encoded for web: 720px wide, H.264, no audio, faststart, ~1-1.8 MB each. Each has a matching poster frame so the card renders instantly before the video loads.

| Room | Video | Poster |
|---|---|---|
| Single Room | `room-single.mp4` | `room-single-poster.jpg` |
| Twin Room | `room-twin.mp4` | `room-twin-poster.jpg` |
| Triple Room | `room-triple.mp4` | `room-triple-poster.jpg` |
| Double Room | `room-double.mp4` | `room-double-poster.jpg` |
| Deluxe Room | `room-deluxe.mp4` | `room-deluxe-poster.jpg` |

Videos use `preload="none"` and only download when scrolled into view, so the Rooms page stays light on mobile data.

**Pricing policy:** no nightly rates are published anywhere on the site or in structured data. Every room block reads "Rates: On request" and routes to the enquiry form or WhatsApp.

---

## FILE 3 - Media & Asset Optimization File

Format: optimized JPEG. Naming: lowercase, hyphenated, descriptive, includes brand + location where natural.

| Asset | Filename | Alt Text |
|---|---|---|
| Hero exterior (dusk) | `hotel-taiwan-mwanza-exterior-facade.jpg` | Taiwan Hotel Mwanza glass-fronted exterior at dusk with national flags along the entrance |
| Reception | `hotel-taiwan-mwanza-reception-lobby.jpg` | 24-hour reception desk at Taiwan Hotel Mwanza with ambient lighting |
| Lounge | `hotel-taiwan-mwanza-lounge-seating-area.jpg` | Guest lounge with brown leather sofas and artwork at Taiwan Hotel Mwanza |
| Double room still | `room-double-poster.jpg` | Double Room four-poster bed with canopy netting and lakeside artwork at Taiwan Hotel Mwanza |
| Gym | `hotel-taiwan-mwanza-fitness-gym.jpg` | Fully equipped Taiwan Hotel gym with free weights and cardio machines |
| Garden walkway | `hotel-taiwan-mwanza-garden-walkway.jpg` | Garden walkway lined with roses and greenery at Taiwan Hotel Mwanza entrance |
| Corridor | `hotel-taiwan-mwanza-corridor-plants.jpg` | Warmly lit entrance corridor at Taiwan Hotel Mwanza with a luggage trolley and potted plants |
| Logo | `taiwan-hotel-logo.jpg` | Taiwan Hotel logo - Your Home Away From Home |

Rule of thumb: alt text describes the *scene*, not the filename; keep it under ~125 characters; never keyword-stuff (one natural mention of "Taiwan Hotel Mwanza" per page of images is enough).

---

## FILE 4 - Technical SEO Configuration

**`robots.txt`** *(already placed at site root - see `/robots.txt`)*
```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /*?*form-name=
Disallow: /*.json$

Sitemap: https://taiwanhotel.co.tz/sitemap.xml
```

**`sitemap.xml`** structure *(already placed at site root - see `/sitemap.xml`)*
```
/                 priority 1.0   weekly
/rooms.html       priority 0.9   weekly
/amenities.html   priority 0.8   monthly
/dining.html      priority 0.7   monthly
/events.html      priority 0.7   monthly
/contact.html     priority 0.6   yearly
```

---

## FILE 5 - Schema Markup Blueprint (JSON-LD)

Already embedded in `index.html` `<head>`; full block below for reuse/expansion (add `review` and `aggregateRating` once real review counts are confirmed):

```json
{
  "@context": "https://schema.org",
  "@type": "Hotel",
  "name": "Taiwan Hotel",
  "image": "https://taiwanhotel.co.tz/hotel-taiwan-mwanza-lounge-welcome.jpg",
  "url": "https://taiwanhotel.co.tz/",
  "telephone": "+255768684543",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "P.O. Box 10651",
    "addressLocality": "Mwanza",
    "addressCountry": "TZ"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -2.5425625,
    "longitude": 32.9989375
  },
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Free Wi-Fi", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Fitness Gym", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "24-hour Front Desk", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Airport Shuttle", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Restaurant", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Bar/Lounge", "value": true }
  ]
}
```

**Next step to activate rich results:** once you have a confirmed review count and average rating from Google Business Profile, add:
```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "4.7",
  "reviewCount": "42"
}
```

