# WAGMI — Rengoku Special Drop (production site)

Static landing page for the WAGMI Rengoku Special Drop hoodie. No build step, no framework.

```
./
  index.html   page markup
  styles.css   all styles (colour tokens at the top)
  app.js       gallery, lightbox, order calculator, FormSubmit + WhatsApp
  assets/      the six product images used by the page
```

## Run locally
```
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy
Upload this repo to any static host (Vercel / Netlify: import the repo, no build command, output = repo root). It must be served over http(s): FormSubmit rejects `file://`.

## FormSubmit (orders to dazaiosa2000@gmail.com)
1. Deploy, then place one test order.
2. FormSubmit emails an activation link to dazaiosa2000@gmail.com. Click it. Until then, orders show the error box with FormSubmit's message and the WhatsApp button.
3. Place a second test order. It arrives as "🔥 NEW WAGMI RENGOKU ORDER — [name]".
4. Optional: to hide the address from the page source, replace `EMAIL` in `app.js` with the random alias from FormSubmit's activation email.

The page posts JSON to `https://formsubmit.co/ajax/<EMAIL>` and shows the success screen only when FormSubmit replies `success: "true"`.

## Prices (`app.js`)
- `PRICE` = 3800, `HOME_SUP` = 350, `MAX_QTY` = 10
- `RATES`: Stop Desk rate by wilaya number. Wilayas **46** and **59–69** have no confirmed rate. For those, the page shows "Delivery price to be confirmed", disables submit and points to WhatsApp. Add a rate to enable them, e.g. `46: 500`.
- `PRESELECT_STOP_DESK`: set `true` to start with Stop Desk selected. Size is never preselected.

## Social preview
`og:image` in `index.html` is a relative path. After deploying, change it to the full URL (e.g. `https://yourdomain.com/assets/wagmi-worn-back.jpg`).
