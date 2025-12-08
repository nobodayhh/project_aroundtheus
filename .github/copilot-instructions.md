# Copilot Instructions for Around the U.S. Project

## Project Overview
Around the U.S. is a responsive, adaptive webpage showcasing places around the United States. Built with vanilla HTML5, CSS3, and JavaScript, it demonstrates a showcase/profile page with a modal-based interface for editing and creating content.

## Architecture & Data Flow

### Component Structure
- **Profile Section** (`#edit-modal`): Edit user name/description via modal form
- **Cards Grid** (`.cards__list`): Displays place cards dynamically rendered from `initialCards` array
- **Image Preview Modal** (`#image-modal`): Full-screen image viewer triggered by card clicks
- **Add Card Modal** (`#edit-card-modal`): Form to add new place cards

### Key Data Patterns
1. **Card Object Structure**: `{ name: string, link: URL }`
   - `link` is stored as a `URL` object (not string), ensuring validation
   - See `initialCard0` through `initialCard5` in `scripts/index.js` for examples

2. **DOM Template Pattern**: Card HTML stored in `<template id="cardTemplate">` in `index.html`
   - Cloned via `cardTemplate.querySelector(".card").cloneNode(true)` in `getCardElement()`
   - New cards prepended to list (newest first) in `renderCard()`

3. **CSS Architecture (BEM)**:
   - Organized by blocks in `/blocks/` directory
   - Entry point: `pages/index.css` imports all blocks
   - Pattern: `block__element_modifier` (e.g., `modal__button_disabled`)

## JavaScript Conventions

### Form Validation System
Located in `scripts/index.js` (lines ~80-155):
- **Core Functions**:
  - `showInputError()` / `hideInputError()`: Manage error display and `.modal-input-error` class
  - `checkInputValidity()`: Validate single input using HTML5 `validity` API
  - `hasInvalidInput()`: Check if any input in array is invalid
  - `toggleButtonState()`: Disable/enable submit button based on validity
  - `setEventListeners()`: Attach real-time validation to form inputs
  - `enableValidation()`: Initialize all forms with validation on page load

- **Pattern**: Real-time validation on input events updates button disabled state immediately

### Event Handler Naming
- Handlers named with verb prefix: `handleProfileFormSubmit()`, `handleCardFormSubmit()`
- Handlers prevent default and manage state + DOM updates together

### Modal Management
- `openModal(modal)`: Adds `.modal_opened` class
- `closeModal(modal)`: Removes `.modal_opened` class
- All modal interaction tied to these functions (e.g., edit button → `openModal()` → `fillProfileInputs()`)

## Critical Implementation Details

### Form Reset & Modal State
- After card submission: `cardFormElement.reset()` clears inputs THEN `closeModal()`
- Profile edit pre-fills inputs: `fillProfileInputs()` populates from current DOM text before opening

### Card Functionality
- **Like Button**: Toggle `.card__like-button-active` class (visual-only, no persistence)
- **Delete Button**: `cardElement.remove()` (DOM deletion, no confirmation)
- **Image Click**: Populates image modal with `cardData.link` and `cardData.name`

### Image Modal Behavior
- Stores reference to image element in DOM: `imageModalImgEl.src` and `imageModalText.textContent`
- No form validation needed (display-only modal)

## Developer Workflows

### Adding New Features
1. **New profile field**: Add input to `#edit-profile-form`, add validator in `setEventListeners()`, update `fillProfileInputs()` and `handleProfileFormSubmit()`
2. **New card property**: Extend card object structure (e.g., `{ name, link, location }`), update template in HTML, update `getCardElement()` binding
3. **Persist data**: No backend—all data lost on page reload (by design; consider localStorage if needed)

### Testing Common Interactions
- Open profile modal: Click profile edit button → verify inputs pre-filled
- Add card: Click add button → enter title/URL → submit → verify prepended to list
- Like/delete cards: No network calls; purely client-side DOM manipulation
- Image preview: Click card image → verify modal displays, close button works

## File Reference Map
- `index.html`: All HTML structure including modals and card template
- `scripts/index.js`: All JavaScript logic (263 lines)
- `pages/index.css`: CSS entry point (imports all blocks)
- `blocks/modal.css`: Modal styling (both `.modal_opened` state and element hierarchy)
- `blocks/card.css`: Card styling (like button active state)
- `blocks/profile.css`: Profile section styling

## Common Pitfalls to Avoid
1. **Form submission**: Always `evt.preventDefault()` before updating state
2. **Button disabled state**: Must keep in sync with input validity—use `toggleButtonState()` after any change
3. **Modal visibility**: Use class-based state (`.modal_opened`), not inline styles
4. **Card rendering**: Use template clone pattern, not innerHTML string concatenation
5. **Input errors**: Error messages tied to input IDs via naming convention `#${inputElement.id}-error`
