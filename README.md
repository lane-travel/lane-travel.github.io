# Nathan Lane Travel

Personal travel agency website — Nathan Lane Travel.

## Structure

```
/
├── index.html              ← Main landing page (nathanlanetravel.com)
├── proposal.html           ← Interactive trip proposal template
├── itinerary-template.html ← Client itinerary template (sample data)
└── clients/                ← Live client itineraries (deployed separately via Netlify)
```

## Hosting

- **Main site** → GitHub Pages (`index.html` serves as homepage)
- **Client itineraries** → Deployed individually via Netlify drag-and-drop
  - Each client gets their own URL: `client-name.netlify.app` or custom subdomain
  - Files are NOT committed to this repo — keeps client data private

## Deploying a New Client Itinerary

1. Duplicate `itinerary-template.html`
2. Fill in the `CLIENT_DATA` object at the top of the JS section with the client's trip info
3. Set a unique password in `CLIENT_DATA.password`
4. Drag & drop the file to [Netlify Drop](https://app.netlify.com/drop)
5. Share the URL + password with the client

## Brand

- **Colors:** Forest Green `#1C3A24` · Gold `#C48C2E` · Cream `#F3EFE6`
- **Fonts:** Cormorant Garamond (display) · Sora (UI/labels) · Outfit (body)
