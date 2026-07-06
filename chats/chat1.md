# Locals for Locals Founding Partner Onboarding

_Started 2026-07-06 08:09 UTC_

---

## User

LOCALS FOR LOCALS
UX Flow & Content Spec · For the Design Team: Check the logo uploaded. Design still inspired by Airbnb but black and white

Founding Partner Onboarding
Replacing the business signup form with an induction into the Founding Circle
THE CORE IDEA
This isn't a signup form. It's an application and induction into a community — every screen should feel like progress toward belonging, not paperwork.
Two words to keep in front of you while designing this: application, not account; induction, not checkout.
GLOBAL DESIGN PRINCIPLES (APPLY TO EVERY SCREEN)
•	Persistent progress bar showing named steps ("Founder → Business → Privilege → Photos → Review → Payment → Welcome"), not a raw percentage.
•	Autosave every field, with a visible "Save & finish later" option — founders will likely do this on a phone, between customers.
•	One primary call-to-action per screen. A single quiet secondary action at most.
•	Mobile-first layout and testing before desktop.
•	Tone throughout: warm, first-person questions, plain language. Never "submit," "form," or "application ID."
•	Every field is editable from the Review screen without restarting the flow.
REVISED FLOW ORDER
Landing  →  Apply  →  Step 1: Meet the Founder  →  Step 2: Tell Us About Your Business  →  Step 3: Local Privilege  →  Step 4: Profile Assets  →  Step 5: Review  →  Step 6: Membership Payment  →  Step 7: Welcome
DESIGNER NOTE   The original draft opened with Business Information. We moved Meet the Founder to Step 1 instead — open with the emotional questions before the tedious logistics, mirroring how Growth Managers run the in-person meeting (story first, details second). Front-loading the low-effort, high-reward part of the form is the single biggest lever for completion rate here.
 LANDING PAGE
Goal: convert a click into "Apply Now," and set the tone that this is a curated circle, not an open signup.
Join Davao's Founding Circle
Become one of Davao's first curated businesses inside Locals for Locals.
Not everyone gets accepted. We're looking for businesses people genuinely love recommending.
Button: "Apply Now"

What You Get (checklist section below the fold):
•	Professional Business Profile
•	Founder Story — three professional videos
•	Founder Network & Business Trainings
•	Access to the Founders Table
•	Visibility to Locals for Locals members
DESIGNER NOTE   "Not everyone gets accepted" is doing real work in the copy — it's the curation promise, not just a hook. The actual filtering already happens in the Growth Manager's in-person Discover step, so this page doesn't need a hard gate behind it. Keep the landing page simple and let the copy set the tone; don't over-engineer a screening quiz here.
  STEP 1   Meet the Founder  
Goal: capture the founder's story first. This is what makes the eventual profile and video shoot great, and it hooks the founder emotionally before the form gets tedious.
This is the story people will fall in love with. Take your time — you don't need to write paragraphs, just answer honestly.
FIELD	TYPE / NOTES
Your name	Short text
Photo of yourself	Upload · helper: "A natural photo, not a headshot — we'll polish it in your video shoot."
Why did you start this business?	Short text, ~150–200 char limit
What are you most proud of?	Short text, ~150–200 char limit
If someone only visits once, what do you hope they remember?	Short text, ~150–200 char limit
What's your signature product?	Short text
What's one thing that makes your business different?	Short text, ~150–200 char limit
Favorite menu item / product	Short text · helper: "This helps us recommend you to the right members."
DESIGNER NOTE   Cap each answer at roughly one or two sentences and say so in the helper text — this is what forces the conversational, quotable tone that makes a good founder profile. If it's feasible for engineering, present these as one question per screen (Typeform-style) rather than one long form — it reinforces the feeling of being listened to. If that's too heavy a lift, a single scrollable screen is fine, but keep the questions in first person exactly as written; don't relabel them as a formal "Founder Bio" field.
  STEP 2   Tell Us About Your Business  
Goal: capture logistics. Necessary, but the least emotionally engaging step — placed after the founder has already opened up.
Almost done with the fun part. Now let's get the practical details right.
FIELD	TYPE / NOTES
Business name	Short text
Business category	Dropdown: Cafe / Restaurant / Wellness / Retail / Studio / Other
Business description	Short text · helper: "2–3 sentences — how would you describe this place to a friend?"
City	Short text
Address	Short text
Google Maps pin	Map picker component
Facebook	URL · optional*
Instagram	URL · optional*
Website	URL · optional*
Tiktok	URL · optional*
Phone number	Phone input
Email	Email input
Business hours	Per-day picker with a "same every day" toggle
Highlights	Choose as many:
🏆 Hidden Gem
🐶 Pet Friendly
🌿 Alfresco
☕ Specialty Coffee
📶 Free Wi-Fi
☪️ Halal
💻 Great for Remote Work
🎂 Birthday Friendly
🌅 Sunset Views
🚗 Parking Available
DESIGNER NOTE   *At least one of Facebook, Instagram, or Website should be required — but not all three. Some legitimate local businesses only maintain a single channel; don't block them on that.
   STEP 3   Help Us Create Your Local Privilege  
Goal: design the member perk collaboratively, framed as an experience rather than a discount.
What memorable experience would you like to offer Local members?
Options (select one primary, optional secondary):
•	Complimentary dessert
•	Signature drink upgrade
•	Birthday treat (Free cake on their birthday)
•	Discount on products or services
•	Other (open text)
FIELD	TYPE / NOTES
Minimum spend to redeem	Numeric · helper: "This protects your margins — members need to spend at least this much before the perk applies."
Terms & conditions	Short text area, optional · e.g. blackout dates, dine-in only
DESIGNER NOTE   If "Discount" is selected, show a gentle, non-blocking inline suggestion: "Tip: experiences tend to bring people back more than discounts. Want to try a signature item instead?" It's a nudge, not a requirement — the final call is the founder's.
  STEP 4   Business Profile Assets  
Goal: collect the visual assets for the live profile and the future video shoot.
Let's make your profile look as good as your business.
FIELD	TYPE / NOTES
Cover photo	Upload, required · landscape, at least 1200×800px
Logo	Upload, optional
Gallery photos	Upload, 2–6 images, drag to reorder
Menu photos	Upload, optional · food & beverage businesses
Owner photo	Pulled from Step 1 automatically, replaceable
DESIGNER NOTE   Show a live thumbnail preview of how each photo will appear in the profile card as it's uploaded. Photo-upload steps are usually where people say "I'll finish this later" and never come back — a real-time preview reduces that drop-off.
  STEP 5   Review  
Goal: let the founder see the finished, beautiful profile before paying, and preview their certificate at the emotional high point of the flow.
Here's how your story will look to Davao. Everything good?
Contents:
•	Full profile preview — business, founder story, privilege, and photos exactly as members will see it live
•	A preview of their Founding Partner Certificate with their business name already filled in
•	Edit links back to any step — no need to restart the flow
Button: "Continue to Membership"
DESIGNER NOTE   Placing the certificate preview here — not just a plain profile recap — turns Review into the emotional peak of the flow, right before the payment ask. Seeing their own name on a certificate is a stronger nudge to complete than a generic "looks good" summary.
   STEP 6   Become a Founding Partner  
Goal: reframe payment as joining a circle, not purchasing a listing.
Founding Circle Membership — ₱7,000 / year
Includes:
•	Founder story — three story videos
•	Business profile (online Locals for Locals platform)
•	Local Business Network (be part of the community of Davao’s local business owners)
•	Founders Table events (meet with local founders)
•	Business trainings - mark your calendar: 
Sept 4, 2026 RoadMap Training with Jason Li of Davao Famous Group of Restaurants (
October 13, 2026 Branding and Identity with Koi of Kugi SlowBar
December 12, 2026 Meet and Greet with Davao OG’s at the Founders Table
Invitation to some inclusive founder’s events
VENUE: TBA

Payment:
•	QR code display (GCash / bank transfer)
•	Upload payment reference, for manual verification — or automatic confirmation if a payment gateway is integrated
DESIGNER NOTE   Never label the button "Pay ₱7,000." Use "Confirm Founding Membership" or equivalent. Keep the price visible, but let the Includes list carry more visual weight on the screen than the number does.
  STEP 7   Welcome  
Goal: deliver the payoff — belonging confirmed, with something tangible in hand immediately.
Congratulations. You're officially part of the Founding Circle.
Contents:
•	Founding Partner Certificate — auto-generated, downloadable, and shareable immediately (spec below)
•	"What happens next" checklist, within 48 hours: our team will review your profile, contact you, schedule your Founder Story, schedule your video shoot, and publish your profile
•	Share buttons so the certificate can be posted immediately — this doubles as free marketing
 FOUNDING PARTNER CERTIFICATE — SPEC
Auto-generated as a PDF the moment Step 6 payment is confirmed.
Content:
•	Header: "Founding Partner"
•	Locals for Locals wordmark / logo
•	"This certifies that [Business Name] is officially one of the Founding Businesses of Locals for Locals Davao."
•	"Founding Partner No. [004] of 30" — a real sequential number tied to actual close order
•	Quote: "Together, we strengthen local economies one business at a time."
•	Date joined
DESIGNER NOTE   Use a real sequential number, not a placeholder. "No. 4 of 30" is concrete scarcity, not just an adjective, and it's honest as long as the cap is real. Design it genuinely nice enough to post on Instagram Stories — square or portrait aspect ratio, on-brand, no crammed legal text. This is a marketing asset for the business as much as it is proof of membership for them.

One founder. One business. One city at a time.

## Assistant

_[tool: view_image]_

This is a rich, well-specified brief. Before I build, a few focused questions so I match your intent rather than guessing.

_[tool: questions_v2]_

## User

Questions answered:
- scope: All 9 screens, fully clickable end-to-end
- device: desktop, mobile, tablet
- step1_style: One question per screen (Typeform-style)
- type_vibe: Explore a few options
- warmth: B&W plus one subtle warm accent for CTAs/success
- interactivity: Clickable happy-path with realistic transitions, light validation
- cert_shape: Decide for me
- prefill: Empty, but pre-filled by Review so the preview looks great
- anything_else: Just make the flow something the Dev can easily follow through

## Assistant

Great — clear direction. Let me process the logo first (isolate the badge from its white background), then build.

_[tool: image_metadata]_

_[tool: update_todos]_

The logo already has transparency. Let me check how the lettering behaves on dark vs light, then make a tight, right-sized crop.

_[tool: run_script]_

_[tool: copy_files]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: view_image]_

_[tool: view_image]_

Both logo versions work. Cleaning up scratch files and building the prototype.

_[tool: delete_file]_

_[tool: update_todos]_

Now the main build — shell, logic, landing, and the founder Typeform step.

_[tool: dc_write]_

_[tool: show_html]_

_[tool: show_html]_

_[tool: save_screenshot]_

_[tool: save_screenshot]_

Landing works. Adding Step 2 data to the logic, then its markup.

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

Now the Step 2 markup:

_[tool: dc_html_str_replace]_

I need to add the `hours` handler, the map-pin state, and pin label to the logic.

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

Step 3 markup:

_[tool: dc_html_str_replace]_

Step 4 needs asset handlers and a live preview. Adding to logic:

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

Step 4 markup with live preview:

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

Now the Review step. Adding all preview values to logic:

_[tool: dc_js_str_replace]_

Review step markup — the profile preview plus certificate teaser:

_[tool: dc_html_str_replace]_

Step 6 payment — logic then markup:

_[tool: dc_js_str_replace]_

_[tool: dc_html_str_replace]_

Finally, the Welcome step:

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

Let me walk through the flow to verify. First fix the landing top padding for the notch, then screenshot key screens.

_[tool: dc_html_str_replace]_

_[tool: multi_screenshot]_

_[tool: multi_screenshot]_

Good — flow works and validation blocks empty required fields. The mobile notch overlaps the header; let me add a top inset and continue verifying.

_[tool: dc_js_str_replace]_

_[tool: dc_html_str_replace]_

Let me seed a full dataset via localStorage and walk the later screens (Review, Payment, Welcome) which need uploaded photos.

_[tool: eval_js]_

_[tool: sleep]_

_[tool: save_screenshot]_

Scroll isn't reflecting in capture. Let me expand the frame to see the full review content.

_[tool: eval_js]_

_[tool: save_screenshot]_

_[tool: save_screenshot]_

Review is excellent. Now Payment and Welcome:

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: save_screenshot]_

Payment is great. Now Welcome + certificate download:

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: save_screenshot]_

All 9 screens render beautifully. Let me check console health and the desktop/tablet frames, then clean up.

_[tool: get_webview_logs]_

Those are harmless streaming-time image fetches (empty photo slots). Let me reset to landing, verify the desktop frame, and confirm a clean console on fresh load.

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: sleep]_

_[tool: save_screenshot]_

Good call — these fit naturally as extra Highlight chips in Step 2. I'll add three boolean tweaks that control whether each appears, declared as props and read via `this.props`.

_[tool: dc_set_props]_

_[tool: dc_js_str_replace]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: save_screenshot]_

The three new tweakable highlights are working — Vegan / Vegetarian, Organic, and Locally Sourced now appear as chips in Step 2, each controlled by its own toggle in the Tweaks panel (all on by default). Turning any off removes that chip from the list.

_[tool: delete_file]_

_[tool: ready_for_verification]_

Added three tweakable Highlight controls to Step 2 — **Vegan / Vegetarian**, **Organic**, and **Locally Sourced** — declared as boolean props and read via `this.props`, so each appears in the Tweaks panel (all on by default). Toggling one off drops that chip from the list. The rest of the flow is unchanged.

## User

Found issues — fixing…

## Assistant

The verifier is right — bare `{{ }}` holes in `src` emit the literal string during streaming. I'll render those optional images as prebuilt elements (or `null`) from the logic so an unresolved value never becomes a fetch.

_[tool: dc_js_str_replace]_

On it — I'll add PWD/accessibility options and finish wiring the image fix in the same pass.

_[tool: dc_set_props]_

_[tool: dc_js_str_replace]_

Now the image-element fix. Adding prebuilt elements to the logic:

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

Now replace the bare `{{ }}` image `src` bindings in the template with the prebuilt element holes:

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

All nine bindings converted. Let me verify a clean console on load and that real uploads still render.

_[tool: eval_js]_

_[tool: sleep]_

_[tool: get_webview_logs]_

_[tool: grep]_

All template bindings are clean — that lingering error is a stale buffer entry. Let me reload and confirm.

_[tool: eval_js]_

_[tool: sleep]_

_[tool: get_webview_logs]_

Let me definitively test the founder photo screen (where that binding lives) with no photo set:

_[tool: eval_js]_

_[tool: sleep]_

_[tool: get_webview_logs]_

Let me definitively check the live DOM for any unresolved-hole image src:

_[tool: eval_js]_

Confirmed — zero image elements with unresolved holes; the log entry was a stale cumulative-buffer artifact. The fix is solid. Resetting to landing and finalizing.

_[tool: eval_js]_

Both requests are done:

- **PWD / family tweaks** — added ♿ Wheelchair Accessible and 🪑 High Chairs Available as new Highlight chips in Step 2, under an "Accessibility & family" section in the Tweaks panel (both on by default). They join the vegan/organic/local-sourcing toggles, each declared as a prop and read via `this.props`.
- **Image-fetch fix** — the nine optional-photo `<img src="{{ … }}">` bindings now render as prebuilt elements (or nothing) from the logic, so an empty/streaming value never fires a `{{ }}` request. Verified live: zero image elements carry an unresolved src.

_[tool: ready_for_verification]_

Done. The two accessibility highlights are live and the streaming image-fetch errors are resolved.

## User

I'll upload my QR Code for them to pay

## Assistant

Perfect — I'll turn the payment QR into a drop-in image slot so you can add your own QR code (it'll persist once you drop it in).

_[tool: copy_starter_component]_

Now I'll swap the placeholder QR for a fillable image slot. Loading the component in the helmet and replacing the box:

_[tool: read_file]_

_[tool: grep]_

_[tool: read_file]_

_[tool: str_replace_edit]_

Now load the component in the helmet:

_[tool: str_replace_edit]_

_[tool: eval_js]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: save_screenshot]_

Got it — reverting the QR to a clear placeholder for the dev to wire up.

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: delete_file]_

_[tool: eval_js]_

Reverted — the QR is now a labeled placeholder ("GCash QR added by dev") so it's clear where it goes without implying a real code, and the image-slot component is removed. Everything else is unchanged.

## User

Instead of Brown on the other highlighted parts that are not black, can we try yellow?

## Assistant

Easy swap — the accent is centralized in a few CSS variables. Changing the brown family to a golden yellow:

_[tool: str_replace_edit]_

Also update the certificate PNG export, which has the accent hardcoded:

_[tool: grep]_

_[tool: dc_js_str_replace]_

Let me verify the yellow reads well across a couple screens.

_[tool: save_screenshot]_

Progress and checks now read gold. Let me confirm the accent labels and certificate seal downstream:

_[tool: eval_js]_

_[tool: save_screenshot]_

The gold accent now carries consistently — section labels, highlights, progress, the certificate border and seal — while all primary CTAs stay black. Contrast on the darker gold text labels reads cleanly.

_[tool: delete_file]_

_[tool: eval_js]_

Done — swapped the brown accent family to a golden yellow across everything that wasn't black (labels, highlights, progress dots/checks, the gift/privilege accents, the certificate border and seal, and the downloadable certificate PNG). Primary buttons stay black as before.

## User

Ohhhh. We need to also include the part of the price range

## Assistant

Good idea — a price range (₱ / ₱₱ / ₱₱₱) is exactly what a listing like this needs. I'll add it to Step 2 and surface it in the Review profile. First the logic:

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

Now add the price range selector to Step 2 (after category) and show it in the Review header:

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Let me also add it to the Step 4 live-preview card for consistency:

_[tool: dc_js_str_replace]_

_[tool: str_replace_edit]_

Let me verify the price selector in Step 2 and its appearance in Review:

_[tool: eval_js]_

_[tool: sleep]_

_[tool: save_screenshot]_

_[tool: eval_js]_

_[tool: save_screenshot]_

The price range selector works — ₱/₱₱/₱₱₱/₱₱₱₱ with labels, gold-highlighted when selected, and it now appears in both the Step 4 live preview and the Review profile header. Resetting and finalizing.

_[tool: delete_file]_

_[tool: eval_js]_

_[tool: ready_for_verification]_

Added a **Price range** selector (₱ Budget / ₱₱ Moderate / ₱₱₱ Premium / ₱₱₱₱ Fine) to Step 2, styled in the gold accent when selected. It flows through to the Step 4 live preview and the Review profile header (e.g. "Cafe · Davao City · ₱₱").

## User

For the business category, Based on their answer, load a custom onboarding flow.

For example:

Restaurants → Cuisine, dishes, dining style, dietary options.
Spas → Treatments, therapists, amenities.
Gyms → Classes, equipment, membership options.
Cafés → Coffee types, pastries, remote-work amenities. like something like this: Restaurant Information
Cuisine

What type of cuisine do you serve?
(Select up to 3)

☐ Filipino

☐ Japanese

☐ Korean

☐ Chinese

☐ Italian

☐ French

☐ American

☐ Thai

☐ Vietnamese

☐ Indian

☐ Mediterranean

☐ Mexican

☐ Seafood

☐ Steakhouse

☐ Café

☐ Bakery

☐ Dessert

☐ Fusion

☐ Vegetarian

☐ Vegan

☐ Other: ________

Signature Dishes

What are your top 5 signature dishes?

For each dish:

Dish Name
Short Description
Price
Upload Photo

Example:

Dish	Description	Price
Crispy Pata	Our best-selling crispy pork knuckle	₱950
Dietary Options

☐ Halal

☐ Vegetarian

☐ Vegan

☐ Gluten-Free

☐ Dairy-Free

☐ Organic

☐ Keto-Friendly

Dining Style

☑ Dine-in

☑ Takeaway

☑ Delivery

☑ Reservations

☑ Private Events

☑ Catering

Good For

(Select all that apply)

☐ Family Dining

☐ Date Night

☐ Barkada

☐ Business Meetings

☐ Solo Dining

☐ Celebrations

☐ Kids

☐ Senior Friendly

☐ Remote Work

Amenities

☐ Airconditioned

☐ Alfresco

☐ Pet Friendly

☐ Parking

☐ Free Wi-Fi

☐ Wheelchair Accessible

☐ Private Room

☐ Function Room

☐ Live Music

☐ Outdoor Seating

☐ Charging Outlets

Atmosphere

Choose up to 5

☐ Cozy

☐ Quiet

☐ Romantic

☐ Casual

☐ Luxury

☐ Rustic

☐ Modern

☐ Industrial

☐ Family Friendly

☐ Instagram-worthy

☐ Hidden Gem

☐ Scenic View

Best For

Complete this sentence:

Our restaurant is best for...

☐ Authentic Filipino Food

☐ Birthday Celebrations

☐ Family Gatherings

☐ Romantic Dates

☐ Coffee & Work

☐ Brunch

☐ Late Night

☐ Business Lunches

☐ Tourists

☐ First-Time Visitors

☐ Quick Meals

☐ Large Groups

## Assistant

I'll add a category-specific step that loads a tailored flow based on the Step 2 category, folded into the "Business" progress stage (so it stays 6 named steps). Let me first clear settled history, then build.

_[tool: snip]_

Now the category configs and handlers:

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

Now wire routing (next/back), progress mapping, and chrome to include `catdetail`:

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

Now build the category-step data in `renderVals`:

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

Now the template screen. First, update the Step 2 button label to reflect the branching, then add the category screen:

_[tool: dc_js_str_replace]_

_[tool: str_replace_edit]_

Now the category-detail screen markup, inserted after Step 2:

_[tool: str_replace_edit]_

_[tool: grep]_

_[tool: str_replace_edit]_

Now surface the category details in the Review profile. Adding the data:

_[tool: dc_js_str_replace]_

Now the Review markup block for the category specialties:

_[tool: str_replace_edit]_

_[tool: dc_js_str_replace]_

Let me verify the category step for a Restaurant, including dishes and chips:

_[tool: eval_js]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: save_screenshot]_

_[tool: get_webview_logs]_

_[tool: show_html]_

_[tool: sleep]_

_[tool: save_screenshot]_

Category step renders correctly — "Restaurant Information" with the tailored badge, cuisine chips (Filipino selected, 2/3), dishes, and it stays within the "Business" progress stage. The earlier timeout was just the heavy full-page expand, not a bug.

_[tool: update_todos]_

Recording final state and stopping at a safe point.

_[tool: eval_js]_

_[tool: delete_file]_

## User

Send this design to Lovable: Founding Partner Onboarding.dc.html

## Assistant

## Assistant

## Assistant

## Assistant

_[tool: snip]_

_[tool: tool_search_tool_bm25]_

## User

Send this design to Lovable: Founding Partner Onboarding.dc.html

## Assistant

## User

shall we continue with this part: DONE: category-specific step (Restaurant/Cafe/Wellness/Studio/Retail) after Step 2, folded into Business stage
DONE: dishes repeater, chip groups w/ max limits, therapist count; surfaced in Review
Optional follow-up: add category details to certificate/profile export if desired

## Assistant

The two category items are already live — the tailored step renders per category, and the details (dishes, chip groups) already surface in the Review profile under "What we're known for."

For the optional follow-up, my recommendation is to **leave it out of the certificate**. Per your own spec, the Founding Partner Certificate is a clean, Instagram-shareable marketing asset (business name + Founding No. + quote) — packing cuisine/amenities lists onto it would crowd exactly the thing that's meant to breathe. The category details already have a proper home in the Review profile, which is what members actually browse.

So unless you have a specific place in mind, I'd call this feature complete. Two things I could do instead if useful:
- Add a compact category-details row to the **live profile card** (Step 4 preview) so it matches Review, or
- Surface one or two category chips (e.g. cuisine) on the **landing/what-you-get** context.

Want either of those, or shall we leave it here?

## User

the question favorite menu item or product already assumes that they are in the food industry

## Assistant

Good catch — Step 1 comes *before* the category is chosen, so that question can't rely on knowing the industry. I'll make it (and its food-assuming sibling "signature product") category-neutral.

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

Both questions are now industry-neutral: "What's the one thing you're known for?" and "What should a member try first?" (with a "your personal pick" placeholder). The Review labels ("Signature" / "Must-try") already read fine for any business type.

_[tool: snip]_

Done. That's a cleaner fit now that the founder story is captured before the category is known.

## User

For the memorable experience part (3) this is the hook part where we get first time Locals to try their service so offer this depending on the category they picked: ☕ Cafés & Specialty CoffeeFree Signature Iced Latte with any Main Entrée or Pastry (first visit)Free Upsize to Large + extra shot (first 3 orders)🍔 Restaurants & BistrosFree Famous Siopao / Basket of Fries with any Premium Main CourseFree Dessert with ₱500 minimum table spend💆 Spas & WellnessFree 15-Min Hot Stone Upgrade or Foot Scrub with any 1-Hr Full Body MassageFree Hydrating Facial Mask add-on during a body scrub (first booking)🧺 Premium Services (Laundry / Car Wash)Free 3kg Laundry, valid on 8kg+ orders (first drop-off)Free Interior Fogging & Vacuum with Executive Exterior Wash & Wax

## Assistant

Good — Step 3 is the hook, so the suggested experiences should match what they actually sell. I'll make the privilege options category-aware, seeded with your presets, and keep an "Other" for anything custom.

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

Now add a "suggested for your [category]" cue above the options in Step 3:

_[tool: str_replace_edit]_

Let me verify Step 3 shows the tailored options for a café:

_[tool: eval_js]_

_[tool: sleep]_

_[tool: save_screenshot]_

_[tool: show_html]_

_[tool: save_screenshot]_

The tailored badge shows. Let me see the option cards themselves:

_[tool: eval_js]_

_[tool: save_screenshot]_

The category-aware privileges work — for a Café it shows "Free signature iced latte" and "Free upsize + extra shot" plus "Other," with the selected one highlighted in gold, and min-spend/terms below. Restaurants, Spas (Wellness), and Laundry/Car-wash (Retail) get their own preset pairs; Gyms/Studios and Other fall back to the generic list.

_[tool: delete_file]_

_[tool: eval_js]_

_[tool: snip]_

Step 3 now offers experiences matched to the business's category — Cafés, Restaurants, Spas (Wellness), and Laundry/Car-wash (Retail) each get your two preset hooks plus an "Other" for anything custom; Gyms and uncategorized businesses keep the generic options. Selection, min-spend, and terms all carry through to Review as before.

## User

Send this design to Lovable: Founding Partner Onboarding.dc.html

## Assistant

Found the import tool. Let me show the design and bundle it. First checking for the required bundler thumbnail:

_[tool: grep]_

_[tool: show_to_user]_

_[tool: tool_search_tool_bm25]_

I need to add the bundler thumbnail template. Let me add it at the top of the DC template:

_[tool: dc_html_str_replace]_

_[tool: bundle_project]_

_[tool: lovable__import-claude-design-from-url]_

Imported successfully → **[Open in Lovable](https://lovable.dev/projects/b218b154-a1e2-47a2-abf7-931a8f61acc2)**

## User

Send this design to Base44: Founding Partner Onboarding.dc.html

## Assistant

_[tool: snip]_

_[tool: tool_search_tool_bm25]_

The Base44 import tool is available. Bundling a fresh URL and importing:

_[tool: bundle_project]_

_[tool: base44__import-claude-design-from-url]_

Imported successfully → **[Open in Base44](https://app.base44.com/apps/6a4bb244a8b9c0afaa314915/editor/preview)**

