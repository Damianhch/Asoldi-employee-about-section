# Employment – About us section (iframe)

Self-contained “Om oss” carousel section for embedding on your site via iframe.  
Slide 1: text left, image right. Slides 2–5: image left, text right.  
10-second progress bar and black dots for pagination.

## Deploy to Vercel

1. Push this folder to a Git repo (e.g. GitHub).
2. In [Vercel](https://vercel.com), **Add New Project** and import the repo.
3. Leave **Root Directory** as `.` and deploy (no build step).
4. After deploy, your section URL will be like:  
   `https://your-project.vercel.app`

## Embed on your website

Under your video, add:

```html
<iframe
  src="https://your-project.vercel.app"
  title="Om oss"
  width="720"
  height="380"
  style="border: none; max-width: 100%;"
></iframe>
```

Adjust `width` and `height` to match your layout. The section is responsive inside the iframe.

## Replace placeholder images

Edit `index.html` and replace each slide’s `src`:

- Slide 1: `https://placehold.co/...` → your “Om oss” image
- Slide 2: your “Tjen mer” image
- Slide 3: your “Jobb fra hvor som helst” image
- Slide 4: your “Konkuranser” image
- Slide 5: your “Har du det som trengs?” image

Redeploy on Vercel after changing the file.
