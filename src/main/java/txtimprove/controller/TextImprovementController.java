package txtimprove.controller;

import txtimprove.service.TextImprovementService;
import txtimprove.service.LineOperationsService;
import txtimprove.service.NShotService;
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
    private final LineOperationsService lineOperationsService;
    private final NShotService nShotService;
    private final ModelDiscoveryService modelDiscoveryService;
    private final MessageService messageService;
    
    // Pattern to detect potentially malicious content
    private static final Pattern MALICIOUS_PATTERN = Pattern.compile(
        "(?i)<script|javascript:|data:|vbscript:|on\\w+\\s*=|<iframe|<object|<embed",
        Pattern.CASE_INSENSITIVE
    );

    public TextImprovementController(TextImprovementService textImprovementService,
                                   LineOperationsService lineOperationsService,
                                   NShotService nShotService,
                                   ModelDiscoveryService modelDiscoveryService,
                                   MessageService messageService) {
        this.textImprovementService = textImprovementService;
        this.lineOperationsService = lineOperationsService;
        this.nShotService = nShotService;
        this.modelDiscoveryService = modelDiscoveryService;
        this.messageService = messageService;
    }

    @GetMapping("/")
    public String index(Model model) {
        return "start";
    }
    
    @GetMapping("/improve")
    public String improve(Model model) {
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
        
        return "improve";
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
            return "redirect:/improve";
        }
        
        // Security: Check for potentially malicious content
        if (MALICIOUS_PATTERN.matcher(inputText).find() || 
            (customPrompt != null && MALICIOUS_PATTERN.matcher(customPrompt).find())) {
            redirectAttributes.addFlashAttribute("error", messageService.getMessage("error.invalidContent"));
            return "redirect:/improve";
        }
        
        // Security: Limit input sizes to prevent DoS
        if (inputText.length() > 10000) {
            redirectAttributes.addFlashAttribute("error", messageService.getMessage("error.textTooLong"));
            redirectAttributes.addFlashAttribute("inputText", inputText.substring(0, 10000));
            redirectAttributes.addFlashAttribute("customPrompt", customPrompt != null ? customPrompt : textImprovementService.getDefaultPrompt());
            redirectAttributes.addFlashAttribute("selectedModel", selectedModel);
            return "redirect:/improve";
        }
        
        if (customPrompt != null && customPrompt.length() > 5000) {
            redirectAttributes.addFlashAttribute("error", messageService.getMessage("error.promptTooLong"));
            redirectAttributes.addFlashAttribute("inputText", inputText);
            redirectAttributes.addFlashAttribute("customPrompt", customPrompt.substring(0, 5000));
            redirectAttributes.addFlashAttribute("selectedModel", selectedModel);
            return "redirect:/improve";
        }

        String improvedText = textImprovementService.improveText(inputText, customPrompt, selectedModel);
        
        redirectAttributes.addFlashAttribute("inputText", inputText);
        redirectAttributes.addFlashAttribute("improvedText", improvedText);
        redirectAttributes.addFlashAttribute("customPrompt", customPrompt != null ? customPrompt : textImprovementService.getDefaultPrompt());
        redirectAttributes.addFlashAttribute("selectedModel", selectedModel);
        
        return "redirect:/improve";
    }

    @GetMapping("/lineops")
    public String lineOperations(Model model) {
        // Fetch available models from the API
        List<String> availableModels = modelDiscoveryService.getAvailableModels();
        model.addAttribute("availableModels", availableModels);
        
        // If no fileContent is present from flash attributes, use default text
        if (!model.containsAttribute("fileContent")) {
            String defaultContent = "";
            model.addAttribute("fileContent", defaultContent);
        }
        
        // If no lineInstruction is present from flash attributes, use default
        if (!model.containsAttribute("lineInstruction")) {
            String defaultInstruction = "";
            model.addAttribute("lineInstruction", defaultInstruction);
        }
        
        // If no custom prompt is present, use the default prompt
        if (!model.containsAttribute("customPrompt")) {
            model.addAttribute("customPrompt", lineOperationsService.getDefaultPrompt());
        }
        
        // If no selected model is present, use the preferred model based on rules
        if (!model.containsAttribute("selectedModel") && !availableModels.isEmpty()) {
            String preferredModel = modelDiscoveryService.getPreferredModel(availableModels);
            model.addAttribute("selectedModel", preferredModel);
        }
        
        return "lineops";
    }

    @PostMapping("/lineops")
    public String processLineOperations(@RequestParam("fileContent") String fileContent,
                                      @RequestParam("lineInstruction") String lineInstruction,
                                      @RequestParam(value = "customPrompt", required = false) String customPrompt,
                                      @RequestParam(value = "selectedModel", required = false) String selectedModel,
                                      RedirectAttributes redirectAttributes) {
        // Input validation and sanitization
        if (fileContent == null || fileContent.trim().isEmpty()) {
            redirectAttributes.addFlashAttribute("error", messageService.getMessage("error.fileContentRequired"));
            redirectAttributes.addFlashAttribute("lineInstruction", lineInstruction);
            redirectAttributes.addFlashAttribute("customPrompt", customPrompt != null ? customPrompt : lineOperationsService.getDefaultPrompt());
            redirectAttributes.addFlashAttribute("selectedModel", selectedModel);
            return "redirect:/lineops";
        }
        
        if (lineInstruction == null || lineInstruction.trim().isEmpty()) {
            redirectAttributes.addFlashAttribute("error", messageService.getMessage("error.lineInstructionRequired"));
            redirectAttributes.addFlashAttribute("fileContent", fileContent);
            redirectAttributes.addFlashAttribute("customPrompt", customPrompt != null ? customPrompt : lineOperationsService.getDefaultPrompt());
            redirectAttributes.addFlashAttribute("selectedModel", selectedModel);
            return "redirect:/lineops";
        }
        
        // Security: Check for potentially malicious content
        if (MALICIOUS_PATTERN.matcher(fileContent).find() || 
            MALICIOUS_PATTERN.matcher(lineInstruction).find() ||
            (customPrompt != null && MALICIOUS_PATTERN.matcher(customPrompt).find())) {
            redirectAttributes.addFlashAttribute("error", messageService.getMessage("error.invalidContent"));
            return "redirect:/lineops";
        }
        
        // Security: Limit input sizes to prevent DoS
        if (fileContent.length() > 50000) {
            redirectAttributes.addFlashAttribute("error", messageService.getMessage("error.fileContentTooLong"));
            redirectAttributes.addFlashAttribute("fileContent", fileContent.substring(0, 50000));
            redirectAttributes.addFlashAttribute("lineInstruction", lineInstruction);
            redirectAttributes.addFlashAttribute("customPrompt", customPrompt != null ? customPrompt : lineOperationsService.getDefaultPrompt());
            redirectAttributes.addFlashAttribute("selectedModel", selectedModel);
            return "redirect:/lineops";
        }
        
        if (lineInstruction.length() > 500) {
            redirectAttributes.addFlashAttribute("error", messageService.getMessage("error.lineInstructionTooLong"));
            redirectAttributes.addFlashAttribute("fileContent", fileContent);
            redirectAttributes.addFlashAttribute("lineInstruction", lineInstruction.substring(0, 500));
            redirectAttributes.addFlashAttribute("customPrompt", customPrompt != null ? customPrompt : lineOperationsService.getDefaultPrompt());
            redirectAttributes.addFlashAttribute("selectedModel", selectedModel);
            return "redirect:/lineops";
        }
        
        if (customPrompt != null && customPrompt.length() > 5000) {
            redirectAttributes.addFlashAttribute("error", messageService.getMessage("error.promptTooLong"));
            redirectAttributes.addFlashAttribute("fileContent", fileContent);
            redirectAttributes.addFlashAttribute("lineInstruction", lineInstruction);
            redirectAttributes.addFlashAttribute("customPrompt", customPrompt.substring(0, 5000));
            redirectAttributes.addFlashAttribute("selectedModel", selectedModel);
            return "redirect:/lineops";
        }

        String processedText = lineOperationsService.processLines(fileContent, lineInstruction, customPrompt, selectedModel);
        
        redirectAttributes.addFlashAttribute("fileContent", fileContent);
        redirectAttributes.addFlashAttribute("lineInstruction", lineInstruction);
        redirectAttributes.addFlashAttribute("processedText", processedText);
        redirectAttributes.addFlashAttribute("customPrompt", customPrompt != null ? customPrompt : lineOperationsService.getDefaultPrompt());
        redirectAttributes.addFlashAttribute("selectedModel", selectedModel);
        
        return "redirect:/lineops";
    }

    @GetMapping("/nshot")
    public String nShot(Model model) {
        // Fetch available models from the API
        List<String> availableModels = modelDiscoveryService.getAvailableModels();
        model.addAttribute("availableModels", availableModels);
        
        // If no newProblem is present from flash attributes, use default text
        if (!model.containsAttribute("newProblem")) {
            String defaultProblem = "";
            model.addAttribute("newProblem", defaultProblem);
        }
        
        // If no custom prompt is present, use the default prompt
        if (!model.containsAttribute("customPrompt")) {
            model.addAttribute("customPrompt", nShotService.getDefaultPrompt());
        }
        
        // If no selected model is present, use the preferred model based on rules
        if (!model.containsAttribute("selectedModel") && !availableModels.isEmpty()) {
            String preferredModel = modelDiscoveryService.getPreferredModel(availableModels);
            model.addAttribute("selectedModel", preferredModel);
        }
        
        return "nshot";
    }

    @PostMapping("/nshot")
    public String processNShot(@RequestParam("newProblem") String newProblem,
                              @RequestParam(value = "problems", required = false) List<String> problems,
                              @RequestParam(value = "solutions", required = false) List<String> solutions,
                              @RequestParam(value = "customPrompt", required = false) String customPrompt,
                              @RequestParam(value = "selectedModel", required = false) String selectedModel,
                              RedirectAttributes redirectAttributes) {
        // Input validation and sanitization
        if (newProblem == null || newProblem.trim().isEmpty()) {
            redirectAttributes.addFlashAttribute("error", messageService.getMessage("error.newProblemRequired"));
            redirectAttributes.addFlashAttribute("problems", problems);
            redirectAttributes.addFlashAttribute("solutions", solutions);
            redirectAttributes.addFlashAttribute("customPrompt", customPrompt != null ? customPrompt : nShotService.getDefaultPrompt());
            redirectAttributes.addFlashAttribute("selectedModel", selectedModel);
            return "redirect:/nshot";
        }
        
        // Validate that we have at least one example
        if (problems == null || problems.isEmpty() || solutions == null || solutions.isEmpty()) {
            redirectAttributes.addFlashAttribute("error", messageService.getMessage("error.examplesRequired"));
            redirectAttributes.addFlashAttribute("newProblem", newProblem);
            redirectAttributes.addFlashAttribute("customPrompt", customPrompt != null ? customPrompt : nShotService.getDefaultPrompt());
            redirectAttributes.addFlashAttribute("selectedModel", selectedModel);
            return "redirect:/nshot";
        }
        
        // Filter out empty problems and solutions
        List<String> filteredProblems = problems.stream().filter(p -> p != null && !p.trim().isEmpty()).toList();
        List<String> filteredSolutions = solutions.stream().filter(s -> s != null && !s.trim().isEmpty()).toList();
        
        if (filteredProblems.isEmpty() || filteredSolutions.isEmpty()) {
            redirectAttributes.addFlashAttribute("error", messageService.getMessage("error.examplesRequired"));
            redirectAttributes.addFlashAttribute("newProblem", newProblem);
            redirectAttributes.addFlashAttribute("problems", problems);
            redirectAttributes.addFlashAttribute("solutions", solutions);
            redirectAttributes.addFlashAttribute("customPrompt", customPrompt != null ? customPrompt : nShotService.getDefaultPrompt());
            redirectAttributes.addFlashAttribute("selectedModel", selectedModel);
            return "redirect:/nshot";
        }
        
        // Security: Check for potentially malicious content
        boolean maliciousFound = MALICIOUS_PATTERN.matcher(newProblem).find() ||
                               (customPrompt != null && MALICIOUS_PATTERN.matcher(customPrompt).find());
        
        for (String problem : filteredProblems) {
            if (MALICIOUS_PATTERN.matcher(problem).find()) {
                maliciousFound = true;
                break;
            }
        }
        
        for (String solution : filteredSolutions) {
            if (MALICIOUS_PATTERN.matcher(solution).find()) {
                maliciousFound = true;
                break;
            }
        }
        
        if (maliciousFound) {
            redirectAttributes.addFlashAttribute("error", messageService.getMessage("error.invalidContent"));
            return "redirect:/nshot";
        }
        
        // Security: Limit input sizes to prevent DoS
        if (newProblem.length() > 2000) {
            redirectAttributes.addFlashAttribute("error", messageService.getMessage("error.newProblemTooLong"));
            redirectAttributes.addFlashAttribute("newProblem", newProblem.substring(0, 2000));
            redirectAttributes.addFlashAttribute("problems", problems);
            redirectAttributes.addFlashAttribute("solutions", solutions);
            redirectAttributes.addFlashAttribute("customPrompt", customPrompt != null ? customPrompt : nShotService.getDefaultPrompt());
            redirectAttributes.addFlashAttribute("selectedModel", selectedModel);
            return "redirect:/nshot";
        }
        
        // Check each problem and solution length
        for (int i = 0; i < filteredProblems.size(); i++) {
            if (filteredProblems.get(i).length() > 1000) {
                redirectAttributes.addFlashAttribute("error", messageService.getMessage("error.exampleTooLong"));
                redirectAttributes.addFlashAttribute("newProblem", newProblem);
                redirectAttributes.addFlashAttribute("problems", problems);
                redirectAttributes.addFlashAttribute("solutions", solutions);
                redirectAttributes.addFlashAttribute("customPrompt", customPrompt != null ? customPrompt : nShotService.getDefaultPrompt());
                redirectAttributes.addFlashAttribute("selectedModel", selectedModel);
                return "redirect:/nshot";
            }
        }
        
        for (int i = 0; i < filteredSolutions.size(); i++) {
            if (filteredSolutions.get(i).length() > 1000) {
                redirectAttributes.addFlashAttribute("error", messageService.getMessage("error.exampleTooLong"));
                redirectAttributes.addFlashAttribute("newProblem", newProblem);
                redirectAttributes.addFlashAttribute("problems", problems);
                redirectAttributes.addFlashAttribute("solutions", solutions);
                redirectAttributes.addFlashAttribute("customPrompt", customPrompt != null ? customPrompt : nShotService.getDefaultPrompt());
                redirectAttributes.addFlashAttribute("selectedModel", selectedModel);
                return "redirect:/nshot";
            }
        }
        
        if (customPrompt != null && customPrompt.length() > 5000) {
            redirectAttributes.addFlashAttribute("error", messageService.getMessage("error.promptTooLong"));
            redirectAttributes.addFlashAttribute("newProblem", newProblem);
            redirectAttributes.addFlashAttribute("problems", problems);
            redirectAttributes.addFlashAttribute("solutions", solutions);
            redirectAttributes.addFlashAttribute("customPrompt", customPrompt.substring(0, 5000));
            redirectAttributes.addFlashAttribute("selectedModel", selectedModel);
            return "redirect:/nshot";
        }

        String generatedSolution = nShotService.generateSolution(filteredProblems, filteredSolutions, newProblem, customPrompt, selectedModel);
        
        redirectAttributes.addFlashAttribute("newProblem", newProblem);
        redirectAttributes.addFlashAttribute("problems", problems);
        redirectAttributes.addFlashAttribute("solutions", solutions);
        redirectAttributes.addFlashAttribute("generatedSolution", generatedSolution);
        redirectAttributes.addFlashAttribute("customPrompt", customPrompt != null ? customPrompt : nShotService.getDefaultPrompt());
        redirectAttributes.addFlashAttribute("selectedModel", selectedModel);
        
        return "redirect:/nshot";
    }
}