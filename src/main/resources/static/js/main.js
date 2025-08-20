// Internationalized messages for JavaScript
var messages = {
    'form.submit.processing': '⏳ Verarbeitung läuft...',
    'loading.processingWait': 'Text wird verarbeitet. Bitte warten...',
    'error.emptyText': 'Bitte geben Sie einen Text ein, der verbessert werden soll.',
    'error.minLength': 'Der Text muss mindestens 3 Zeichen lang sein.',
    'error.maxLength': 'Der Text darf maximal 10.000 Zeichen lang sein.',
    'error.diffLibraryNotLoaded': 'Diff library not loaded. Please refresh the page.',
    'form.promptToggle.hide': 'Prompt ausblenden',
    'form.promptToggle.show': 'Prompt anzeigen',
    'results.diff.originalText': 'Originaltext',
    'results.diff.improvedText': 'Verbesserter Text',
    'results.copy.button': 'In Zwischenablage kopieren',
    'results.copy.success': 'Text kopiert!',
    'results.copy.error': 'Kopieren fehlgeschlagen',
    'announce.promptOpened': 'Prompt-Bereich geöffnet',
    'announce.promptClosed': 'Prompt-Bereich geschlossen',
    'announce.modelSelectionOpened': 'Modellauswahl geöffnet',
    'announce.modelSelected': 'Modell gewählt: {0}',
    'announce.diffModeChanged.sideBySide': 'Ansicht gewechselt zu Nebeneinander',
    'announce.diffModeChanged.unified': 'Ansicht gewechselt zu Vereinheitlicht',
    'announce.textImprovementCompleted': 'Textverbesserung abgeschlossen. Ergebnisse verfügbar.',
    'announce.error': 'Fehler: {0}'
};

function getMessage(key, ...args) {
    let message = messages[key] || key;
    if (args.length > 0) {
        args.forEach((arg, index) => {
            message = message.replace('{' + index + '}', arg);
        });
    }
    return message;
}

function switchLanguage(lang) {
    const url = new URL(window.location);
    url.searchParams.set('lang', lang);
    window.location.href = url.toString();
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

function showLoading() {
    const submitBtn = document.getElementById('submitBtn');
    const loading = document.getElementById('loading');
    const inputText = document.getElementById('inputText');
    
    // Validate form before submission
    if (!validateForm()) {
        return false;
    }
    
    submitBtn.disabled = true;
    submitBtn.textContent = getMessage('form.submit.processing');
    submitBtn.setAttribute('aria-busy', 'true');
    loading.style.display = 'block';
    loading.textContent = getMessage('loading.processingWait');
    
    // Remove any existing error states
    clearFormErrors();
    
    return true;
}

function validateForm() {
    // Check which form we're on
    const inputText = document.getElementById('inputText');
    const fileContent = document.getElementById('fileContent');
    const lineInstruction = document.getElementById('lineInstruction');
    
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
    
    // Line operations form validation
    if (fileContent && lineInstruction) {
        const fileContentValue = fileContent.value.trim();
        const lineInstructionValue = lineInstruction.value.trim();
        
        // Check if file content is empty
        if (!fileContentValue) {
            showFieldError(fileContent, 'Please enter file content.');
            return false;
        }
        
        // Check if line instruction is empty
        if (!lineInstructionValue) {
            showFieldError(lineInstruction, 'Please enter a line operation instruction.');
            return false;
        }
        
        // Check file content length limit
        if (fileContentValue.length > 50000) {
            showFieldError(fileContent, 'File content is too long (max. 50,000 characters).');
            return false;
        }
        
        // Check line instruction length limit
        if (lineInstructionValue.length > 500) {
            showFieldError(lineInstruction, 'Instruction is too long (max. 500 characters).');
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
    
    // Reset ARIA attributes for line operations form
    const fileContent = document.getElementById('fileContent');
    if (fileContent) {
        fileContent.setAttribute('aria-invalid', 'false');
        fileContent.setAttribute('aria-describedby', 'fileContent-help');
    }
    
    const lineInstruction = document.getElementById('lineInstruction');
    if (lineInstruction) {
        lineInstruction.setAttribute('aria-invalid', 'false');
        lineInstruction.setAttribute('aria-describedby', 'lineInstruction-help');
    }
}

let currentDiffMode = 'side-by-side';

function toggleDiffMode(mode) {
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
    
    // Use word-level diff for better readability
    const diff = Diff.diffWords(originalText, improvedText);
    
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
        span.textContent = part.value; // Safe - uses textContent instead of innerHTML
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
    
    // Process diff parts safely
    diff.forEach(function(part) {
        if (part.added) {
            const span = document.createElement('span');
            span.className = 'diff-added';
            span.textContent = part.value;
            improvedContent.appendChild(span);
        } else if (part.removed) {
            const span = document.createElement('span');
            span.className = 'diff-removed';
            span.textContent = part.value;
            originalContent.appendChild(span);
        } else {
            // Unchanged text goes to both columns
            const originalSpan = document.createElement('span');
            originalSpan.className = 'diff-unchanged';
            originalSpan.textContent = part.value;
            originalContent.appendChild(originalSpan);
            
            const improvedSpan = document.createElement('span');
            improvedSpan.className = 'diff-unchanged';
            improvedSpan.textContent = part.value;
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
    
    // Escape key to close dropdowns
    if (e.key === 'Escape') {
        const modelSelect = document.getElementById('selectedModel');
        const promptContainer = document.getElementById('prompt-container');
        
        if (modelSelect.style.display !== 'none') {
            toggleModelSelection();
        }
        if (promptContainer.style.display !== 'none') {
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
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            if (!validateForm()) {
                e.preventDefault();
                return false;
            }
            return showLoading();
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
        
        // Real-time validation feedback for line operations form
        const fileContent = document.getElementById('fileContent');
        if (fileContent) {
            fileContent.addEventListener('input', function() {
                if (this.getAttribute('aria-invalid') === 'true') {
                    // Clear error if user starts typing
                    clearFormErrors();
                }
            });
        }
        
        const lineInstruction = document.getElementById('lineInstruction');
        if (lineInstruction) {
            lineInstruction.addEventListener('input', function() {
                if (this.getAttribute('aria-invalid') === 'true') {
                    // Clear error if user starts typing
                    clearFormErrors();
                }
            });
        }
    }
    
    // Initialize diff when page loads and results are available
    if (document.getElementById('original-text') && document.getElementById('improved-text')) {
        renderDiff();
        announceToScreenReader(getMessage('announce.textImprovementCompleted'));
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