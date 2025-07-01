**PostCrafter – UI Screens Summary (English Version)**

---

> **Tech Notes:**
> - Development begins using **Lovable**, synchronized with **GitHub**
> - **Cursor IDE** will be used in parallel, primarily for UI and design work
> - **Lovable** will manage logic and backend connections (Supabase, n8n, Google, LinkedIn, PayPal)
> - Uses **PayPal** for payments
> - Uses **Supabase** for managing users, posts, subscriptions, and external service connections
> - **n8n** is responsible solely for AI-based content creation workflows
> - All frontend code should be written in **HTML, CSS, and vanilla JavaScript** (no external libraries)

---

### 1. Landing Page
A marketing-focused page showcasing the benefits of PostCrafter, featuring a main headline, call-to-action, short demo video, pricing section, user testimonials, and a Google Sign-In button.

---

### 2. Dashboard
Main screen after login: displays subscription status, usage statistics, navigation menu, shortcuts to key actions, and a preview of recent posts.

---

### 3. Create Post
Input field for post idea (prompt), with tone and style selection, and a generate button. A subtle banner is shown if user profile info is missing, prompting to update their profile.

---

### 4. Post Preview + Approval
Preview screen of the generated post, including "Approve", "Edit", "Delete", and "Copy" buttons. Allows publishing or saving as a draft.

---

### 5. Posts History
List of all generated posts, sorted by date. Includes search and filter options (tags, status) and shows publishing status.

---

### 6. LinkedIn Connection
OAuth-based login to LinkedIn. Displays connection status and a disconnect option. Includes toggle for enabling auto-publishing.

---

### 7. Pricing & Subscription
Choose between two plans: $5/month (up to 8 posts) or $10/month (unlimited). Payment is processed via PayPal.

Users on the basic plan will see a "Upgrade to Pro" button across most screens. All users can upgrade or downgrade their plan at any time via the settings or pricing page.

---

### 8. Account Settings
Edit personal details, update business profile (industry, tone, goals), adjust content preferences, cancel or change subscription.

---

### 9. Terms of Service & Privacy Policy
Static page detailing the terms of use, privacy policy, data usage, and legal information. Linked in the footer and shown during sign-up/payment flows.

---

### 10. Error / 404 / Payment Failed
Fallback screens for unexpected issues: page not found, failed payment, or other errors. Includes a return-to-dashboard option.

---

### 11. Admin Panel (Optional)
(Admin-only screen) Allows viewing user list, posts, issues, analytics, and performing manual interventions with subscriptions or stuck posts.


