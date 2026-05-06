# SOP: Deploying a Static Site to GitHub Pages with a Custom Domain

**Version:** 2.0
**Last Updated:** 2026-05-06
**Project:** Bastuku Investments Landing Page
**Domain:** bastuku-inv.com (Squarespace or Cloudflare)
**Hosting:** GitHub Pages (Free)

---

## Overview

This Standard Operating Procedure covers the end-to-end process of deploying a static website to GitHub Pages and connecting a custom domain purchased through **Squarespace** or **Cloudflare**. It is written to be reusable for any static site + custom domain combination.

**Total estimated time:** 30–60 minutes (excluding DNS propagation)

---

## Prerequisites

Before starting, confirm:

- [ ] You have a GitHub account ([github.com](https://github.com))
- [ ] Git is installed on your machine (`git --version` to check)
- [ ] You own a domain on **Squarespace Domains** ([domains.squarespace.com](https://domains.squarespace.com)) OR **Cloudflare** ([dash.cloudflare.com](https://dash.cloudflare.com))
- [ ] You have admin access to your domain's DNS settings
- [ ] Your static site files are ready locally (HTML, CSS, JS, images)

---

## PHASE 1: Push Code to GitHub

### Step 1.1 — Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Fill in:
   - **Repository name:** `bastuku-investments-landing` (or your project name)
   - **Description:** (optional) "Landing page for Bastuku Investments"
   - **Visibility:** Public (required for free GitHub Pages)
   - **DO NOT** check "Add a README file" (you already have one)
3. Click **Create repository**
4. Copy the repository URL (e.g., `https://github.com/YOUR_USERNAME/bastuku-investments-landing.git`)

### Step 1.2 — Initialize and Push from Your Local Machine

Open a terminal in your project folder and run:

```bash
# Initialize git (skip if already initialized)
git init

# Add all project files
git add .

# Create first commit
git commit -m "Initial commit: Bastuku Investments landing page"

# Connect to GitHub (use your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/bastuku-investments-landing.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 1.3 — Verify

- Visit your repository URL on GitHub
- Confirm all files (index.html, styles/, js/, images/) are visible

---

## PHASE 2: Enable GitHub Pages

### Step 2.1 — Turn on GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (gear icon, top menu bar)
3. In the left sidebar, click **Pages**
4. Under **"Build and deployment"**:
   - **Source:** Select **Deploy from a branch**
   - **Branch:** Select **main**
   - **Folder:** Select **/ (root)**
5. Click **Save**

### Step 2.2 — Verify Default URL

- GitHub will display a URL like: `https://YOUR_USERNAME.github.io/bastuku-investments-landing/`
- Wait 1–2 minutes, then visit that URL
- Confirm your site loads correctly

> **Troubleshooting:** If you see a 404, make sure your main HTML file is named `index.html` and is in the repository root (not inside a subfolder).

---

## PHASE 3: Configure Custom Domain on GitHub

### Step 3.1 — Add CNAME File to Repository

Create a file named `CNAME` (no extension) in your project root with your domain:

```
bastuku-inv.com
```

Then push it:

```bash
git add CNAME
git commit -m "Add custom domain CNAME record"
git push origin main
```

> **Why:** This tells GitHub Pages which custom domain this site belongs to. Without it, GitHub won't serve your site on your custom domain.

### Step 3.2 — Set Custom Domain in GitHub Settings

1. Go to repository **Settings** → **Pages**
2. Under **"Custom domain"**, enter: `bastuku-inv.com`
3. Click **Save**
4. You will see a yellow banner saying "DNS check in progress" — this is expected

> **Note:** Do NOT check "Enforce HTTPS" yet. Wait until DNS is fully configured and the SSL certificate is provisioned (Phase 5).

---

## PHASE 4: Configure DNS — Choose Your Registrar

Follow **ONE** of the two paths below based on where your domain is registered.

---

## PHASE 4A: Configure DNS on Squarespace

### Step 4A.1 — Access Squarespace DNS Settings

1. Go to [domains.squarespace.com](https://domains.squarespace.com) and log in
2. Click on your domain: **bastuku-inv.com**
3. In the left sidebar, click **DNS** → **DNS Settings**

> **Alternative path:** If you manage your domain through a Squarespace website account, go to:
> **Settings** → **Domains** → click your domain → **Advanced Settings** → **DNS Records** → **Manage DNS Settings**

### Step 4A.2 — Remove Default Records (if applicable)

Squarespace may have default A records or CNAME records pointing to their own servers (especially if the domain was previously connected to a Squarespace website).

- **Delete** any existing **A records** that point to Squarespace IPs (e.g., `198.185.159.x` or `198.49.23.x`)
- **Delete** any existing **CNAME record** for `www` that points to a Squarespace address
- **Keep** any MX records (email) or TXT records (verification) unless you know they're unused

> **Warning:** Removing MX records will break email if you use Squarespace email or Google Workspace through Squarespace. Only remove what you're replacing.

### Step 4A.3 — Add A Records (Root Domain → GitHub Pages)

Add **four** A records. These point your root domain (`bastuku-inv.com`) to GitHub's servers.

Click **Add Record** and create each one:

| #   | Type  | Host  | Data (Value)      | TTL              |
| --- | ----- | ----- | ----------------- | ---------------- |
| 1   | **A** | **@** | `185.199.108.153` | Automatic / 3600 |
| 2   | **A** | **@** | `185.199.109.153` | Automatic / 3600 |
| 3   | **A** | **@** | `185.199.110.153` | Automatic / 3600 |
| 4   | **A** | **@** | `185.199.111.153` | Automatic / 3600 |

**How to add each record on Squarespace:**

1. Click **Add Record** (or the **+** button)
2. Select record type: **A**
3. In the **Host** field, enter: `@`
4. In the **Data** (or **Value** / **Points to**) field, enter the IP address
5. Leave **TTL** as default (Automatic or 3600)
6. Click **Save** (or **Add**)
7. Repeat for all four IP addresses

### Step 4A.4 — Add CNAME Record (www Subdomain)

This ensures `www.bastuku-inv.com` also works.

| Type      | Host    | Data (Value)              | TTL              |
| --------- | ------- | ------------------------- | ---------------- |
| **CNAME** | **www** | `YOUR_USERNAME.github.io` | Automatic / 3600 |

> **Important:** Replace `YOUR_USERNAME` with your actual GitHub username. For example, if your GitHub username is `bastuku-dev`, enter `bastuku-dev.github.io`.

**How to add on Squarespace:**

1. Click **Add Record**
2. Select record type: **CNAME**
3. Host: `www`
4. Data: `YOUR_USERNAME.github.io`
5. Click **Save**

### Step 4A.5 — (Optional) Add AAAA Records for IPv6

For full IPv6 support, add these four AAAA records:

| #   | Type     | Host  | Data (Value)          |
| --- | -------- | ----- | --------------------- |
| 1   | **AAAA** | **@** | `2606:50c0:8000::153` |
| 2   | **AAAA** | **@** | `2606:50c0:8001::153` |
| 3   | **AAAA** | **@** | `2606:50c0:8002::153` |
| 4   | **AAAA** | **@** | `2606:50c0:8003::153` |

### Step 4A.6 — Verify Your Squarespace DNS Records

After adding all records, your Squarespace DNS panel should show:

```
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
CNAME www   YOUR_USERNAME.github.io
```

Plus any AAAA, MX, or TXT records you chose to keep/add.

---

## PHASE 4B: Configure DNS on Cloudflare

### Step 4B.1 — Access Cloudflare DNS Dashboard

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) and log in
2. From the homepage, select your domain: **bastuku-inv.com**
3. In the left sidebar, click **DNS** → **Records**

### Step 4B.2 — Remove Default Records (if applicable)

Cloudflare may have default records from previous configurations. Review existing records:

- **Delete** any existing **A records** pointing to non-GitHub IPs (unless you need them for other services)
- **Delete** any existing **CNAME record** for `www` that doesn't point to GitHub Pages
- **Keep** any MX records (email), TXT records (verification, DKIM), or NS records unless you know they're unused

> **Tip:** If you previously used Cloudflare for a different service, you may have old records to clean up.

### Step 4B.3 — Add A Records (Root Domain → GitHub Pages)

Add **four** A records pointing your root domain to GitHub Pages.

Click **+ Add Record** and create each one with these exact settings:

| #   | Type  | Name | Content (IP)      | Proxy Status | TTL  |
| --- | ----- | ---- | ----------------- | ------------ | ---- |
| 1   | **A** | `@`  | `185.199.108.153` | DNS only     | Auto |
| 2   | **A** | `@`  | `185.199.109.153` | DNS only     | Auto |
| 3   | **A** | `@`  | `185.199.110.153` | DNS only     | Auto |
| 4   | **A** | `@`  | `185.199.111.153` | DNS only     | Auto |

**How to add each A record on Cloudflare:**

1. Click **+ Add Record**
2. Select type: **A**
3. In the **Name** field, enter: `@` (represents root domain)
4. In the **Content** field, enter the IP address
5. Set **Proxy status** to **DNS only** (gray cloud icon)
   - ✓ DNS only (gray cloud) — recommended for GitHub Pages
   - ✗ Proxied (orange cloud) — do not use, will break GitHub Pages
6. Leave **TTL** as Auto
7. Click **Save**
8. Repeat for all four IP addresses

> **Important:** Use **DNS only** (gray cloud), not "Proxied". Proxying through Cloudflare will interfere with GitHub Pages SSL certificates.

### Step 4B.4 — Add CNAME Record (www Subdomain)

This ensures `www.bastuku-inv.com` works.

| Type      | Name    | Content                   | Proxy Status | TTL  |
| --------- | ------- | ------------------------- | ------------ | ---- |
| **CNAME** | **www** | `YOUR_USERNAME.github.io` | DNS only     | Auto |

> **Important:** Replace `YOUR_USERNAME` with your actual GitHub username. For example, if your GitHub username is `bastuku-dev`, enter `bastuku-dev.github.io`.

**How to add on Cloudflare:**

1. Click **+ Add Record**
2. Select type: **CNAME**
3. Name: `www`
4. Content: `YOUR_USERNAME.github.io`
5. Set **Proxy status** to **DNS only** (gray cloud icon)
6. Leave **TTL** as Auto
7. Click **Save**

### Step 4B.5 — (Optional) Add AAAA Records for IPv6

For full IPv6 support, add these four AAAA records:

| #   | Type     | Name | Content               | Proxy Status | TTL  |
| --- | -------- | ---- | --------------------- | ------------ | ---- |
| 1   | **AAAA** | `@`  | `2606:50c0:8000::153` | DNS only     | Auto |
| 2   | **AAAA** | `@`  | `2606:50c0:8001::153` | DNS only     | Auto |
| 3   | **AAAA** | `@`  | `2606:50c0:8002::153` | DNS only     | Auto |
| 4   | **AAAA** | `@`  | `2606:50c0:8003::153` | DNS only     | Auto |

All AAAA records should also be set to **DNS only**.

### Step 4B.6 — Verify Your Cloudflare DNS Records

After adding all records, your Cloudflare DNS Records page should show:

```
Type  Name  Content                     Proxy Status  TTL
────  ────  ───────────────────────────  ────────────  ───
A     @     185.199.108.153             DNS only      Auto
A     @     185.199.109.153             DNS only      Auto
A     @     185.199.110.153             DNS only      Auto
A     @     185.199.111.153             DNS only      Auto
CNAME www   YOUR_USERNAME.github.io     DNS only      Auto
```

> **Critical:** Ensure all GitHub Pages records have **DNS only** status (gray cloud), not proxied (orange cloud).

Plus any AAAA, MX, TXT, or other records you chose to keep/add.

---

## PHASE 5: Verify and Enable HTTPS

### Step 5.1 — Wait for DNS Propagation

DNS changes take time to spread across the internet.

- **Typical time:** 15–30 minutes
- **Maximum time:** Up to 48 hours (rare)

**Check propagation status:**

- Visit [whatsmydns.net](https://www.whatsmydns.net) and enter `bastuku-inv.com`
- Select record type **A**
- Click **Search**
- Green checkmarks with GitHub IPs (`185.199.10x.153`) = propagation complete

You can also check from the command line:

```bash
# Check A records
nslookup bastuku-inv.com

# Expected output should include GitHub IPs:
# 185.199.108.153
# 185.199.109.153
# 185.199.110.153
# 185.199.111.153
```

### Step 5.2 — Verify on GitHub

1. Go to repository **Settings** → **Pages**
2. Under "Custom domain", you should see a green checkmark with "DNS check successful"
3. If you see a yellow warning, DNS hasn't propagated yet — wait and refresh

### Step 5.3 — Enable HTTPS

Once the DNS check shows green:

1. On the same **Settings** → **Pages** page
2. Check the box: **Enforce HTTPS**
3. GitHub will provision a free SSL certificate via Let's Encrypt
4. This may take 5–15 minutes

> **If "Enforce HTTPS" is grayed out:** The SSL certificate is still being provisioned. Wait 15 minutes and refresh the page.

### Step 5.4 — Final Verification

Test all URL variations:

| URL                           | Expected Behavior                                                         |
| ----------------------------- | ------------------------------------------------------------------------- |
| `http://bastuku-inv.com`      | Redirects to `https://bastuku-inv.com`                                    |
| `https://bastuku-inv.com`     | Loads site with padlock icon                                              |
| `http://www.bastuku-inv.com`  | Redirects to `https://bastuku-inv.com` (or `https://www.bastuku-inv.com`) |
| `https://www.bastuku-inv.com` | Loads site with padlock icon                                              |

---

## PHASE 6: Post-Deployment Checklist

Run through this checklist after the site is live:

### Functionality

- [ ] All pages load without errors
- [ ] All navigation links work
- [ ] All images load correctly
- [ ] Contact form / CTA buttons are functional
- [ ] Mobile layout looks correct (test on a real phone)
- [ ] Dark mode toggle works (if applicable)

### Performance

- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev) — target score > 80
- [ ] Site loads in under 3 seconds
- [ ] No console errors (F12 → Console tab in browser)

### Security

- [ ] HTTPS padlock shows in browser
- [ ] No mixed content warnings (HTTP resources on HTTPS page)
- [ ] No API keys or credentials in source code

### SEO

- [ ] `<title>` tag is set correctly
- [ ] `<meta name="description">` is present
- [ ] Open Graph tags (`og:title`, `og:image`, etc.) for social sharing
- [ ] Favicon is set

---

## Appendix A: How to Deploy Updates

After the initial setup, deploying updates is simple:

```bash
# 1. Make your changes to the code locally

# 2. Stage changes
git add .

# 3. Commit with a descriptive message
git commit -m "Update: description of what changed"

# 4. Push to GitHub — site updates automatically
git push origin main
```

GitHub Pages will automatically rebuild and deploy within 1–2 minutes.

---

## Appendix B: DNS Record Reference

These are the official GitHub Pages DNS records. They are the same for all projects and registrars.

### IPv4 (A Records)

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

### IPv6 (AAAA Records)

```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

### Subdomain (CNAME)

```
YOUR_USERNAME.github.io
```

---

## Appendix C: Squarespace DNS Panel — Visual Reference

```
┌──────────────────────────────────────────────────────┐
│  Squarespace Domains                                 │
│                                                      │
│  ┌─────────────┐                                     │
│  │ bastuku-    │                                    │
│  │ inv.com     │  ← Click your domain               │
│  └─────────────┘                                     │
│                                                      │
│  Left Sidebar:                                       │
│  ├── Overview                                        │
│  ├── Nameservers                                     │
│  ├── DNS ← Click this                                │
│  │   └── DNS Settings ← Then this                    │
│  ├── Email                                           │
│  └── Registration                                    │
│                                                      │
│  ═══════════════════════════════════════════          │
│  DNS Records                                         │
│  ─────────────────────────────────────────           │
│  [+ Add Record] ← Click to add each record          │
│                                                      │
│  Type   Host   Data              TTL                 │
│  ────   ────   ────              ───                 │
│  A      @      185.199.108.153   Auto                │
│  A      @      185.199.109.153   Auto                │
│  A      @      185.199.110.153   Auto                │
│  A      @      185.199.111.153   Auto                │
│  CNAME  www    username.github.io Auto               │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## Appendix D: Cloudflare DNS Dashboard — Visual Reference

```
┌──────────────────────────────────────────────────────┐
│  Cloudflare Dashboard                                │
│                                                      │
│  Select Domain:  [bastuku-inv.com] ↓                │
│                                                      │
│  Left Sidebar:                                       │
│  ├── Overview                                        │
│  ├── Analytics                                       │
│  ├── DNS ← Click this                                │
│  │   └── Records ← Then this                         │
│  ├── SSL/TLS                                         │
│  └── ...                                             │
│                                                      │
│  ═══════════════════════════════════════════          │
│  DNS Records                                         │
│  ─────────────────────────────────────────           │
│  [+ Add Record] ← Click to add each record          │
│                                                      │
│  Type  Name  Content               Status   TTL      │
│  ────  ────  ─────────────────────  ──────   ───     │
│  A     @     185.199.108.153       DNS only Auto     │
│  A     @     185.199.109.153       DNS only Auto     │
│  A     @     185.199.110.153       DNS only Auto     │
│  A     @     185.199.111.153       DNS only Auto     │
│  CNAME www   username.github.io    DNS only Auto     │
│                                                      │
│  ⚠️  Cloud icons MUST be gray (DNS only)             │
│  ✓  Never use orange (Proxied) for GitHub Pages      │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## Appendix E: Troubleshooting

| Problem                                    | Cause                                                | Solution                                                                |
| ------------------------------------------ | ---------------------------------------------------- | ----------------------------------------------------------------------- |
| Site shows 404 on custom domain            | CNAME file missing or wrong                          | Verify `CNAME` file in repo root contains `bastuku-inv.com`             |
| "DNS check in progress" won't clear        | DNS hasn't propagated                                | Wait up to 48 hours; check [whatsmydns.net](https://www.whatsmydns.net) |
| "Enforce HTTPS" grayed out                 | SSL cert still provisioning                          | Wait 15 min after DNS check passes, then refresh                        |
| `www` doesn't work but root does           | Missing CNAME record                                 | Add CNAME record: `www` → `YOUR_USERNAME.github.io`                     |
| **Cloudflare only:** Site shows error      | Proxy status set to "Proxied" (orange cloud)         | Change all GitHub Pages records to **DNS only** (gray cloud)            |
| **Cloudflare only:** SSL certificate error | Cloudflare proxying interferes with GitHub Pages SSL | Ensure all GitHub records use **DNS only**, not Proxied                 |
| Site shows old registrar's parking page    | Old A records still active                           | Delete old A records from DNS settings                                  |
| SSL certificate error in browser           | Cert not yet issued                                  | Wait 15–30 min; try incognito mode                                      |
| Changes not showing after push             | Browser cache                                        | Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)               |

---

## Appendix F: Adapting This SOP for Other Projects

To reuse this SOP for a different project:

1. **Replace** `bastuku-inv.com` with your new domain
2. **Replace** `bastuku-investments-landing` with your new repo name
3. **Replace** `YOUR_USERNAME` with the relevant GitHub username
4. **DNS steps are identical for both registrars** — only the domain and GitHub username change
5. If using a **different registrar** (GoDaddy, Namecheap, etc.), the DNS record values are the same — only the UI for adding records differs

### Quick Reference — GitHub Pages DNS Records

These IPs are GitHub's official Pages servers and are the same for all projects:

```
A Records (always these four):
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153

AAAA Records (optional, for IPv6):
  2606:50c0:8000::153
  2606:50c0:8001::153
  2606:50c0:8002::153
  2606:50c0:8003::153

CNAME for www:
  YOUR_USERNAME.github.io
```

---

## Revision History

| Date       | Version | Author | Changes                                                                                                                             |
| ---------- | ------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| 2026-05-06 | 2.0     | —      | Added Cloudflare DNS configuration path; split Phase 4 into 4A (Squarespace) and 4B (Cloudflare); added Cloudflare visual reference |
| 2026-04-08 | 1.0     | —      | Initial SOP created for Squarespace domains                                                                                         |

---

**End of SOP**
