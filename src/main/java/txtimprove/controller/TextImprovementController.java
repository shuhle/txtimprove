package txtimprove.controller;

import txtimprove.service.TextImprovementService;
import txtimprove.service.ModelDiscoveryService;
import txtimprove.service.MessageService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;
import java.util.regex.Pattern;

@Controller
public class TextImprovementController {

    private final TextImprovementService textImprovementService;
    private final ModelDiscoveryService modelDiscoveryService;
    private final MessageService messageService;
    
    // Pattern to detect potentially malicious content
    private static final Pattern MALICIOUS_PATTERN = Pattern.compile(
        "(?i)<script|javascript:|data:|vbscript:|on\\w+\\s*=|<iframe|<object|<embed",
        Pattern.CASE_INSENSITIVE
    );

    public TextImprovementController(TextImprovementService textImprovementService,
                                   ModelDiscoveryService modelDiscoveryService,
                                   MessageService messageService) {
        this.textImprovementService = textImprovementService;
        this.modelDiscoveryService = modelDiscoveryService;
        this.messageService = messageService;
    }

    @GetMapping("/")
    public String index(Model model) {
        // Fetch available models from the API
        List<String> availableModels = modelDiscoveryService.getAvailableModels();
        model.addAttribute("availableModels", availableModels);
        
        // If no inputText is present from flash attributes, use default text
        if (!model.containsAttribute("inputText")) {
            String defaultText = "";
            model.addAttribute("inputText", defaultText);
        }
        
        // If no custom prompt is present, use the default prompt
        if (!model.containsAttribute("customPrompt")) {
            model.addAttribute("customPrompt", textImprovementService.getDefaultPrompt());
        }
        
        // If no selected model is present, use the preferred model based on rules
        if (!model.containsAttribute("selectedModel") && !availableModels.isEmpty()) {
            String preferredModel = modelDiscoveryService.getPreferredModel(availableModels);
            model.addAttribute("selectedModel", preferredModel);
        }
        
        return "index";
    }

    @PostMapping("/improve")
    public String improveText(@RequestParam("inputText") String inputText,
                             @RequestParam(value = "customPrompt", required = false) String customPrompt,
                             @RequestParam(value = "selectedModel", required = false) String selectedModel,
                             RedirectAttributes redirectAttributes) {
        // Input validation and sanitization
        if (inputText == null || inputText.trim().isEmpty()) {
            redirectAttributes.addFlashAttribute("error", messageService.getMessage("error.inputRequired"));
            redirectAttributes.addFlashAttribute("customPrompt", customPrompt != null ? customPrompt : textImprovementService.getDefaultPrompt());
            redirectAttributes.addFlashAttribute("selectedModel", selectedModel);
            return "redirect:/";
        }
        
        // Security: Check for potentially malicious content
        if (MALICIOUS_PATTERN.matcher(inputText).find() || 
            (customPrompt != null && MALICIOUS_PATTERN.matcher(customPrompt).find())) {
            redirectAttributes.addFlashAttribute("error", messageService.getMessage("error.invalidContent"));
            return "redirect:/";
        }
        
        // Security: Limit input sizes to prevent DoS
        if (inputText.length() > 10000) {
            redirectAttributes.addFlashAttribute("error", messageService.getMessage("error.textTooLong"));
            redirectAttributes.addFlashAttribute("inputText", inputText.substring(0, 10000));
            redirectAttributes.addFlashAttribute("customPrompt", customPrompt != null ? customPrompt : textImprovementService.getDefaultPrompt());
            redirectAttributes.addFlashAttribute("selectedModel", selectedModel);
            return "redirect:/";
        }
        
        if (customPrompt != null && customPrompt.length() > 5000) {
            redirectAttributes.addFlashAttribute("error", messageService.getMessage("error.promptTooLong"));
            redirectAttributes.addFlashAttribute("inputText", inputText);
            redirectAttributes.addFlashAttribute("customPrompt", customPrompt.substring(0, 5000));
            redirectAttributes.addFlashAttribute("selectedModel", selectedModel);
            return "redirect:/";
        }

        String improvedText = textImprovementService.improveText(inputText, customPrompt, selectedModel);
        
        redirectAttributes.addFlashAttribute("inputText", inputText);
        redirectAttributes.addFlashAttribute("improvedText", improvedText);
        redirectAttributes.addFlashAttribute("customPrompt", customPrompt != null ? customPrompt : textImprovementService.getDefaultPrompt());
        redirectAttributes.addFlashAttribute("selectedModel", selectedModel);
        
        return "redirect:/";
    }
}