// Internationalized messages for JavaScript - loaded from backend
var messages = {};

// Pseudoverbs for different languages
var pseudoverbs = {
    de: [
        'Schnarchzimpeln', 'Käsefußwackeln', 'Bettmüffelwummern', 'Morgenmurmeln', 'Kaffeekleckern', 'Schnoddermurksen', 'Brillenglotzglucksen', 'Nudelschlürfeln', 'Bauchgrummeln', 'Löffelklappern',
        'Sockensammeln', 'Käsemuckelwälzen', 'Sockenmiefeln', 'Achselschwitzeln', 'Mundmuffelstinkern', 'Kuschelkissenwerkeln', 'Ohrenschmalzlöffeln', 'Zahnsteinknabbern', 'Kopfschuppenschütteln', 'Zehenwackeln',
        'Brezeltwisten', 'Lebkuchenkrümeln', 'Sauerkrautschmausen', 'Senftupfendtupfen', 'Brezelpretzeldrehen', 'Bierbäuchlehuppeln', 'Pfannkuchenplattklopfen', 'Spätzleschlabberln', 'Kartoffelpüreestampfen', 'Apfelstrudelmampfen',
        'Katzenjammermaunzen', 'Weltschmerzdösen', 'Fernwehseufzen', 'Heimwehschluchzen', 'Fingerspitzengefühlern', 'Verschlimmbessern', 'Verschleckputzen', 'Verschusseln', 'Verbesserwissern', 'Weicheierschmuseln',
        'Pantoffelheldentapseln', 'Sesselkleckern', 'Kissenschlachtwälzen', 'Fernbedienungsucheln', 'Couchpotatoing', 'Schweinehundbesiegeln', 'Prokrastiniereln', 'Gammeldöseln', 'Faulpelzschlurfen', 'Nichtstunherumhängeln',
        'Brotkrumenkrümeln', 'Nudelholzrollen', 'Teigknetenwummern', 'Gemüseschnippeln', 'Salatschleudern', 'Avocadozerstampfen', 'Tofuwürfeln', 'Quinoaquellen', 'Chiasamenschlürfen', 'Mandelmilchschlabbern',
        'Smoothiemixen', 'Hummusdippeln', 'Kichererbsenkrümeln', 'Vollkornknuspern', 'Haferflockenstreuen', 'Linsenkochwerkeln', 'Hirseschrotmahlen', 'Süßkartoffelstampfen', 'Granatapfelentkernen', 'Coconutöffnen',
        'Oktoberfestgrölen', 'Karnevalsjöhlen', 'Schützenfestpolkern', 'Volksfestschunkeln', 'Weihnachtsmarktglühweinschlürfen', 'Osterfeueranzünden', 'Pfingstbaumklettern', 'Himmelfahrtbollerwagenschieben', 'Silvesterkrachern', 'Neujahrkaterverkriechen',
        'Hausschlappenschlurfen', 'Gartenzwergaufstellen', 'Kehrwocheputzen', 'Sonntagsspaziergehen', 'Mittagsschlafhalten', 'Tagesschauglotzen', 'Tatortstarren', 'Rosamundpilchergucken', 'Bergdoktorsabbern', 'Lindenstraßeleiden',
        'Staumeldenabhören', 'Wetterberichtverfolgen', 'Bundesligafiebern', 'Formel1brummen', 'Skispringenspannen', 'Biathlonschießen', 'Handballprellen', 'Fußballgrölen', 'Eishockeykloppen', 'Tennisächzen',
        'Mecklenburgerplattschnacken', 'Bayerischbabbeln', 'Sächsischnuscheln', 'Kölschreden', 'Berlinerschnauzen', 'Schwäbischschwätzen', 'Plattdeutschlallen', 'Österreichischgriaßdiegott', 'Schweizerdütschröhrlen', 'Elsässischbredouillieren',
        'Spargelsaisonzelebrieren', 'Erdbeersaisonschlecken', 'Kürbissaisonschnitzen', 'Kirschkernspucken', 'Apfelpflücken', 'Birnenschnabulieren', 'Zwetschgenknabbern', 'Johannisbeerenzupfen', 'Himbeernaschen', 'Brombeerklauen',
        'Adventskranzanzünden', 'Nikolausstrumpfhängen', 'Ostereierverstecken', 'Pfingstblumenstecken', 'Maibaumumtanzen', 'Johannisfeuerspringen', 'Martinsgansbratenschmauß', 'Barbarazweigeschneiden', 'Andreasölgießen', 'Katharinenraddrehen',
        'Semesterferien-gammeln', 'BAföG-rechnen', 'Mensa-ekeln', 'Vorlesung-schwänzen', 'Klausur-aufschieben', 'Uni-bibliothek-campieren', 'WG-putzen', 'Pfandflaschen-sammeln', 'Nudeln-mit-ketchup-essen', 'Eltern-anpumpen',
        'Beamtendeutschverfassen', 'Antragsformulareausfüllen', 'Amtsstubenwarten', 'Bürokratiedschungeldurchkämpfen', 'Steuererklärungprokrastinieren', 'GEZ-zahlen-ärgern', 'Rundfunkbeitragverfluchen', 'Paragrafenreiternerven', 'Zuständigkeitenpingpong', 'Dienstwegeinhalten'
    ],
    en: [
        'Wigglewhoppering', 'Gigglesnoofling', 'Chucklesnorting', 'Bellylaugh-bouncing', 'Snickerdoodling', 'Guffawgiggling', 'Chortlechuckling', 'Titterwaggling', 'Hohohohugging', 'Heehawing',
        'Derpiderping', 'Sillybillying', 'Goofygoofing', 'Nincompooping', 'Kookywhackadoodling', 'Looneytoons', 'Bonkersbananaing', 'Wackywhimsying', 'Zanyzoinking', 'Crazycoconutting',
        'Shenaniganing', 'Tomfoolering', 'Hijinksing', 'Hullaballooing', 'Ruckusrumpusing', 'Ballyhoohooing', 'Hoopdedooing', 'Whoopdedoodahing', 'Kerfuffling', 'Brouhaha-ing',
        'Pickle-tickling', 'Cheese-wheezing', 'Cucumber-cucumbering', 'Banana-hammocking', 'Potato-potatoing', 'Noodle-doodling', 'Muffin-stuffing', 'Cookie-rookieing', 'Cupcake-flapdaking', 'Pretzel-twisting',
        'Gobbledygooking', 'Flapdoodling', 'Balderdashing', 'Poppycocking', 'Fiddle-faddling', 'Jibberjabbering', 'Wishy-washying', 'Willy-nillying', 'Hocus-pocusing', 'Abracadabra-ing',
        'Couch-potatoing', 'Netflix-chilling', 'Binge-watching', 'Scroll-holing', 'Doom-scrolling', 'Procrastinoodling', 'Slack-attacking', 'Time-wasting', 'Deadline-dodging', 'Work-shirking',
        'Veggie-burger-demolishing', 'Plant-dog-inhaling', 'Margherita-pizza-scarfing', 'Bean-taco-crunching', 'Quinoa-burrito-burritoing', 'Vegan-donut-dunking', 'Hummus-bagel-schmearing', 'Banana-pancake-stacking', 'Maple-syrup-drizzling', 'Mushroom-bacon-sizzling',
        'Pumpkin-spice-latte-sipping', 'Avocado-toast-millennial-ing', 'Kale-smoothie-virtue-signaling', 'Kombucha-fermenting', 'Chia-seed-sprinkling', 'Quinoa-pronouncing-wrong', 'Gluten-free-evangelizing', 'Organic-everything-demanding', 'Non-GMO-label-reading', 'Houseplant-helicopter-parenting',
        'Black-Friday-stampeding', 'Cyber-Monday-clicking', 'Prime-Day-splurging', 'Clearance-rack-diving', 'Coupon-clipping', 'Cashback-calculating', 'Price-matching', 'Return-policy-abusing', 'Warranty-extending', 'Impulse-buying',
        'Selfie-stick-wielding', 'Instagram-filtering', 'TikTok-dancing', 'YouTube-subscribing', 'Twitter-tweeting', 'Facebook-stalking', 'LinkedIn-humble-bragging', 'Snapchat-ghosting', 'WhatsApp-group-leaving', 'Discord-moderating',
        'Weather-app-obsessing', 'Traffic-app-cursing', 'Food-delivery-app-ordering', 'Dating-app-swiping', 'Rideshare-app-summoning', 'Banking-app-panicking', 'News-app-doom-scrolling', 'Fitness-app-lying-to', 'Language-app-abandoning', 'Meditation-app-ignoring',
        'Monday-morning-dread-experiencing', 'Tuesday-blues-surviving', 'Wednesday-hump-day-climbing', 'Thursday-almost-there-ing', 'Friday-feeling-dancing', 'Saturday-sleeping-in', 'Sunday-scaries-anticipating', 'Weekend-warrior-ing', 'Vacation-day-hoarding', 'Sick-day-faking',
        'Coffee-shop-WiFi-camping', 'Starbucks-line-queueing', 'Artisanal-coffee-snobing', 'Pumpkin-spice-basic-white-girling', 'Cold-brew-hipster-ing', 'Espresso-shot-downing', 'Frappuccino-brain-freezing', 'Decaf-judging', 'Fair-trade-virtue-signaling', 'Single-origin-mansplaining',
        'Uber-eats-ordering-again', 'DoorDash-delivery-stalking', 'Grubhub-fee-calculating', 'Postmates-tipping-guilt', 'Seamless-restaurant-browsing', 'Food-truck-chasing', 'Drive-thru-lane-choosing', 'Happy-hour-timing', 'Brunch-bottomless-mimosa-ing', 'Late-night-snack-regretting',
        'Amazon-one-click-buying', 'Same-day-delivery-expecting', 'Package-tracking-obsessing', 'Porch-pirate-paranoia', 'Return-label-printing', 'Prime-membership-justifying', 'Warehouse-deal-hunting', 'Lightning-deal-missing', 'Wishlist-abandoning', 'Cart-leaving-forever',
        'Zoom-meeting-muting', 'Video-call-background-blurring', 'Slack-status-emoji-choosing', 'Email-inbox-zero-failing', 'Calendar-tetris-playing', 'Meeting-fatigue-experiencing', 'Webcam-angle-adjusting', 'Home-office-pants-optional-ing', 'Virtual-background-cat-filtering', 'Screen-sharing-panic-sweating'
    ]
};

// Load messages from backend API
async function loadMessages() {
    try {
        const response = await fetch('/api/i18n/messages');
        if (response.ok) {
            messages = await response.json();
        } else {
            console.warn('Failed to load i18n messages:', response.status);
        }
    } catch (error) {
        console.warn('Error loading i18n messages:', error);
    }
}

function getMessage(key, ...args) {
    // Fallback messages in case the backend hasn't loaded them yet
    const fallbacks = {
        'results.diff.originalText': 'Original Text',
        'results.diff.improvedText': 'Improved Text',
        'results.heading': 'Improved Text:',
        'results.diff.heading': 'Detailed Changes:',
        'results.diff.sideBySide': 'Side by Side',
        'results.diff.unified': 'Unified',
        'results.copy.button': 'Copy to Clipboard'
    };
    
    let message = messages[key] || fallbacks[key] || key;
    if (args.length > 0) {
        args.forEach((arg, index) => {
            message = message.replace('{' + index + '}', arg);
        });
    }
    return message;
}

// Initialize messages when DOM is loaded
document.addEventListener('DOMContentLoaded', loadMessages);

function lockInputs() {
    // Lock all form inputs to prevent user interaction during requests
    const inputsToLock = [
        'inputText',
        'customPrompt',
        'selectedModel',
        'current-model-display',
        'submitBtn',
        'externalLlmBtn'
    ];
    
    inputsToLock.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.disabled = true;
            element.setAttribute('aria-busy', 'true');
        }
    });
    
    // Also lock language and theme buttons
    document.querySelectorAll('.lang-btn, .theme-btn, .prompt-toggle-btn').forEach(btn => {
        btn.disabled = true;
        btn.setAttribute('aria-busy', 'true');
    });
}

function unlockInputs() {
    // Unlock all form inputs
    const inputsToUnlock = [
        'inputText',
        'customPrompt', 
        'selectedModel',
        'current-model-display',
        'submitBtn',
        'externalLlmBtn'
    ];
    
    inputsToUnlock.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.disabled = false;
            element.removeAttribute('aria-busy');
        }
    });
    
    // Also unlock language and theme buttons
    document.querySelectorAll('.lang-btn, .theme-btn, .prompt-toggle-btn').forEach(btn => {
        btn.disabled = false;
        btn.removeAttribute('aria-busy');
    });
}

function switchLanguage(lang) {
    // Validate language parameter
    if (lang !== 'de' && lang !== 'en') {
        console.warn('Invalid language:', lang);
        return;
    }
    
    // Lock inputs during language switch
    lockInputs();
    
    // Save current text input before switching
    const inputText = document.getElementById('inputText');
    if (inputText && inputText.value.trim()) {
        try {
            localStorage.setItem('preservedInputText', inputText.value);
        } catch (e) {
            console.warn('Could not save input text:', e);
        }
    }
    
    const url = new URL(window.location);
    url.searchParams.set('lang', lang);
    
    // Add the preferred model to URL parameters to maintain selection
    const storedModel = getStoredModelPreference();
    if (storedModel) {
        url.searchParams.set('preferredModel', storedModel);
    }
    
    window.location.href = url.toString();
    
    // Reload messages after language change
    setTimeout(() => {
        loadMessages();
    }, 100);
}

function switchTheme(theme) {
    // Validate theme parameter
    if (theme !== 'light' && theme !== 'dark') {
        console.warn('Invalid theme:', theme);
        return;
    }
    
    const html = document.documentElement;
    const lightBtn = document.getElementById('light-theme-btn');
    const darkBtn = document.getElementById('dark-theme-btn');
    
    // Update data-theme attribute
    html.setAttribute('data-theme', theme);
    
    // Update button states
    lightBtn.classList.remove('active');
    darkBtn.classList.remove('active');
    
    if (theme === 'light') {
        lightBtn.classList.add('active');
    } else {
        darkBtn.classList.add('active');
    }
    
    // Store preference in localStorage (validated theme)
    try {
        localStorage.setItem('theme', theme);
    } catch (e) {
        console.warn('Could not save theme preference:', e);
    }
}

function initializeTheme() {
    const html = document.documentElement;
    const lightBtn = document.getElementById('light-theme-btn');
    const darkBtn = document.getElementById('dark-theme-btn');
    
    // Check for stored preference with validation
    const storedTheme = localStorage.getItem('theme');
    
    if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
        // Use stored preference only if it's valid
        switchTheme(storedTheme);
    } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            darkBtn.classList.add('active');
        } else {
            lightBtn.classList.add('active');
        }
    }
    
    // Listen for system theme changes when no manual preference is set
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            lightBtn.classList.remove('active');
            darkBtn.classList.remove('active');
            if (e.matches) {
                darkBtn.classList.add('active');
            } else {
                lightBtn.classList.add('active');
            }
        }
    });
}

function initializeDiffMode() {
    const sideBySideBtn = document.getElementById('tab-side-by-side');
    const unifiedBtn = document.getElementById('tab-unified');
    
    // Only initialize if diff buttons exist (i.e., on results page)
    if (!sideBySideBtn || !unifiedBtn) {
        return;
    }
    
    // Check for stored preference with validation
    const storedDiffMode = localStorage.getItem('diffMode');
    
    if (storedDiffMode && (storedDiffMode === 'side-by-side' || storedDiffMode === 'unified')) {
        // Use stored preference only if it's valid
        toggleDiffMode(storedDiffMode);
    } else {
        // Default to side-by-side mode
        toggleDiffMode('side-by-side');
    }
}

function restoreInputText() {
    const inputText = document.getElementById('inputText');
    if (!inputText) {
        return;
    }
    
    // Check for preserved text from language switch
    try {
        const preservedText = localStorage.getItem('preservedInputText');
        if (preservedText && !inputText.value.trim()) {
            // Only restore if the textarea is currently empty
            inputText.value = preservedText;
            
            // Clear the preserved text after restoring
            localStorage.removeItem('preservedInputText');
            
            // Clear any existing validation errors
            clearFormErrors();
        }
    } catch (e) {
        console.warn('Could not restore input text:', e);
    }
}

function saveModelPreference(model) {
    // Validate model parameter
    if (!model || typeof model !== 'string') {
        console.warn('Invalid model for saving preference:', model);
        return;
    }
    
    try {
        localStorage.setItem('preferredModel', model);
    } catch (e) {
        console.warn('Could not save model preference:', e);
    }
}

function getStoredModelPreference() {
    try {
        return localStorage.getItem('preferredModel');
    } catch (e) {
        console.warn('Could not retrieve model preference:', e);
        return null;
    }
}

function getCurrentLanguage() {
    // Check which language button is active (reflects server-side locale resolution)
    const activeBtn = document.querySelector('.lang-btn.active');
    if (activeBtn) {
        const btnText = activeBtn.textContent.trim().toLowerCase();
        if (btnText === 'en') return 'en';
        if (btnText === 'de') return 'de';
    }
    
    // Fallback: check URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get('lang');
    if (lang === 'en' || lang === 'de') return lang;
    
    // Final fallback: default to German
    return 'de';
}

function getRandomPseudoverb() {
    const lang = getCurrentLanguage();
    const verbs = pseudoverbs[lang] || pseudoverbs.de;
    
    // Enhanced randomness using multiple entropy sources
    const now = Date.now();
    const mouseEntropy = (typeof window !== 'undefined' && window.performance) ? window.performance.now() : 0;
    const textLength = document.getElementById('inputText')?.value?.length || 0;
    
    // Combine multiple sources for better randomness
    const seed = (now * 1.618033988749) + (mouseEntropy * 2.718281828459) + (textLength * 3.141592653589);
    const pseudoRandom = (Math.sin(seed) * 10000) % 1;
    const randomValue = Math.abs(pseudoRandom);
    
    // Fallback to Math.random() if our calculation goes wrong
    const finalRandom = (randomValue > 0 && randomValue < 1) ? randomValue : Math.random();
    
    return verbs[Math.floor(finalRandom * verbs.length)];
}

function initializeModelSelection() {
    const modelSelect = document.getElementById('selectedModel');
    const currentModelDisplay = document.getElementById('current-model-display');
    
    if (!modelSelect || !currentModelDisplay) {
        return;
    }
    
    // Check for stored model preference
    const storedModel = getStoredModelPreference();
    
    if (storedModel) {
        // Validate that the stored model is available in the current options
        const isAvailable = Array.from(modelSelect.options).some(option => option.value === storedModel);
        
        if (isAvailable) {
            // Set the stored model as selected
            modelSelect.value = storedModel;
            currentModelDisplay.textContent = modelSelect.options[modelSelect.selectedIndex].text;
            
            // If there's a form, update the hidden field as well for submission
            const hiddenModelField = document.querySelector('input[name="selectedModel"][type="hidden"]');
            if (hiddenModelField) {
                hiddenModelField.value = storedModel;
            }
        } else {
            // If stored model is not available, save the current default model
            saveModelPreference(modelSelect.value);
        }
    } else if (modelSelect.value) {
        // No stored preference, save the current default
        saveModelPreference(modelSelect.value);
    }
    
    // Listen for changes to the select element (including programmatic changes)
    modelSelect.addEventListener('change', function() {
        saveModelPreference(this.value);
        currentModelDisplay.textContent = this.options[this.selectedIndex].text;
    });
}

function showLoading() {
    const submitBtn = document.getElementById('submitBtn');
    const loading = document.getElementById('loading');
    const inputText = document.getElementById('inputText');
    
    const pseudoverb = getRandomPseudoverb();

    submitBtn.textContent = getMessage('form.submit.processing');
    loading.style.display = 'block';
    
    // Create loading text with random pseudoverb
    const baseMessage = getMessage('loading.processingWait');
    //loading.innerHTML = `${baseMessage} <span class="pseudoverb">${pseudoverb}</span>...`;
    loading.innerHTML = `${pseudoverb}, ${baseMessage}`;
    
    // Remove any existing error states
    clearFormErrors();
    
    // Lock inputs immediately - form data should already be captured by browser
    lockInputs();
    
    return true;
}

function validateForm() {
    const inputText = document.getElementById('inputText');
    
    // Clear previous errors
    clearFormErrors();
    
    // Text improvement form validation
    if (inputText) {
        const textValue = inputText.value.trim();
        
        // Check if text is empty
        if (!textValue) {
            showFieldError(inputText, getMessage('error.emptyText'));
            return false;
        }
        
        // Check minimum length (at least 3 characters)
        if (textValue.length < 3) {
            showFieldError(inputText, getMessage('error.minLength'));
            return false;
        }
        
        // Check maximum length (reasonable limit)
        if (textValue.length > 10000) {
            showFieldError(inputText, getMessage('error.maxLength'));
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    // Create or update error message
    let errorElement = document.getElementById(field.id + '-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.id = field.id + '-error';
        errorElement.className = 'field-error';
        errorElement.setAttribute('role', 'alert');
        errorElement.setAttribute('aria-live', 'polite');
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    // Update field ARIA attributes
    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', field.getAttribute('aria-describedby') + ' ' + errorElement.id);
    
    // Focus the field
    field.focus();
    
    // Announce error to screen readers
    announceToScreenReader(getMessage('announce.error', message));
}

function clearFormErrors() {
    const errorElements = document.querySelectorAll('.field-error');
    errorElements.forEach(error => {
        error.style.display = 'none';
    });
    
    // Reset ARIA attributes for text improvement form
    const inputText = document.getElementById('inputText');
    if (inputText) {
        inputText.setAttribute('aria-invalid', 'false');
        inputText.setAttribute('aria-describedby', 'inputText-help');
    }
}

let currentDiffMode = 'side-by-side';

function toggleDiffMode(mode) {
    // Validate mode parameter
    if (mode !== 'side-by-side' && mode !== 'unified') {
        console.warn('Invalid diff mode:', mode);
        return;
    }
    
    currentDiffMode = mode;
    
    // Update button states and ARIA attributes
    document.querySelectorAll('.diff-toggle-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });
    const activeBtn = document.querySelector(`[data-mode="${mode}"]`);
    activeBtn.classList.add('active');
    activeBtn.setAttribute('aria-selected', 'true');
    
    // Update tabpanel labeling
    const diffContainer = document.getElementById('diff-container');
    diffContainer.setAttribute('aria-labelledby', `tab-${mode}`);
    
    // Store preference in localStorage (validated mode)
    try {
        localStorage.setItem('diffMode', mode);
    } catch (e) {
        console.warn('Could not save diff mode preference:', e);
    }
    
    // Announce change to screen readers
    announceToScreenReader(mode === 'side-by-side' ? getMessage('announce.diffModeChanged.sideBySide') : getMessage('announce.diffModeChanged.unified'));
    
    // Re-render diff
    renderDiff();
}


function renderDiff() {
    const originalText = document.getElementById('original-text')?.textContent || '';
    const improvedText = document.getElementById('improved-text')?.textContent || '';
    const container = document.getElementById('diff-container');
    
    if (!originalText || !improvedText || !container) return;
    
    if (typeof Diff === 'undefined') {
        // Safe DOM creation instead of innerHTML
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = 'padding: 15px; color: red;';
        errorDiv.textContent = getMessage('error.diffLibraryNotLoaded');
        container.innerHTML = ''; // Clear first
        container.appendChild(errorDiv);
        return;
    }
    
    // Use line-by-line diff with word-level granularity to preserve newlines
    const diff = Diff.diffWordsWithSpace(originalText, improvedText);
    
    if (currentDiffMode === 'unified') {
        renderUnifiedDiff(diff, container);
    } else {
        renderSideBySideDiff(originalText, improvedText, diff, container);
    }
}

function renderUnifiedDiff(diff, container) {
    container.className = 'diff-container';
    const unifiedDiv = document.createElement('div');
    unifiedDiv.className = 'diff-unified';
    
    diff.forEach(function(part) {
        const span = document.createElement('span');
        const className = part.added ? 'diff-added' : 
                        part.removed ? 'diff-removed' : 'diff-unchanged';
        span.className = className;
        // Preserve newlines by using a text node directly
        span.appendChild(document.createTextNode(part.value));
        unifiedDiv.appendChild(span);
    });
    
    container.innerHTML = ''; // Clear container
    container.appendChild(unifiedDiv);
}

function renderSideBySideDiff(originalText, improvedText, diff, container) {
    container.className = 'diff-container';
    
    // Create DOM structure safely
    const sideBySideDiv = document.createElement('div');
    sideBySideDiv.className = 'diff-side-by-side';
    
    // Original column
    const originalColumn = document.createElement('div');
    const originalHeader = document.createElement('div');
    originalHeader.className = 'diff-column-header';
    originalHeader.textContent = getMessage('results.diff.originalText');
    const originalContent = document.createElement('div');
    originalContent.className = 'diff-column';
    originalColumn.appendChild(originalHeader);
    originalColumn.appendChild(originalContent);
    
    // Improved column
    const improvedColumn = document.createElement('div');
    const improvedHeader = document.createElement('div');
    improvedHeader.className = 'diff-column-header';
    improvedHeader.textContent = getMessage('results.diff.improvedText');
    const improvedContent = document.createElement('div');
    improvedContent.className = 'diff-column';
    improvedColumn.appendChild(improvedHeader);
    improvedColumn.appendChild(improvedContent);
    
    // Process diff parts with synchronized alignment
    diff.forEach(function(part) {
        if (part.added) {
            // Add empty placeholder to original column to maintain alignment
            const originalPlaceholder = document.createElement('span');
            originalPlaceholder.className = 'diff-placeholder';
            originalPlaceholder.appendChild(document.createTextNode(''));
            originalContent.appendChild(originalPlaceholder);
            
            // Add the added content to improved column
            const improvedSpan = document.createElement('span');
            improvedSpan.className = 'diff-added';
            improvedSpan.appendChild(document.createTextNode(part.value));
            improvedContent.appendChild(improvedSpan);
        } else if (part.removed) {
            // Add the removed content to original column
            const originalSpan = document.createElement('span');
            originalSpan.className = 'diff-removed';
            originalSpan.appendChild(document.createTextNode(part.value));
            originalContent.appendChild(originalSpan);
            
            // Add empty placeholder to improved column to maintain alignment
            const improvedPlaceholder = document.createElement('span');
            improvedPlaceholder.className = 'diff-placeholder';
            improvedPlaceholder.appendChild(document.createTextNode(''));
            improvedContent.appendChild(improvedPlaceholder);
        } else {
            // Unchanged text goes to both columns at the same position
            const originalSpan = document.createElement('span');
            originalSpan.className = 'diff-unchanged';
            originalSpan.appendChild(document.createTextNode(part.value));
            originalContent.appendChild(originalSpan);
            
            const improvedSpan = document.createElement('span');
            improvedSpan.className = 'diff-unchanged';
            improvedSpan.appendChild(document.createTextNode(part.value));
            improvedContent.appendChild(improvedSpan);
        }
    });
    
    sideBySideDiv.appendChild(originalColumn);
    sideBySideDiv.appendChild(improvedColumn);
    
    container.innerHTML = ''; // Clear container
    container.appendChild(sideBySideDiv);
}


function togglePromptVisibility() {
    const container = document.getElementById('prompt-container');
    const toggleText = document.getElementById('prompt-toggle-text');
    const toggleBtn = document.querySelector('.prompt-toggle-btn');
    
    if (container.style.display === 'none') {
        container.style.display = 'block';
        toggleText.textContent = getMessage('form.promptToggle.hide');
        toggleBtn.setAttribute('aria-expanded', 'true');
        announceToScreenReader(getMessage('announce.promptOpened'));
        document.getElementById('customPrompt').focus();
    } else {
        container.style.display = 'none';
        toggleText.textContent = getMessage('form.promptToggle.show');
        toggleBtn.setAttribute('aria-expanded', 'false');
        announceToScreenReader(getMessage('announce.promptClosed'));
        toggleBtn.focus();
    }
}

function toggleModelSelection() {
    const modelSelect = document.getElementById('selectedModel');
    const currentModelDisplay = document.getElementById('current-model-display');
    
    if (modelSelect.style.display === 'none') {
        modelSelect.style.display = 'inline-block';
        currentModelDisplay.style.display = 'none';
        currentModelDisplay.setAttribute('aria-expanded', 'true');
        modelSelect.focus();
        announceToScreenReader(getMessage('announce.modelSelectionOpened'));
    } else {
        modelSelect.style.display = 'none';
        currentModelDisplay.style.display = 'inline';
        currentModelDisplay.setAttribute('aria-expanded', 'false');
        currentModelDisplay.textContent = modelSelect.options[modelSelect.selectedIndex].text;
        
        // Save the selected model to localStorage
        saveModelPreference(modelSelect.value);
        
        currentModelDisplay.focus();
        announceToScreenReader(getMessage('announce.modelSelected', modelSelect.options[modelSelect.selectedIndex].text));
    }
}

// Utility function for screen reader announcements
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'visually-hidden';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Tab navigation for diff mode buttons
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const activeElement = document.activeElement;
        if (activeElement.classList.contains('diff-toggle-btn')) {
            e.preventDefault();
            const buttons = Array.from(document.querySelectorAll('.diff-toggle-btn'));
            const currentIndex = buttons.indexOf(activeElement);
            const nextIndex = e.key === 'ArrowRight' ? 
                (currentIndex + 1) % buttons.length :
                (currentIndex - 1 + buttons.length) % buttons.length;
            buttons[nextIndex].focus();
            buttons[nextIndex].click();
        }
    }
    
    // Escape key to close dropdowns and modals
    if (e.key === 'Escape') {
        const modelSelect = document.getElementById('selectedModel');
        const promptContainer = document.getElementById('prompt-container');
        const externalLlmModal = document.getElementById('externalLlmModal');
        
        if (externalLlmModal && externalLlmModal.style.display !== 'none') {
            hideExternalLlmModal();
        } else if (modelSelect.style.display !== 'none') {
            toggleModelSelection();
        } else if (promptContainer.style.display !== 'none') {
            togglePromptVisibility();
        }
    }
    
    // Enter/Space to activate buttons
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('current-model')) {
        e.preventDefault();
        toggleModelSelection();
    }
});

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initializeTheme();
    
    // Initialize diff mode
    initializeDiffMode();
    
    // Initialize model selection
    initializeModelSelection();
    
    // Restore input text if preserved from language switch
    restoreInputText();
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            if (!validateForm()) {
                e.preventDefault();
                return false;
            }
            
            // Show loading state and lock inputs after a brief delay
            // This ensures form data is captured before inputs are disabled
            setTimeout(() => {
                showLoading();
            }, 10);
            
            // Let the form submit normally
            return true;
        });
        
        // Real-time validation feedback for text improvement form
        const inputText = document.getElementById('inputText');
        if (inputText) {
            inputText.addEventListener('input', function() {
                if (this.getAttribute('aria-invalid') === 'true') {
                    // Clear error if user starts typing
                    clearFormErrors();
                }
            });
        }
    }
    
    // Initialize diff when page loads and results are available
    if (document.getElementById('original-text') && document.getElementById('improved-text')) {
        if (Object.keys(messages).length === 0) {
            // Messages not loaded yet, load them first
            loadMessages().then(() => {
                renderDiff();
                announceToScreenReader(getMessage('announce.textImprovementCompleted'));
            });
        } else {
            renderDiff();
            announceToScreenReader(getMessage('announce.textImprovementCompleted'));
        }
    }
    
    
    // Add keyboard support for copy button
    const copyButton = document.getElementById('copyButton');
    if (copyButton) {
        copyButton.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                copyToClipboard();
            }
        });
    }
});

// Clear textarea functionality
function clearTextarea() {
    const textarea = document.getElementById('inputText');
    if (textarea) {
        textarea.value = '';
        textarea.focus();
        
        // Clear any existing validation errors
        clearFormErrors();
        
        // Announce to screen readers
        announceToScreenReader(getMessage('form.inputText.clear') + ' - Text gelöscht');
    }
}


// Copy to clipboard functionality
function copyToClipboard() {
    const resultText = document.getElementById('resultText');
    const copyButton = document.getElementById('copyButton');
    const buttonText = copyButton.querySelector('span');
    
    if (!resultText || !copyButton) {
        console.warn('Copy elements not found');
        return;
    }
    
    // Get the text content
    const textToCopy = resultText.textContent || resultText.innerText;
    
    // Modern clipboard API
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            showCopySuccess(copyButton, buttonText);
        }).catch((err) => {
            console.error('Clipboard API failed:', err);
            fallbackCopyText(textToCopy, copyButton, buttonText);
        });
    } else {
        // Fallback for older browsers or non-secure contexts
        fallbackCopyText(textToCopy, copyButton, buttonText);
    }
}

function showCopySuccess(button, buttonText) {
    const originalText = buttonText.textContent;
    
    // Update button appearance
    button.classList.add('success');
    buttonText.textContent = getMessage('results.copy.success');
    
    // Announce to screen readers
    announceToScreenReader(getMessage('results.copy.success'));
    
    // Reset after 2 seconds
    setTimeout(() => {
        button.classList.remove('success');
        buttonText.textContent = originalText;
    }, 2000);
}

function showCopyError(button, buttonText) {
    const originalText = buttonText.textContent;
    
    // Update button appearance
    button.classList.add('error');
    buttonText.textContent = getMessage('results.copy.error');
    
    // Announce to screen readers
    announceToScreenReader(getMessage('results.copy.error'));
    
    // Reset after 2 seconds
    setTimeout(() => {
        button.classList.remove('error');
        buttonText.textContent = originalText;
    }, 2000);
}

function fallbackCopyText(text, button, buttonText) {
    // Create a temporary textarea
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    textarea.style.left = '-9999px';
    
    document.body.appendChild(textarea);
    
    try {
        textarea.select();
        textarea.setSelectionRange(0, 99999); // For mobile devices
        
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess(button, buttonText);
        } else {
            showCopyError(button, buttonText);
        }
    } catch (err) {
        console.error('Fallback copy failed:', err);
        showCopyError(button, buttonText);
    } finally {
        document.body.removeChild(textarea);
    }
}

// External LLM functionality
function showExternalLlmModal() {
    const modal = document.getElementById('externalLlmModal');
    const inputText = document.getElementById('inputText').value.trim();
    const customPrompt = document.getElementById('customPrompt').value.trim();
    
    // Validate that there's input text
    if (!inputText) {
        showFieldError(document.getElementById('inputText'), getMessage('error.emptyText'));
        return;
    }
    
    // Generate combined prompt
    const prompt = customPrompt || getDefaultPromptText();
    const combinedPrompt = prompt.replace('{input_text}', inputText);
    
    // Display the combined prompt
    const promptDisplay = document.getElementById('combinedPromptDisplay');
    promptDisplay.textContent = combinedPrompt;
    
    // Clear previous response
    document.getElementById('externalLlmResponse').value = '';
    
    // Show modal
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    
    // Focus the modal for accessibility
    modal.focus();
    
    // Add event listener to close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideExternalLlmModal();
        }
    });
    
    announceToScreenReader(getMessage('announce.externalLlmModalOpened'));
}

function hideExternalLlmModal() {
    const modal = document.getElementById('externalLlmModal');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    
    // Return focus to the external LLM button
    document.getElementById('externalLlmBtn').focus();
    
    announceToScreenReader(getMessage('announce.externalLlmModalClosed'));
}

function getDefaultPromptText() {
    // Get the current prompt from the textarea or fall back to a basic prompt
    const customPrompt = document.getElementById('customPrompt');
    return customPrompt.value || customPrompt.textContent || 'Please improve the following text: {input_text}';
}

function copyPromptToClipboard() {
    const promptDisplay = document.getElementById('combinedPromptDisplay');
    const copyButton = document.getElementById('copyPromptButton');
    const buttonText = copyButton.querySelector('span');
    
    if (!promptDisplay || !copyButton) {
        console.warn('Copy prompt elements not found');
        return;
    }
    
    const textToCopy = promptDisplay.textContent || promptDisplay.innerText;
    
    // Modern clipboard API
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            showCopySuccess(copyButton, buttonText);
        }).catch((err) => {
            console.error('Clipboard API failed:', err);
            fallbackCopyText(textToCopy, copyButton, buttonText);
        });
    } else {
        // Fallback for older browsers or non-secure contexts
        fallbackCopyText(textToCopy, copyButton, buttonText);
    }
}

function processExternalLlmResponse() {
    const responseTextarea = document.getElementById('externalLlmResponse');
    const processBtn = document.getElementById('processResponseBtn');
    const inputText = document.getElementById('inputText').value.trim();
    
    const externalResponse = responseTextarea.value.trim();
    
    // Validate that there's a response
    if (!externalResponse) {
        showFieldError(responseTextarea, getMessage('error.emptyResponse'));
        return;
    }
    
    // Disable the button during processing
    processBtn.disabled = true;
    processBtn.textContent = getMessage('form.externalLlm.processing');
    
    try {
        // Hide the modal
        hideExternalLlmModal();
        
        // Create result display (similar to normal improvement flow)
        displayExternalLlmResult(inputText, externalResponse);
        
        // Scroll to results
        const resultSection = document.querySelector('.result-section');
        if (resultSection) {
            resultSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        announceToScreenReader(getMessage('announce.externalLlmProcessed'));
    } catch (error) {
        console.error('Error processing external LLM response:', error);
        showFieldError(responseTextarea, getMessage('error.processingFailed'));
    } finally {
        // Re-enable the button
        processBtn.disabled = false;
        processBtn.textContent = getMessage('form.externalLlm.process');
    }
}

function displayExternalLlmResult(originalText, improvedText) {
    // Create or update the result section
    let resultSection = document.querySelector('.result-section');
    
    if (!resultSection) {
        // Create the result section if it doesn't exist
        resultSection = document.createElement('section');
        resultSection.className = 'result-section';
        resultSection.setAttribute('role', 'region');
        resultSection.setAttribute('aria-labelledby', 'results-heading');
        
        // Insert after the form
        const form = document.querySelector('form');
        form.parentNode.insertBefore(resultSection, form.nextSibling);
    }
    
    // Build the result HTML
    resultSection.innerHTML = `
        <div class="result-header">
            <h2 id="results-heading">${getMessage('results.heading')}</h2>
            <button type="button" class="copy-button" onclick="copyToClipboard()" 
                    aria-label="Copy improved text to clipboard" 
                    id="copyButton">
                <svg class="copy-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"/>
                    <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"/>
                </svg>
                <span>${getMessage('results.copy.button')}</span>
            </button>
        </div>
        <div class="result-text" role="textbox" aria-readonly="true" tabindex="0" id="resultText">${improvedText}</div>
        
        <div style="margin-top: 30px;">
            <h3 id="diff-heading">${getMessage('results.diff.heading')}</h3>
            <div class="diff-controls" role="tablist" aria-labelledby="diff-heading">
                <button type="button" class="diff-toggle-btn active" data-mode="side-by-side" onclick="toggleDiffMode('side-by-side')" role="tab" aria-selected="true" aria-controls="diff-container" id="tab-side-by-side">${getMessage('results.diff.sideBySide')}</button>
                <button type="button" class="diff-toggle-btn" data-mode="unified" onclick="toggleDiffMode('unified')" role="tab" aria-selected="false" aria-controls="diff-container" id="tab-unified">${getMessage('results.diff.unified')}</button>
            </div>
            <div id="diff-container" class="diff-container" role="tabpanel" aria-labelledby="tab-side-by-side">
                <!-- Diff will be rendered here by JavaScript -->
            </div>
        </div>
        
        <!-- Hidden elements for JavaScript to access the texts -->
        <div id="original-text" style="display: none;">${originalText}</div>
        <div id="improved-text" style="display: none;">${improvedText}</div>
    `;
    
    // Initialize diff mode and render (ensure messages are loaded first)
    initializeDiffMode();
    if (Object.keys(messages).length === 0) {
        // Messages not loaded yet, load them first
        loadMessages().then(() => {
            renderDiff();
        });
    } else {
        renderDiff();
    }
    
    // Add keyboard support for the new copy button
    const copyButton = document.getElementById('copyButton');
    if (copyButton) {
        copyButton.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                copyToClipboard();
            }
        });
    }
}