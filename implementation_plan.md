# Portfolio Update Plan

## 1. Menu Bar Close on Outside Click
**Goal:** Close the mobile/sidebar menu when the user clicks anywhere outside of it.
**Changes:**
- In `script.js`, modify the `menuIcon.onclick` event to stop propagation.
- Add a `document.addEventListener('click', ...)` that checks if the click target is outside `.navbar` and `#menu-icon`. If so, remove the `active` class to close the menu.

## 2. Skills Expansion & Linking
**Goal:** Enlarge the skill blocks when clicked to show all skills inward and provide a button to jump to the respective projects.
**Changes:**
- In `index.html`, add an `onclick="expandSkill('cloud')"` (and respective categories) to the `.skill-category` elements.
- In `style.css`, add CSS for `.skill-category.expanded` to make it take full width (`grid-column: 1 / -1`), increase its height smoothly, and reveal a new "View Projects" button at the bottom.
- In `script.js`, add `expandSkill(category)` function to toggle the `.expanded` class and close others.

## 3. Background Change on Skill/Project Click
**Goal:** Change the body background to reflect the category (e.g., Cloud, DevOps) when a user taps on them, and revert to normal on the main page.
**Changes:**
- In `style.css`, define background classes like `.bg-cloud`, `.bg-devops`, `.bg-ai` with beautiful, relevant gradient/image overlays.
- In `script.js`, update the `expandSkill` (or service click) to add `document.body.className = 'bg-' + category`.
- Add an IntersectionObserver to the `#home` section so that when the user scrolls back to the top, `document.body.className = ''` restores the default dark background.

## 4. Header Restructuring
**Goal:** Move navigation links to a menu section (hamburger style by default) and highlight the top bar differently.
**Changes:**
- In `style.css`, change `.navbar` to always act as a hidden side-panel (e.g., sliding from the right) regardless of screen size.
- Update the `.header` styling to have a distinct glassmorphism highlight (e.g., stronger border-bottom, glowing effect, or gradient backdrop) to satisfy "top bar should be highlighted with something else".
- The header will primarily contain the Logo and the Hamburger Icon.

## 5. Add New Projects
**Goal:** Add 6 new projects with links and descriptions.
**Changes:**
- In `index.html`, add a new `Cloud` filter button in the `.filter-buttons`.
- Add HTML cards for the 6 projects:
  - **LangChain_Rag-Agent** (Filter: `ai`)
  - **Deploying-applications-in-multiple-environments** (Filter: `devops`)
  - **AI-Restaurant-Assistant** (Filter: `ai`, `automation`)
  - **AWS 3-Tier Architecture Project** (Filter: `cloud`)
  - **AWS VPC and EC2 Instance Provisioning Using Terraform** (Filter: `devops`, `cloud`)
  - **Route 53** (Filter: `cloud`)

## Verification Plan
1. **Manual Inspection:** Open `index.html` in the browser.
2. **Test 1 (Menu):** Open menu, click outside, verify it closes.
3. **Test 2 (Skills):** Click a skill box, verify it expands full width and the "View Projects" button appears.
4. **Test 3 (Backgrounds):** Click a skill/service, verify the background changes to a premium image/gradient. Scroll to the top, verify it reverts.
5. **Test 4 (Header):** Verify navigation tabs are in the side menu and the top bar has a highlighted aesthetic.
6. **Test 5 (Projects):** Check all 6 new project cards, verify tags and GitHub links are correct.
