# 🚀 LEGEZT - DEVELOPMENT PROGRESS & AGENT HANDOFF LOG

> [!IMPORTANT]
> ### 📢 ATTENTION ALL FUTURE AI AGENTS! (MUST READ BEFORE WRITING CODE)
> This file is the **Source of Truth** for the LeGeZt project. When you enter a new chat session, you **must read this file first** to understand the exact status of the codebase, completed milestones, and remaining backlog.
> 
> **CRITICAL RULE**: Whenever you make *any* changes to the project (code modifications, API route creations, styling updates, build configurations, or deployment tasks), **you are strictly required to update this file immediately**. Keep the logs, completed milestones, and backlog 100% current and organized. Do not skip this!

---

## 📅 Last Updated: July 16, 2026 (v3.5 - Azure-to-AWS Migration & S3 Storage Integration)

---

## 🛠️ Current Project Architecture
- **Student Mobile App**: Native Android application (`legezt-student`) written in Kotlin, built with Jetpack Compose & Material 3. Handles secure exams, offline documents, college messaging, and direct background polling.
- **Portal Web App**: Next.js & TypeScript web application (`portal`) hosted at [portal.mrlegezt.me](https://portal.mrlegezt.me/). Built using Prisma ORM. Handles student profiles, document uploads, and surprise exam scheduling.
- **Backend API**: Node.js API server (`backend`) hosted at [legezt-backend-api.azurewebsites.net](https://legezt-backend-api.azurewebsites.net/).
- **Live Installer APK Link**: [portal.mrlegezt.me/update.apk](https://portal.mrlegezt.me/update.apk) — hosted directly on Azure-deployed Next.js portal (bypasses Google Drive virus warning screens).
- **Current APK Version**: `versionCode = 16`, `versionName = "1.9.2"` (Automated In-App Updater build).

---

## 🏆 Completed Milestones & Feature Registry

### 1. In-App Programmatic Update & Direct Installer (New!)
- **Goal**: Allow students to get immediate notifications of updates and install them seamlessly within the app without opening an external browser.
- **Portal API**: Created a public Next.js API route `/api/app-version` in the portal backend that returns the latest version details and raw APK direct download link.
- **Android Manifest**: Declared `uses-permission android:name="android.permission.REQUEST_INSTALL_PACKAGES"` for programmatic sideloading.
- **FileProvider Sharing**: Configured FileProvider (`androidx.core.content.FileProvider`) under authority `${applicationId}.fileprovider` and created `res/xml/file_paths.xml` for secure APK installation handling.
- **Atomic Downloading**: Refactored the download pipeline inside `StudentViewModel.kt` to follow HTTP redirect rules and display real-time linear download progress (`0-100%`).
- **Direct Binary Hosting**: Hosted the `update.apk` binary directly inside the portal Next.js public directory (`portal/public/update.apk`) available at `https://portal.mrlegezt.me/update.apk`. This bypasses Google Drive's virus warning HTML screens completely, preventing parse errors ("There was a problem parsing the package") during installer triggering.
- **Trigger Installer**: Launches a native `ACTION_VIEW` intent with `FLAG_GRANT_READ_URI_PERMISSION` on the downloaded APK, bringing up Android's package installer screen automatically.
- **Compose Interface & Active Sync**: Created `UpdateOverlay.kt` globally integrated in `MainActivity.kt`'s root Container Box to show the update prompt on top of any active screen (Splash, Login, Main, etc.). Integrates with `refreshDomainData` inside `StudentViewModel.kt` to actively check for updates on data-synchronization.

### 2. PDF & Document Loading Speed Optimization (New!)
- **Goal**: Resolve the 1-2 minute lag when opening files, making documents load in under 0.1s.
- **On-Demand Lazy Rendering**: Replaced eager full-document pre-rendering inside `DocumentsAndPdfViewer.kt` with dynamic rendering.
- **Thread-Safe Rendering Mutex**: Implemented `PdfPageRenderer` using a `Mutex` to serialize native page rendering asynchronously on `Dispatchers.IO` (as Android's `PdfRenderer` is not thread-safe).
- **Jetpack Compose Lazy loading**: Built `PdfPageItem` to trigger page bitmap rendering only when the page scrolls into view, automatically garbage-collecting off-screen bitmaps.
- **Persistent Caching**: Updated `StudentViewModel.kt`'s `downloadAndOpenPdf()` to check if the target file already exists in the cache folder (`context.cacheDir`). Bypasses network completely for instant offline views.
- **Atomic Temp-Rename Protocol**: Writes download streams to `.tmp` files and renames to final filenames only upon 100% completion, protecting the app from opening partially downloaded files.

### 3. Registration Flow Validation Fixes
- **Goal**: Resolve case-sensitive Zod validation mismatch on the backend (e.g. `cse` vs `CSE`) during student enrollment.
- **UI Dropdowns**: Replaced free-form text input fields for `Branch` and `Year` with beautiful read-only Jetpack Compose `DropdownMenu` selectors in `SplashAndLoginScreens.kt` (`RegistrationOverlay`).
- **Retrofit Exception Parsing**: Implemented specific `retrofit2.HttpException` catches in `StudentViewModel.kt` (`verifyOtpAndReset()` and `registerNewStudent()`), parsing raw server JSON errors `{"error": "message"}` to show exact, meaningful feedback to students.
- **Smart Toast Timing**: Configured Toast observer in `MainActivity.kt` to automatically use `Toast.LENGTH_LONG` (5s) for messages longer than 50 characters, ensuring students have time to read registration guidelines.

### 4. Direct SMTP Email Verification Integration
- **Goal**: Achieve 100% direct inbox placement for Lords email verification links.
- **Setup**: Migrated portal's SMTP relay from Namecheap Private Email to Gmail SMTP (`smtp.gmail.com`) using a Google App Password for verified `@lords.ac.in` domains. Updated portal env configuration on Azure.

### 5. Automated Sideloading & Google Drive Deployment
- **Goal**: Enable silent 1-click updates of the compiled app to Google Drive.
- **Tooling**: Added `android.injected.testOnly=false` in `gradle.properties` to allow sideloading on Samsung and other devices.
- **Upload Script**: Created `gdrive_upload.py` using Google OAuth2 desktop credential tokens to automatically overwrite the live APK under file ID `16AIqV0cCbOjIHUMn6lpVRV2nK_V_g3HO` without changing the student download link.

### 6. WhatsApp-like Message Studio & Friend Request System (New!)
- **Goal**: Implement a clean, high-end messaging panel and friendship security gatekeeper on both the web portal and Android app.
- **Friendship Gates**: Chats between students are locked until a friend request is sent and **ACCEPTED**. Faculty advisors can be messaged directly without requests.
- **Web Message Studio**: Rebuilt [page.tsx](file:///C:/Users/mdjib/Desktop/legezt/portal/app/student/messages/page.tsx) into a gorgeous full-screen desktop interface. Supports tabbed sidebars (`Chats`, `Friends`, `Requests`), online-status badges, message quotes/replies, large emojis, and pre-coded custom college sticker sheets.
  - **Scrollbar Physics Fix**: Resolved double-scrollbar bug by dynamically toggling `overflowY: isMessagesPage ? "hidden" : "auto"` on the main content wrapper inside [StudentShell.tsx](file:///C:/Users/mdjib/Desktop/legezt/portal/app/student/StudentShell.tsx) and setting the Messages page viewport to a strict `100%` height. This enables independent, smooth scroll panes for the sidebar and conversation column without scrolling the entire website viewport.
- **Android Chat Center & Robust parsing**: Refactored `AdvisorMessagingAndServices.kt`'s [ChatScreen](file:///C:/Users/mdjib/Desktop/legezt/legezt-student/app/src/main/java/com/example/ui/screens/AdvisorMessagingAndServices.kt) to feature custom tab switching, classmate searches, in-app notifications, and expandable sticker selection.
  - **Moshi Robustness Fix**: Added fallback default parameter values for `email = ""`, `branch = ""`, and `year = 1` in `StudentModels.kt`'s [Student](file:///C:/Users/mdjib/Desktop/legezt/legezt-student/app/src/main/java/com/example/models/StudentModels.kt) model. This eliminates silent `JsonDataException` crashes during parsing of partial database fallback user objects, enabling the Chats tab to display classmate connections successfully.
- **Rich Messaging Engine & Optimistic Updates**: Supports custom sticker URLs, self-relation parent message quotes in Retrofit classes [StudentModels.kt](file:///C:/Users/mdjib/Desktop/legezt/legezt-student/app/src/main/java/com/example/models/StudentModels.kt), friends API endpoints in [ApiService.kt](file:///C:/Users/mdjib/Desktop/legezt/legezt-student/app/src/main/java/com/example/services/ApiService.kt), and active in-app sound feedback in [StudentViewModel.kt](file:///C:/Users/mdjib/Desktop/legezt/legezt-student/app/src/main/java/com/example/services/StudentViewModel.kt).
  - **Optimistic UI Engine**: Added real-time message appends inside `sendMessageExtended()` in [StudentViewModel.kt](file:///C:/Users/mdjib/Desktop/legezt/legezt-student/app/src/main/java/com/example/services/StudentViewModel.kt). Immediately renders message bubbles locally with zero lag and seamlessly replaces them when the server acknowledges delivery, matching the instantaneous feel of WhatsApp.
  - **Zod Case-Insensitive Expansion**: Upgraded Next.js `/api/messages` endpoint [route.ts](file:///C:/Users/mdjib/Desktop/legezt/portal/app/api/messages/route.ts) to accept case-insensitive enum roles `["student", "faculty", "STUDENT", "FACULTY"]` and normalized inputs before DB queries to prevent Retrofit `400 Bad Request` crashes.

### 7. Premium Settings Overlay & Account Personalization (New!)
- **Goal**: Empower students to customize their app profile details, display names, and theme preferences.
- **Settings Overlay Dialog**: Built a sleek, premium slide-in Settings Dialog screen inside [AdvisorMessagingAndServices.kt](file:///C:/Users/mdjib/Desktop/legezt/legezt-student/app/src/main/java/com/example/ui/screens/AdvisorMessagingAndServices.kt) launched via a settings gear icon in the profile screen header.
- **Custom Display Name Edit**: Allows instant real-time changes to the student's name, persisted both in-memory and inside SharedPreferences cache structures.
- **Local Photo Upload (DP)**: Integrates native Android picture picker activity launchers (`GetContent`) to load any image from the phone's gallery, copy it as a robust local file inside the cache directory, and persist its file path as `storedDpUri` inside SharedPreferences for fast offline rendering.
- **Theme Selection**: Seamlessly switches between "Light", "Dark", and "Midnight" color tones.

### 8. Real-Time Message Auto-Polling (New!)
- **Goal**: Messages appear automatically inside the Android app without the student needing to manually swipe/refresh.
- **Background Poll Loop**: Added `messagePollJob` (`Job?`) variable and `startMessagePolling(recipientId)` private function inside [StudentViewModel.kt](file:///C:/Users/mdjib/Desktop/legezt/legezt-student/app/src/main/java/com/example/services/StudentViewModel.kt). Uses a `while(true)` coroutine loop on `Dispatchers.IO` with a `5_000ms` delay between API calls.
- **Smart Diff Guard**: Only triggers Compose recomposition when `fresh.size != _messages.value.size` OR the last message ID changes — preventing unnecessary UI flicker/rebuilds on identical data.
- **Lifecycle-Safe**: `messagePollJob` is cancelled automatically whenever `selectChatRecipient()` is called with a new/null recipient, preventing ghost polls for stale conversations. The loop also self-terminates if `_activeChatRecipient.value?.id != recipientId`.
- **Version**: Bumped `versionCode` to `12`, `versionName` to `"1.7"` in `build.gradle.kts` and `app-version/route.ts`.

### 9. NVIDIA AI Studio Integration (New!)
- **Goal**: Integrate high-end NVIDIA LLaMA 3.3 70B text generation and FLUX.1-dev image generation directly into the Android application and web portal.
- **Portal Proxies**: Implemented server-side proxies at `/api/ai/chat` and `/api/ai/image` using secure Azure environment keys (`NVIDIA_TEXT_API_KEY`, `NVIDIA_IMAGE_API_KEY`) to prevent key exposure.
- **Android Integration**: 
  - Added Retrofit endpoint declarations in [ApiService.kt](file:///C:/Users/mdjib/Desktop/legezt/legezt-student/app/src/main/java/com/example/services/ApiService.kt).
  - Developed full AI Chat ViewModel orchestration with optimistic messages and progress indicators in [StudentViewModel.kt](file:///C:/Users/mdjib/Desktop/legezt/legezt-student/app/src/main/java/com/example/services/StudentViewModel.kt).
  - Designed the premium dark-themed [AiStudioScreen.kt](file:///C:/Users/mdjib/Desktop/legezt/legezt-student/app/src/main/java/com/example/ui/screens/AiStudioScreen.kt) complete with base64 image rendering, loading dots animations, suggestion chips, and error banners.
  - Integrated AI Studio into [MainShell.kt](file:///C:/Users/mdjib/Desktop/legezt/legezt-student/app/src/main/java/com/example/ui/shells/MainShell.kt) under tab index 5 (sparkle/AI navigation icon).
- **Version Release**: Bumped `versionCode` to `13`, `versionName` to `"1.8"` in `build.gradle.kts` and `/api/app-version` route to trigger updates for all students.

### 10. Web AI Studio Overhaul & Sidebar Icon Modernization (v1.9 Build — New!)
- **Goal**: Revamp the Web AI Studio page into a premium Google Gemini design layout, remove all emojis, and replace them with clean, modern SVGs.
- **Home State Welcome Screen**: Added a personalized greeting `Hello, {studentName}` in animated gradients, coupled with a 2x2 grid of modern suggestion cards featuring interactive hover states.
- **Symmetric Centering**: Centered both conversation cards and the floating glassmorphic prompt input bar to a clean max-width of `820px` to prevent stretching on desktop monitors.
- **Viewport Height Alignment**: Fixed the bug where the AI Studio and Messages page height collapsed (exposing a large white footer band) on certain viewports. Defined strict `@media` height constraints (`height: 100vh` on desktop, `calc(100vh - 58px)` on mobile) to bind layout content perfectly to the screen height.
- **Micro-Animations & Centering**: Fixed the off-center pulsing loader spinner in the chat send button by adding a padding reset and mapping it to a continuous `@keyframes aiSpin` rotation animation.
- **Sidebar Emojis Elimination**: Replaced all emojis in the student navigation panel sidebar (`🏠`, `✨`, `💬`, `📄`, `📝`, `🏆`, `👤`, `📱`) with clean, lightweight inline SVGs.
- **Version Release**: Bumped `versionCode` to `14`, `versionName` to `"1.9"` in `build.gradle.kts` and `/api/app-version` route to trigger updates for all students.

### 11. Android AI Studio Redesign & Emojis Elimination (v1.9 Build — New!)
- **Goal**: Bring the student Android app's AI Studio up to the exact premium Google Gemini visual standard shown in ideal mockups, enforce complete emoji elimination, and align design elements symmetrically.
- **Unified Pill Input Container**: Refactored scattered text fields, icons, and action buttons into a single cohesive bottom bar row featuring internal `+` attachment, globe web-search, borderless native text inputs, voice mic triggers, and active gradient action send controls.
- **Emoji Sanitization**: Removed all graphic waving hand icons (`👋`) and emojis from welcoming greetings, enforcing 100% clean English and native vector styling.
- **Sizing Alignment**: Tuned greeting typography and layouts to resolve overlapping elements and ensure a robust, premium visual response.

### 12. Responsive Web Portal Overhaul & AI Studio Header Modernization (v1.9.1 Build — New!)
- **Goal**: Deliver a completely responsive web portal header shell suitable for mobile and desktop, including hamburger toggle drawers, back redirections, "New Chat" and "History" integrations.
- **Unified Subpage Navigation**: Redesigned `/student/ai-studio` top header with absolute responsive alignment:
  - Left side: Hamburger menu icon linked to `toggle-student-sidebar` custom event dispatchers + custom back arrow routing to dashboard (`/student/dashboard`).
  - Right side: Gradient "New Chat" pill button + clock icon "History" API sync + student's full name label next to circular active avatar.
  - Symmetrical flows that fold elegantly on smaller screens.
- **Stacked Header Elimination**: Modified `StudentShell.tsx` to conditionally bypass shell-level headers on the AI Studio route, integrating navigation triggers dynamically within the page and preventing visual clutter on mobile viewports.

### 13. Student Web Portal Redesign, Emojis Elimination & Hinglish Translation (v2.0 Build — New!)
- **Goal**: Overhaul the entire LeGeZt Student Web Portal to achieve a highly premium, modern, dark glassmorphism space-indigo layout inspired by Google Gemini, sanitize graphic emojis, and translate Hinglish feedback elements.
- **Global Theme Variables**: Overhauled `:root` variable tokens in `globals.css` with midnight space-indigo styles (`--bg-deep: #070913`, `--bg-panel: #0b0e1f`), deep space radial body backgrounds, and vibrant purple-indigo linear-gradient active buttons.
- **Messages Chamber Page Refactor**: Rewrote `messages/page.tsx`'s hardcoded bright backgrounds (`#f8fafc`, `#e5e7eb`, `#f1f5f9`, `white`) and slate text colors to inherit the global CSS variables system, enabling a seamless dark chat experience with balanced sidebar container DOM closures.
- **Hinglish Standing Translation**: Translated results standings warnings and empty state logs in `results/page.tsx` to formal, professional English.
- **Emoji-Free Sanitization**: Sanitized graphic emojis (`📊`, `📈`, `📝`, `📄`, `🔍`, `⏳`, `👤`, `⚠️`) across Results, Documents, Exams, and Profile pages, replacing them with custom clean SVGs or sleek border treatments.
- **Sidebar Glow Pill Indicator**: Enhanced `StudentShell.tsx` active navigation indicators with blurred glassmorphism gradients and a customized circular initial avatar with a neon green active online indicator dot.

### 14. Student Web Portal Responsive Unified Topbar Header (v2.1 Build — New!)
- **Goal**: Implement an ultra-premium, highly responsive dynamic Unified Header Topbar globally integrated in `StudentShell.tsx` matching the generated Gemini visual mockup.
- **Unified Actions Panel**: Engineered dynamic topbar slots displaying "+ New Chat" gradient buttons (with page-clear event dispatches), SVGs history sync clocks, and glowing "Pro" badges.
- **Contextual Navigation Exit**: Built a contextual back arrow link; routes back to `/student/dashboard` from subpages (AI Studio, Messages, Results, Profile), and routes back to `/` from the dashboard to allow students to exit the portal seamlessly.
- **Mobile Collapsible Columns**: Programmed responsive media queries in `globals.css` that hide student names on tablets and collapse buttons to icon-only layouts on mobile phones, protecting topbars from wrapping.
- **Duplicated Header Cleanup**: Cleaned up duplicated headers and double-nesting main blocks in `ai-studio/page.tsx`, `dashboard/page.tsx`, `results/page.tsx`, and `profile/page.tsx` to restore clean layout boundaries.
- **Conditional Header Visibility**: Restricted the unified topbar header to only display on `/student/ai-studio`. Other pages now correctly default to no topbar on desktop, and a simple mobile hamburger toggle header on mobile viewports, resolving heading duplication and layout clutter.

### 15. AI Studio Google Gemini Clone Rebuild (v2.2 Build — New!)
- **Goal**: Completely rebuild the Web AI Studio page to replicate Google Gemini's interface exactly — left sidebar with chat history, clean centered chat area, floating input bar, and full conversation management.
- **Full Viewport Takeover**: Modified [StudentShell.tsx](file:///c:/Users/mdjib/Desktop/legezt/portal/app/student/StudentShell.tsx) to bypass the entire portal shell (sidebar + topbar) when on the AI Studio route, allowing the page to render its own Gemini-style full-screen layout independently.
- **Collapsible Left Sidebar**: Built a 260px collapsible left panel in [page.tsx](file:///c:/Users/mdjib/Desktop/legezt/portal/app/student/ai-studio/page.tsx) featuring a branded "LeGeZt AI" header, "New Chat" pill button, "Recent" chat history list with active state highlighting, delete controls, and a "Back to Portal" navigation link with student avatar footer.
- **Gemini Welcome Screen**: Designed a centered welcome state with a large animated gradient greeting (`Good morning/afternoon/evening, {name}`), subtitle, and a 2x2 grid of premium suggestion cards (coding concepts, academic emails, image generation, revision strategies) with hover animations.
- **Chat Conversation UI**: Implemented a scrollable conversation view with left-aligned AI responses (sparkle avatar, markdown rendering with code blocks, numbered lists, bullets, inline code, bold text) and right-aligned user bubbles with subtle gradient backgrounds.
- **Floating Input Bar**: Created a Gemini-style bottom input bar with rounded pill container, auto-resizing textarea, attach/mic buttons, `/imagine` image mode badge, and gradient send button with loading spinner.
- **Chat History Management**: Built client-side conversation management — creating, switching between, and deleting chats. Each conversation is stored in local state with automatic title generation from the first user message.
- **Mobile Responsive**: Sidebar collapses off-screen on mobile (< 768px) with a backdrop overlay for drawer behavior. Chat bubbles expand to 85% width on mobile. Input area adapts to narrower screens.
- **Build Verified**: TypeScript compilation and static page generation confirmed successful across all 52 routes.

### 16. Advisor Messaging & Services UI Modernization & Gemini Chat Rebuild (v2.3 Build — New!)
- **Goal**: Modernize the Android app's Chat and Services screens and rebuild the chat interface to a premium Google Gemini full-screen layout.
- **Full-Screen Gemini Chat**: Redesigned `MessageChamberScreen` to occupy the entire viewport, removing restrictive paddings for a more immersive experience.
- **Floating Input Pill**: Implemented a glassmorphic rounded input container with a premium linear gradient border (`GeminiCyan`, `GeminiPurple`, `GeminiMagenta`).
- **Sparkle Action Control**: Replaced standard send buttons with an `AutoAwesome` sparkle icon floating action button, aligning with AI assistant design standards.
- **Emoji-Free Sanitization**: Sanitized all graphic emojis across the Chat and Services modules, replacing them with modern Material vector icons.
- **Theme Alignment**: Enforced strict adherence to the space-indigo dark theme and Catppuccin-inspired status colors.

### 17. Automated Unit Tests & Codebase Security Audit (v2.4 Build — New!)
- **Goal**: Run deep codebase scanners, verify automated unit tests compile and run cleanly, and conduct a full-scale security audit.
- **Unit Test Compilation Fix**: Discovered and resolved an unresolved import reference inside `GreetingScreenshotTest.kt` where a non-existent `CustomGlowingButton` import was successfully replaced with the correct `PrimaryButton` import.
- **Automated Test Run**: Ran the complete Kotlin/Robolectric unit test suite using `./gradlew test`. Verified that all 32 actionable tasks built and passed cleanly with 100% success.
- **Security Audit Report**: Performed a thorough scan across portal API endpoints, state machines, and styling sheets. Documented a critical backend API gate bypass on the classmates messaging route in the newly generated `codebase_security_audit.md` report.

### 18. Student Workspace Dashboard Simplification (v2.5 Build - New!)
- **Goal**: Make the student web portal dashboard feel like an easy operating workspace instead of a static stats page.
- **Workspace Hero**: Rebuilt [dashboard/page.tsx](file:///C:/Users/mdjib/Desktop/legezt/portal/app/student/dashboard/page.tsx) with a personalized welcome panel, account status card, branch/year/enrollment chips, and clearer explanatory copy.
- **One-Tap Student Actions**: Added four large quick-action cards for AI Studio, Documents, Advisor Messages, and Surprise Exams using `lucide-react` icons and route links.
- **Academic Snapshot & Next Steps**: Added compact profile metrics, a direct profile link, and a simple next-step panel guiding students to documents, advisor support, and results.
- **Responsive Styling**: Extended [globals.css](file:///C:/Users/mdjib/Desktop/legezt/portal/app/globals.css) with responsive workspace layout classes, mobile-safe grids, stronger card contrast, and polished announcement cards.
- **Verification**: `npm.cmd run build` completed successfully across all 52 routes. Browser verification on `http://localhost:3001/student/dashboard` confirmed the protected dashboard renders the new workspace UI with 4 quick-action cards, 3 workspace panels, and no console errors.

### 19. Automated In-App Updater Release & Google Drive Overwrite (v2.6 Build — New!)
- **Goal**: Trigger an automatic in-app update notification popup in all older installs of the app, compile the new build, and update the direct download endpoints.
- **Version Orchestration**: Incremented local app configuration code to `versionCode = 16`, `versionName = "1.9.2"` and synchronized the portal's `/api/app-version` public API to match.
- **Debug APK Build**: Successfully built the updated app package (`app-debug.apk`) using Gradle (`.\gradlew assembleDebug`).
- **Binary Deployments**:
  - Copied the compiled `app-debug.apk` directly to the portal Next.js public directory (`portal/public/update.apk`) for seamless in-app direct installer triggering.
  - Successfully executed `python gdrive_upload.py` to overwrite the live GDrive uploader link binary under ID `16AIqV0cCbOjIHUMn6lpVRV2nK_V_g3HO` without breaking the student link.
- **GitHub Sync**: Safely committed and pushed all new version configs and direct install APK files to the portal `main` branch.

### 20. App & Portal Logo Branding Update (v2.7 Build — New!)
- **Goal**: Apply the new LIET crest logo across the Next.js Student Portal and compile the Android app with the updated logo.
- **Web Portal Integration**: Replaced public logo assets (`logo.png` and `lords_logo.png`) inside `portal/public` to automatically update the header sidebar, apple-touch-icons, and install banners.
- **Android App Integration**:
  - Replaced the in-app drawable logo asset `app_logo.png` to update splash and login screens.
  - Substituted launcher density-based mipmaps (`hdpi`, `mdpi`, `xhdpi`, `xxhdpi`, `xxxhdpi`) with the new PNG logos and moved original adaptive vector folders to prevent conflict.
- **Verification & Deployment**: Compiled the updated APK (`app-debug.apk`), copied it to the public `/update.apk` server directory, uploaded to Google Drive, and pushed all updates to git.


### 21. Faculty Portal Bug Fixes & Access Hardening (v2.8 Build - New!)
- **Goal**: Fix faculty page bugs, incomplete workflows, and unsafe backend access paths before deploying to GitHub.
- **Faculty-Student Privacy Gate**: Updated the faculty students API so returned exam submissions are filtered to the current faculty member's own exams only.
- **Messaging Access Control**: Hardened the shared messages route so faculty can message assigned students or faculty peers only, while student-student conversations require an accepted friendship.
- **Faculty Exams Stability**: Fixed the React compiler/lint issue in the faculty exams page by stabilizing exam loading with `useCallback`, removing unsafe EventSource interval storage, and typing route error handlers.
- **Documents Workflow Completion**: Rebuilt the faculty documents page with private target controls for year, branch, and batch; working PDF preview; share controls; upload error handling; and emoji-free labels.
- **UI/Lint Cleanup**: Fixed the dashboard active count to include approved students, swapped the faculty shell logo to `next/image`, removed unused imports, and eliminated focused faculty lint failures.
- **Verification**: `npx.cmd eslint app/faculty app/api/faculty app/api/messages/route.ts` passes. `npm.cmd run build` passes across all 52 routes. Authenticated HTTP smoke testing confirmed `/api/faculty/auth/login`, `/api/faculty/me`, `/api/faculty/students`, and `/faculty/documents` return 200, while an unassigned student message fetch correctly returns 403.

### 22. Student Profile Pictures, Chat History Sync & UI Redesign (v2.9 Build - New!)
- **Goal**: Persist student profile pictures, synchronize chat history with the database, and redesign the classmate messaging interface.
- **Persistent Profile Pictures**:
  - **Azure Storage integration**: Configured Next.js `/api/student/me` PUT and GET API routes to store profile picture files in Azure Blob Storage under a `profiles` directory and save the reference URL (`profilePhotoUrl` column) in MongoDB.
  - **Secure SAS Urls**: Selected and mapped `profilePhotoUrl` using secure generated SAS URLs in `/api/student/friends` (classmates search, friends list, incoming/outgoing requests) and `/api/faculty/public` (assigned advisors).
  - **Web Avatars**: Updated `StudentShell.tsx` and `student/messages/page.tsx` to render classmate/advisor profile pictures.
  - **Android Support**: Added Coil `AsyncImage` to classmate search lists, friends lists, and active conversation headers. Updated `ProfileScreen.kt` to load local file caches (during update) and remote SAS URLs dynamically. Mapped `profileImageUri` to `profilePhotoUrl` using Moshi JSON name annotations.
- **Chat History & DB Sync**:
  - **Next.js AI Studio page**: Memoized `switchToChat` using `useCallback` to prevent stale closure bugs and added a `useEffect` hook to automatically sync `messages` state with `chatHistory` state, ensuring history is synchronized in real-time.
- **Normal Chat vs AI UI Redesign**:
  - **Android Message Chamber**: Redesigned `MessageChamberScreen` in `AdvisorMessagingAndServices.kt` to represent a high-end, secure chat room. Removed Google Gemini accents (the particle background `AnimatedGeminiBackground()`, sparkly neon gradient input borders, and sparkly AutoAwesome send buttons) in favor of solid borders, standard Send vector icons, and solid space-indigo bubbles.
- **TopAppBar Overlap Fix**:
  - **Android Scaffold Padding**: Dynamically adjusted the scaffold top padding in `MainShell.kt` depending on whether an active classmate conversation is selected, resolving the classmate search bar overlap under the `LeGeZt` TopAppBar.
- **Verification**: Next.js portal build and Android unit tests (`gradlew test`) pass.

### 23. Academic Portal Landing Page Redesign & Vision Deck (v3.0 Build - New!)
- **Goal**: Add deep details about the project (faculty/student utilities), vision details, interactive presentation slides, aspect ratio mockup images, developer credentials, and Buy Me a Coffee appreciation module.
- **Landing Page Overhaul**:
  - **Vision & Details**: Documented the "Vision of Md Jibran" describing offline-first, intranet-native LMS philosophy. Outlined detailed lists of features for the Student Hub and Faculty Hub.
  - **Interactive Presentation Deck (PPT)**: Built an in-browser slide presentation module (4 slides with sub-features on Architecture, Student Experience, Faculty Commands, and Security/Autonomy) featuring interactive navigation selectors.
  - **Aspect Ratio Mockup Images**: Served custom-ratio image elements (`aspect-ratio: 16/10` and `21/9` banners) representing Figure 1 (dashboard mockup), Figure 2 (selection gate), and Figure 3 (system concept) without distortion.
  - **Appreciation & Buy Me a Coffee**: Added a dedicated card showcasing Md Jibran's development efforts alongside an interactive cup illustration with floating CSS steam lines.
- **Verification**: Next.js portal build `npm run build` compiled successfully and generated all 52 static routes.

### 24. mrlegezt.me Landing Page Premium Space-Indigo Redesign & Sidebar Branding Refinement (v3.2 Build - New!)
- **Goal**: Redesign the main landing page to eliminate the cheesy "AI-generated cyberpunk hacker" theme and align it with the portal's space-indigo theme. Also, enlarge the institutional logo and update button iconography in both student and faculty portals.
- **Visual Design Revamp**:
  - **Premium Theme System**: Updated the CSS styling tokens in `globals.css` with a high-end Space-Indigo design system (`#070913`, `#0b0e1f`, `#6366f1` indigo, `#8b5cf6` purple, `#14b8a6` teal) instead of the old Crimson/Sapphire colors.
  - **Interactive Mockup Deck**: Replaced the video-smoke overlay in the hero section with a beautiful, responsive, stacked interactive mockup deck showing actual screenshots (`portal_dashboard_mockup.png`, `college_portal_mockup.png`, and `legezt_banner.png`) with smooth hover scales and translations.
  - **Typography & Copywriting**: Removed the scrolling headings ("MR LEGEZT", "W LEGEZT", etc.) and re-phrased the subtitles to clearly explain the autonomous nature of the academic portal and network in clean English.
  - **Cohesive Icons**: Replaced generic round circle SVGs in default and dynamic services with custom Lucide icons (`Users`, `Layers`, `Cpu`, `Sparkles`).
- **Sidebar Branding & App Install Updates**:
  - **Enlarged Logo**: Resized the LIET crest logo image next to the portal title from `32px` to `42px` (increasing title text font size) in both `StudentShell.tsx` and `FacultyShell.tsx` for visual clarity and prominence.
  - **Android Icon Refinement**: Replaced the generic smartphone SVG outline with a premium, custom-styled Android bot SVG icon next to the "Install Student App" download button in student and faculty sidebars.

### 25. AWS Migration & S3 Storage Integration (v3.5 Build — New!)
- **Goal**: Migrate the entire LeGeZt application storage and API hosting from Microsoft Azure to AWS while preserving original domains in source code.
- **S3 Storage Helper**: Implemented S3 storage client inside `portal/lib/s3-storage.ts` using `@aws-sdk/client-s3` and `@aws-sdk/s3-request-presigner`. Made the backend API target dynamic via `process.env.NEXT_PUBLIC_API_URL`. Removed old `@azure/storage-blob` SDK and references.
- **Async Presigned URLs**: Updated Next.js API routes `/api/documents`, `/api/student/me`, `/api/student/friends`, and `/api/faculty/public` to retrieve and format S3 presigned URLs asynchronously.
- **Android API Integration**: Preserved the original base URL in `ApiService.kt` so the user can control endpoints locally. Compiled the final dynamic `app-debug.apk` package and deployed it locally to the portal's public directory.
- **EC2 Live Deployment**: Bundled the codebase local directories into `code.tar.gz` and uploaded it to S3. Created IAM EC2 profile `legezt-ec2-profile` and security group `legezt-web-sg` (allowing port 22, 80, 443, 3000, 3001, 5000). Launched `t3.micro` EC2 instance (`i-047077df6bcd3dd35`) with Public IP `34.200.219.78` running an automated bootstrapping user data script to set up Node.js, PM2, and Nginx.
- **Geofence Inline Banner**: Replaced the browser native `alert()` for geofence validation fails on `portal/app/student/exams/page.tsx` with a styled, dismissible inline warning banner block.
- **Forgot Password Flow**: Implemented a secure link-based password recovery flow on the Student Portal. Added SMTP link dispatch helper inside `portal/lib/mail.ts`, refactored APIs (`forgot-password` and `reset-password` routes), and added frontend UI pages `/student/forgot-password` and `/student/reset-password` (with token validations and 1-hour expiry).
- **Database Cleanup**: Created and executed `portal/clear-exams.js` database script on the EC2 server, successfully clearing all dummy exam questions, answers, proctor logs, and submissions from MongoDB.

### 26. UI Redesign Skill Specification & Workspace Optimization (v4.0 Build — New!)
- **Goal**: Create a dedicated skill guide for the LeGeZt clean light mode redesign, document asset checklists and 3D crystal button styles, and perform workspace disk cleanup.
- **Skill File Creation**: Created `.agents/skills/legezt-redesign-guide/SKILL.md` containing full design tokens (Option 1 Clean Light UI, `#f8fafc` canvas, 3D Crystal White Glow buttons, Skeleton Shimmer Loader UI, logo AI prompts, and asset mapping).
- **Credits & Vision**: Embedded full credits for Md Jibran (Founder & Chief Architect) within the skill blueprint.
- **Workspace Cleanup**: Deleted ~87 MB of obsolete build archives (`code.tar.gz`, `portal/deploy.zip`, `secure-team-chat.zip`) and organized loose scratch/test scripts into `portal/scripts/archive/`.
- **Root Directory Standardization**: Moved all loose credentials, python scripts (`gdrive_upload.py`), token JSONs, XML profiles, and dev database files into a single `tools_and_credentials/` directory. Added a root `.gitignore` to keep the root directory 100% clean.
- **Clean Workspace Reset**: Purged legacy source code directories (`frontend`, `portal`, `backend`, `legezt-student`) upon explicit user request to prepare a clean slate for the upcoming new remake build.
- **Real-Time Remote Tunnel Setup**: Registered and started Microsoft VS Code Remote Tunnel background service (`legezt-pc`). Enabled 24/7 direct web editor access from any device via `vscode.dev/tunnel/legezt-pc` without requiring manual git clone or push commands.

### 27. Advanced Theme 4 Implementation & Live Dev Server Launch (v4.1 Build — New!)
- **Selected Theme**: Implemented Advanced Theme 4 (High-Tech Computer Science Engineering Lab backdrop, Light Platinum Frosted Glass Cards, Sapphire Blue 3D Crystal Glow buttons, Dark Navy high-contrast typography, and 100% vector SVG iconography).
- **Asymmetric Split-Screen Layout**: Engineered responsive split hero banner, live exam preview card with shuffled question seed, Skeleton Shimmer state simulator, interactive Security & Geofence Slide Deck, and Founder Vision module.
- **Local Dev Server**: Launched Next.js Turbopack dev server live at `http://localhost:3000` (and Remote Tunnel at `vscode.dev/tunnel/legezt-pc`).

---

## 📋 Backlog & Pending Tasks (To Be Addressed next)

- [ ] **Network Reconnection Alerts**: Implement an active network connectivity listener inside the app to show a clean offline banner when a student loses internet connection.
- [ ] **Document Search Bar**: Add a search bar inside `DocumentsScreen` (`DocumentsAndPdfViewer.kt`) to allow students to search notes and question banks by title or source.

---

## 📂 Key Files Map

- **Android App Code**:
  - Main Activity: [MainActivity.kt](file:///C:/Users/mdjib/Desktop/legezt/legezt-student/app/src/main/java/com/example/MainActivity.kt)
  - ViewModel: [StudentViewModel.kt](file:///C:/Users/mdjib/Desktop/legezt/legezt-student/app/src/main/java/com/example/services/StudentViewModel.kt)
  - API Service: [ApiService.kt](file:///C:/Users/mdjib/Desktop/legezt/legezt-student/app/src/main/java/com/example/services/ApiService.kt)
  - PDF & Documents UI: [DocumentsAndPdfViewer.kt](file:///C:/Users/mdjib/Desktop/legezt/legezt-student/app/src/main/java/com/example/ui/screens/DocumentsAndPdfViewer.kt)
  - In-App Updater Overlay: [UpdateOverlay.kt](file:///C:/Users/mdjib/Desktop/legezt/legezt-student/app/src/main/java/com/example/ui/screens/UpdateOverlay.kt)
  - Login & Registration UI: [SplashAndLoginScreens.kt](file:///C:/Users/mdjib/Desktop/legezt/legezt-student/app/src/main/java/com/example/ui/screens/SplashAndLoginScreens.kt)
  - Chat Screen UI: [AdvisorMessagingAndServices.kt](file:///C:/Users/mdjib/Desktop/legezt/legezt-student/app/src/main/java/com/example/ui/screens/AdvisorMessagingAndServices.kt)
- **Portal Backend Code**:
  - App Version API: [route.ts](file:///C:/Users/mdjib/Desktop/legezt/portal/app/api/app-version/route.ts)
  - Message Studio Web: [page.tsx](file:///C:/Users/mdjib/Desktop/legezt/portal/app/student/messages/page.tsx)
- **Landing Page Code**:
  - Main Page: [page.tsx](file:///C:/Users/mdjib/Desktop/legezt/frontend/src/app/page.tsx)
  - CSS Styles: [globals.css](file:///C:/Users/mdjib/Desktop/legezt/frontend/src/app/globals.css)
- **Deployment Tooling**:
  - Drive Uploader: [gdrive_upload.py](file:///C:/Users/mdjib/Desktop/legezt/gdrive_upload.py)
