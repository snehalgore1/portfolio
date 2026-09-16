# Situational avatars

Drop your generated avatar images in this folder, then set the paths in
`src/data/portfolio.ts` → `avatars`. Until then, a branded "SG" placeholder shows.

## How to wire them up
In `src/data/portfolio.ts`:

```ts
export const avatars = {
  hero:    `${import.meta.env.BASE_URL}avatars/hero.png`,
  about:   `${import.meta.env.BASE_URL}avatars/about.png`,
  hobbies: `${import.meta.env.BASE_URL}avatars/hobbies.png`,
  footer:  `${import.meta.env.BASE_URL}avatars/footer.png`,
};
```

## Specs
- Square images, transparent or soft background. **512×512 px** is plenty.
- PNG (transparent) preferred; WebP is fine too. Keep each under ~300 KB.
- They render inside a circle, so keep the subject centered.

## Prompts (paste into Gemini / your image tool)
Keep the same character + soft matcha-and-honey palette across all four so they feel like a set.

**about.png** — "2D flat-illustrated avatar of a friendly South Asian woman
software engineer, short curly hair, happily holding a matcha latte, a small
honey-bear jar on the desk beside her, soft matcha-green and honey-yellow
palette, cream background, cute but clean, centered, square."

**hobbies.png** — "Same character, wearing a small hiking backpack, a tiny
mountain peak in the background (Santa Monica / Yosemite vibe), soft matcha and
honey palette, cheerful, centered, square."

**footer.png** — "Same character sitting down and gently petting a sweet dog,
warm and cozy, soft matcha and honey palette, cream background, centered, square."

**hero.png** (optional) — "Same character in a casual USC hoodie working at a
laptop, tiny glowing neural-network nodes floating around her like fireflies,
soft matcha and honey palette, centered, square." (Only used if you also add a
hero avatar slot.)
