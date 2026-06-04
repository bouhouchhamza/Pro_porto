# Hamza Bouhouch SEO Audit and Growth Plan

Domain: https://bouhouch.site  
Positioning: Full Stack Developer and AI Automation Engineer in Morocco  
Audit date: June 4, 2026

## Executive Summary

No technical implementation can guarantee a first-place Google ranking. The strongest path is to combine a technically clean, entity-focused portfolio with consistent external profiles, locally relevant citations, useful technical content, and genuine backlinks.

Estimated technical/on-page score before this implementation: **64/100**.  
Estimated score after the implemented changes: **92/100**.

Strong existing signals included a canonical URL, one descriptive H1, useful project content, responsive layouts, and some JSON-LD. The largest weaknesses were a placeholder Search Console verification token, a missing social preview image and manifest, static sitemap entries for non-indexable URL fragments, JavaScript-only navigation buttons, incomplete entity relationships, and limited external authority signals.

## 1. Technical SEO Audit

| Area | Before | After implementation | Remaining work |
| --- | --- | --- | --- |
| Metadata | Descriptive but duplicated in `layout.tsx` | Centralized in `src/app/metadata.ts` | Review CTR in Search Console |
| Canonical | Present | Preserved as `https://bouhouch.site/` | Confirm production resolves one preferred host |
| Robots | Static and valid | Dynamic Next.js metadata route | Confirm `/robots.txt` after deployment |
| Sitemap | Included `#fragment` URLs that are not separate pages | Root canonical URL only | Add real URLs when case studies/blog pages exist |
| Open Graph/Twitter | Referenced missing `og-image.png` | Generated 1200x630 social image | Test on LinkedIn/Post Inspector |
| Structured data | Partial Person/WebSite/Service graph | Connected Person, WebSite, ProfessionalService, LocalBusiness, Organization, ItemList/CreativeWork, BreadcrumbList | Validate with Rich Results Test; add verified social profiles |
| Headings | Generic section headings | Natural service/entity headings | Keep one H1 per future page |
| Internal linking | Navbar used JavaScript-only buttons | Crawlable fragment anchors | Create real service/case-study pages |
| Image SEO | Hero/project alt text present; hero source is 10.9 MB | Stronger project alt text and responsive hero image hints | Compress `public/byby.jpg` to modern AVIF/WebP source |
| Mobile SEO | Responsive but animation-heavy | Viewport and crawl semantics improved | Test on real devices and PageSpeed Insights |
| Accessibility | Labels and focus styles mostly present | Crawlable anchors improve semantics | Fix any color contrast/emoji encoding issues |
| Crawlability | Single page indexable | Dynamic robots/sitemap and canonical metadata | Verify status codes and rendered HTML after deployment |

### Important Findings

- `public/byby.jpg` is approximately 10.9 MB. Next/Image will optimize delivery, but replacing the source with a carefully compressed high-quality AVIF/WebP can reduce build/deployment weight and image processing cost.
- The portfolio is currently a single indexable URL. A single page can rank for the name, but dedicated service and case-study URLs are needed to compete broadly for Morocco commercial terms.
- Search Console verification now reads from `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`; add the real token in the deployment environment.
- Structured data supports entity understanding, but does not directly guarantee rankings or a Knowledge Panel.

## 2. Implemented SEO Improvements

Implemented files:

- `src/app/metadata.ts`: centralized title, description, keywords, canonical, Open Graph, Twitter, robots meta, optional Google verification, and JSON-LD graph.
- `src/app/layout.tsx`: imports metadata, exports a Next.js viewport, and emits JSON-LD safely.
- `src/app/sitemap.ts`: generates `/sitemap.xml`.
- `src/app/robots.ts`: generates `/robots.txt`.
- `src/app/manifest.ts`: generates `/manifest.webmanifest`.
- `src/app/opengraph-image.tsx`: generates a 1200x630 Open Graph image.
- Navbar and hero calls-to-action now use crawlable anchors.
- Hero, About, Skills, Projects, Tools, and Contact copy now naturally clarifies Hamza Bouhouch's services and Morocco positioning.

The Next.js metadata route convention is preferred over manually maintained public files because it keeps metadata typed and generated with the application.

## 3. Structured Data Strategy

The production JSON-LD graph connects:

1. **Person**: Hamza Bouhouch, alternate name Bouhouch, roles, skills, Morocco, contact, and verified profiles.
2. **WebSite**: identifies the portfolio and its publisher/about entity.
3. **ProfessionalService + LocalBusiness**: describes web development and AI automation services in Morocco and worldwide.
4. **Organization**: represents the Hamza Bouhouch personal brand.
5. **ItemList + CreativeWork**: describes visible portfolio projects.
6. **BreadcrumbList**: identifies the homepage hierarchy.

Only add external URLs to `sameAs` after those profiles are complete, public, and consistently identify Hamza Bouhouch.

Validation:

- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema validator: https://validator.schema.org/
- Google structured data guidelines: https://developers.google.com/search/docs/appearance/structured-data/sd-policies

## 4. Content SEO Recommendations

### Homepage intent

The homepage should primarily rank for the personal entity and broad positioning:

- Hamza Bouhouch
- Bouhouch
- Full Stack Developer Morocco
- AI Automation Engineer Morocco

### Recommended future landing pages

Create genuinely useful pages instead of adding more keywords to the homepage:

- `/full-stack-developer-morocco`
- `/ai-automation-engineer-morocco`
- `/laravel-developer-morocco`
- `/react-nextjs-developer-morocco`
- `/n8n-automation-morocco`
- `/saas-development-morocco`
- `/projects/financial-risk-simulation-platform`
- `/projects/ai-automation-systems`

Each page should contain unique proof, process, FAQs, project examples, and a clear contact path. Avoid creating thin near-duplicate location pages.

### Expanded Service Keyword Map

| Search intent | Primary target | Recommended destination |
| --- | --- | --- |
| Personal/brand | Hamza Bouhouch, Bouhouch, Hamza developer, Bouhouch developer, bouhouch.site | Homepage |
| Broad developer | Web developer Morocco, Website developer Morocco, Full Stack Developer Morocco, Freelance developer Morocco | Homepage initially; later `/full-stack-developer-morocco` |
| Framework specialist | Laravel developer Morocco, React developer Morocco, Next.js developer Morocco, Python developer Morocco | Dedicated technology service pages |
| Automation | n8n automation developer Morocco, AI automation Morocco, Business automation Morocco | `/ai-automation-engineer-morocco` and `/n8n-automation-morocco` |
| Product development | SaaS developer Morocco, Dashboard developer Morocco, API developer Morocco | Dedicated service/case-study pages |
| Commerce | E-commerce developer Morocco | Ecommerce service page plus relevant case studies |
| Applications | Mobile application developer Morocco | Mobile development service page only when supported by real portfolio proof |

The homepage should remain focused on Hamza Bouhouch plus broad full stack and AI automation intent. It should not try to rank equally for every technology and city.

### Local Morocco Keyword Map

The current site truthfully states that remote development services are available across Morocco. It does **not** claim physical offices in these cities.

| City | Priority keyword cluster | Recommended content asset |
| --- | --- | --- |
| Agadir | Developer Agadir, Web developer Agadir, Freelance developer Agadir, Laravel developer Agadir | Original case study or guide focused on Agadir SMEs, tourism, ecommerce, or operations |
| Casablanca | Developer Casablanca, Web developer Casablanca, React developer Casablanca | SaaS, startup, dashboard, and enterprise workflow case studies |
| Rabat | Developer Rabat, Web developer Rabat | Secure web applications, institutional workflows, and API integration guides |
| Marrakech | Developer Marrakech, Web developer Marrakech | Tourism, booking, hospitality, ecommerce, and multilingual website content |
| Tangier | Developer Tangier, Web developer Tangier | Logistics, industrial dashboards, APIs, and business automation content |
| Nador | Developer Nador, Web developer Nador | Local SME websites, ecommerce, and process automation content |

Do not publish six near-identical city pages with the city name swapped. Create a city page only when it includes unique local examples, proof, testimonials, or a genuinely city-specific guide.

### Natural Content Rewrite Applied

- Hero establishes Hamza Bouhouch as a Full Stack Developer and AI Automation Engineer in Morocco.
- Projects connects visible proof to Laravel, React, Next.js, SaaS, and n8n automation.
- Skills now includes Python and FastAPI services naturally.
- Technologies describes Supabase, MySQL, PostgreSQL, APIs, mobile applications, and n8n workflows.
- Contact explains remote service coverage across Agadir, Casablanca, Rabat, Marrakech, Tangier, and Nador once, without repeated city keyword blocks.

## 5. Internal Linking Strategy

Current single-page anchors:

- `About Hamza` -> `#about`
- `Developer Skills` -> `#skills`
- `Portfolio Projects` -> `#projects`
- `Contact Hamza` -> `#contact`

When dedicated pages are added:

- Link “Laravel Developer in Morocco” from relevant project case studies to `/laravel-developer-morocco`.
- Link “n8n automation systems” from AI projects to `/n8n-automation-morocco`.
- Link each service page to two relevant project case studies.
- Link every article to one service page, one project, and the contact page.
- Use descriptive anchors naturally; avoid repeating exact-match anchors everywhere.

## 6. Google Indexing Checklist

1. Open https://search.google.com/search-console and add a **Domain property** for `bouhouch.site`.
2. Verify ownership by adding the provided DNS TXT record at the domain registrar.
3. Also set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` if using the HTML tag verification method.
4. Deploy, then verify:
   - `https://bouhouch.site/robots.txt`
   - `https://bouhouch.site/sitemap.xml`
   - `https://bouhouch.site/manifest.webmanifest`
   - `https://bouhouch.site/opengraph-image`
5. In Search Console, open **Sitemaps**, submit `sitemap.xml`, and confirm success.
6. Use **URL Inspection** for the homepage, test the live URL, then request indexing.
7. Monitor Pages, Core Web Vitals, Enhancements, Links, and Performance weekly.
8. Track queries by country = Morocco and compare branded versus non-branded clicks.

Google notes that requesting indexing does not guarantee instant inclusion. Sitemaps help discovery, especially as new real URLs are published.

## 7. Knowledge Panel and Entity Recognition

Use exactly the same public identity everywhere:

- Name: Hamza Bouhouch
- Description: Full Stack Developer and AI Automation Engineer in Morocco
- Website: https://bouhouch.site
- Portrait/logo: consistent high-quality assets

Priority profiles:

1. Complete LinkedIn with the domain, matching headline, Morocco location, projects, and public custom URL.
2. Complete GitHub profile README, bio, location, website, and pinned repositories.
3. Publish original technical articles on Dev.to and Medium with author bio links.
4. Add a Crunchbase profile only if there is a real company/startup entity with verifiable public information.
5. Use consistent `sameAs` URLs in JSON-LD after profiles are complete.
6. Earn mentions from independent sites. Self-created profiles alone rarely establish a strong entity.

## 8. Local SEO Morocco Strategy

- Create a Google Business Profile only if eligible under Google's rules for a real business/service-area operation.
- Use consistent name, phone, email, domain, description, and Morocco location across profiles.
- Seek listings and links from Moroccan technology communities, startup directories, schools, coworking spaces, chambers, agencies, and event sites.
- Publish Morocco-relevant case studies: local ecommerce, multilingual sites, payment/invoicing workflows, and SME automation.
- Earn testimonials and project references from real Moroccan clients.
- Build French and Arabic content only when it can be maintained at high quality; use separate localized URLs and hreflang.
- Avoid low-quality bulk directory submissions and paid link schemes.

### Local Citation and Backlink Targets

- Moroccan startup incubators, accelerators, coworking spaces, and technology event websites.
- Relevant alumni, school, bootcamp, or certification profile pages.
- Moroccan business directories that manually review listings and allow a website URL.
- Chambers, professional networks, and local ecommerce or entrepreneur communities.
- Client case studies and partner pages that describe the actual project and link to the portfolio.
- Conference talks, workshop pages, podcasts, and community interviews.

Avoid listings that publish thousands of unrelated links, require reciprocal links, or sell guaranteed ranking packages.

### Profile Backlink Plan

1. **GitHub:** complete the profile README; link `bouhouch.site`; pin repositories; add project descriptions, screenshots, topics, and live links.
2. **LinkedIn:** use a consistent headline, Morocco location, website, featured case studies, and project descriptions.
3. **Dev.to and Medium:** publish original articles first, then use canonical URLs when republishing content hosted on the portfolio.
4. **Local listings:** keep name, phone, email, URL, and service description consistent.
5. **Client/partner links:** request a contextual credit only when it accurately reflects delivered work.

## 9. Thirty Organic Content Ideas

1. How to Choose a Full Stack Developer in Morocco
2. Laravel Development Cost in Morocco: A Practical Guide
3. Building a Secure Laravel SaaS Dashboard
4. Laravel vs Node.js for Moroccan Business Applications
5. Laravel API Authentication Best Practices
6. React Performance Checklist for Production Applications
7. React Developer Morocco: Skills Businesses Should Look For
8. Building Accessible React Dashboards
9. React State Management for SaaS Products
10. Migrating a Frontend from JavaScript to TypeScript
11. Next.js SEO Checklist for Moroccan Businesses
12. Next.js App Router Metadata and Structured Data Guide
13. Improving Core Web Vitals in Next.js
14. Next.js vs React SPA for Business Websites
15. Building Multilingual Websites with Next.js
16. What Is n8n and How Can Moroccan Businesses Use It?
17. Ten Repetitive Business Tasks to Automate with n8n
18. Building an n8n Lead Qualification Workflow
19. Connecting WhatsApp, CRM, and Email with n8n
20. n8n vs Zapier for Business Automation
21. AI Automation for Moroccan SMEs
22. How to Build a Reliable AI Customer Support Workflow
23. Using OpenAI APIs Safely in Business Applications
24. AI Automation Engineer Morocco: Services and Use Cases
25. Human Review Patterns for AI Workflows
26. SaaS MVP Development Roadmap for Founders
27. How Much Does a Custom SaaS Application Cost?
28. SaaS Dashboard UX and Performance Checklist
29. From Spreadsheet to Custom Business Application
30. Case Study: Automating a Manual Business Workflow with n8n

Every article should answer a real question, include original examples/screenshots, link to a relevant service and project, and avoid generic AI-generated filler.

## 10. Prioritized Action Plan

### High Impact

| Action | Expected gain |
| --- | --- |
| Deploy implemented technical SEO and verify Search Console | Reliable discovery, indexing, diagnostics |
| Complete LinkedIn/GitHub entity profiles and add verified `sameAs` links | Stronger branded/entity signals |
| Publish dedicated service pages with real proof | Eligibility for non-branded Morocco queries |
| Publish detailed project case-study pages | Topical authority, internal links, long-tail rankings |
| Compress the 10.9 MB hero source and test Core Web Vitals | Better LCP and mobile experience |
| Earn links from real clients, communities, and relevant publications | Authority needed for competitive rankings |

### Medium Impact

| Action | Expected gain |
| --- | --- |
| Publish two expert articles per month | Growing long-tail traffic and topical authority |
| Add French/Arabic versions when supportable | Wider Morocco search coverage |
| Add genuine client testimonials and measurable outcomes | Trust and conversion improvement |
| Add dedicated contact/service schema on future service pages | Clearer page-level entity/service meaning |

### Low Impact

| Action | Expected gain |
| --- | --- |
| Refine titles/descriptions based on Search Console CTR | Incremental organic click improvement |
| Add more relevant image captions and descriptive filenames | Small image-search/context benefit |
| Maintain sitemap timestamps only when content changes | Cleaner crawler signals |

## Exact Next.js SEO Files

- `src/app/metadata.ts`: homepage metadata, social cards, optional Search Console verification, advanced JSON-LD, Morocco service areas, technologies, and service catalog.
- `src/app/layout.tsx`: metadata export, viewport configuration, and JSON-LD output.
- `src/app/sitemap.ts`: generated XML sitemap.
- `src/app/robots.ts`: generated robots rules and sitemap reference.
- `src/app/manifest.ts`: web app manifest.
- `src/app/opengraph-image.tsx`: generated Open Graph image.
- `src/app/components/Hero.tsx`: entity-focused H1, descriptive hero copy, optimized image attributes, crawlable anchors.
- `src/app/components/ProjectsSection.tsx`: project alt text and descriptive outbound link labels.
- `src/app/components/SkillsSection.tsx`: natural technology/service relevance.
- `src/app/components/ToolsWorkflow.tsx`: broader development stack semantics.
- `src/app/components/AboutSection.tsx`: personal entity content and descriptive portrait alt text.
- `src/app/components/Contact.tsx`: natural Morocco-wide remote service coverage.
- `src/app/components/Navbar.tsx` and `Footer.tsx`: crawlable internal anchors and descriptive logo alt text.

## Core Web Vitals and Mobile Notes

- Test production with PageSpeed Insights and Chrome UX Report data, not only Lighthouse locally.
- Keep the hero image as the priority image; lazy-load project images below the fold.
- Replace `byby.jpg` with a visually equivalent compressed source and compare quality before deployment.
- Limit animation work on mobile and honor `prefers-reduced-motion`.
- Keep visible text in server-rendered HTML. Current section content is rendered in the HTML even where animation controls opacity.
- Do not block Next.js assets in robots.txt; Google needs CSS/JavaScript to render the page.

## Official References

- Next.js metadata files: https://nextjs.org/docs/app/api-reference/file-conventions/metadata
- Next.js sitemap: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
- Google crawling/indexing: https://developers.google.com/search/docs/crawling-indexing
- Ask Google to recrawl: https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
- Google structured data introduction: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- Google structured data policies: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
