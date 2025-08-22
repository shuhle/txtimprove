package txtimprove.controller;

import txtimprove.service.MessageService;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

@RestController
@RequestMapping("/api/i18n")
public class I18nController {

    private final MessageService messageService;

    public I18nController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("/messages")
    public ResponseEntity<Map<String, String>> getMessages() {
        Map<String, String> messages = new HashMap<>();
        Locale currentLocale = LocaleContextHolder.getLocale();
        
        // Form and loading messages
        messages.put("form.submit.processing", messageService.getMessage("form.submit.processing", currentLocale));
        messages.put("loading.processingWait", messageService.getMessage("loading.processingWait", currentLocale));
        
        // External LLM form messages
        messages.put("form.externalLlm.process", messageService.getMessage("form.externalLlm.process", currentLocale));
        messages.put("form.externalLlm.processing", messageService.getMessage("form.externalLlm.processing", currentLocale));
        
        // Error messages
        messages.put("error.emptyText", messageService.getMessage("error.emptyText", currentLocale));
        messages.put("error.minLength", messageService.getMessage("error.minLength", currentLocale));
        messages.put("error.maxLength", messageService.getMessage("error.maxLength", currentLocale));
        messages.put("error.diffLibraryNotLoaded", messageService.getMessage("error.diffLibraryNotLoaded", currentLocale));
        messages.put("error.emptyResponse", messageService.getMessage("error.emptyResponse", currentLocale));
        messages.put("error.processingFailed", messageService.getMessage("error.processingFailed", currentLocale));
        
        // Form toggle messages
        messages.put("form.promptToggle.hide", messageService.getMessage("form.promptToggle.hide", currentLocale));
        messages.put("form.promptToggle.show", messageService.getMessage("form.promptToggle.show", currentLocale));
        
        // Results messages
        messages.put("results.heading", messageService.getMessage("results.heading", currentLocale));
        messages.put("results.diff.heading", messageService.getMessage("results.diff.heading", currentLocale));
        messages.put("results.diff.sideBySide", messageService.getMessage("results.diff.sideBySide", currentLocale));
        messages.put("results.diff.unified", messageService.getMessage("results.diff.unified", currentLocale));
        messages.put("results.diff.originalText", messageService.getMessage("results.diff.originalText", currentLocale));
        messages.put("results.diff.improvedText", messageService.getMessage("results.diff.improvedText", currentLocale));
        messages.put("results.copy.button", messageService.getMessage("results.copy.button", currentLocale));
        messages.put("results.copy.success", messageService.getMessage("results.copy.success", currentLocale));
        messages.put("results.copy.error", messageService.getMessage("results.copy.error", currentLocale));
        
        // Announcement messages for screen readers
        messages.put("announce.promptOpened", messageService.getMessage("announce.promptOpened", currentLocale));
        messages.put("announce.promptClosed", messageService.getMessage("announce.promptClosed", currentLocale));
        messages.put("announce.modelSelectionOpened", messageService.getMessage("announce.modelSelectionOpened", currentLocale));
        messages.put("announce.modelSelected", messageService.getMessage("announce.modelSelected", currentLocale));
        messages.put("announce.diffModeChanged.sideBySide", messageService.getMessage("announce.diffModeChanged.sideBySide", currentLocale));
        messages.put("announce.diffModeChanged.unified", messageService.getMessage("announce.diffModeChanged.unified", currentLocale));
        messages.put("announce.textImprovementCompleted", messageService.getMessage("announce.textImprovementCompleted", currentLocale));
        messages.put("announce.error", messageService.getMessage("announce.error", currentLocale));
        messages.put("announce.externalLlmModalOpened", messageService.getMessage("announce.externalLlmModalOpened", currentLocale));
        messages.put("announce.externalLlmModalClosed", messageService.getMessage("announce.externalLlmModalClosed", currentLocale));
        messages.put("announce.externalLlmProcessed", messageService.getMessage("announce.externalLlmProcessed", currentLocale));
        
        // Input text messages
        messages.put("form.inputText.clear", messageService.getMessage("form.inputText.clear", currentLocale));
        messages.put("form.inputText.paste", messageService.getMessage("form.inputText.paste", currentLocale));
        messages.put("js.form.inputText.paste.success", messageService.getMessage("js.form.inputText.paste.success", currentLocale));
        messages.put("js.form.inputText.paste.error", messageService.getMessage("js.form.inputText.paste.error", currentLocale));
        
        return ResponseEntity.ok(messages);
    }
}