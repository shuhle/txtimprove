package txtimprove.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.stereotype.Service;

@Service
public class TextImprovementService {

    private final ChatClient chatClient;
    
    private static final String DEFAULT_IMPROVEMENT_PROMPT = """
            Du bist ein professioneller Texteditor und Schreibcoach für die deutsche Sprache. 
            
            WICHTIG: Gib ausschließlich den verbesserten Text aus - ohne Erklärungen, Kommentare, Emojis, Markdown oder sonstige Zusätze.
            
            Verbessere den folgenden deutschen Text, indem du:
            1. Grammatik und Rechtschreibung korrigierst
            2. Den Stil und die Lesbarkeit verbesserst
            3. Klarheit und Präzision erhöhst
            4. Den Ton professioneller und ansprechender machst
            5. Die Struktur optimierst
            
            Behalte dabei den ursprünglichen Sinn und die Intention des Textes bei.
            Behalte die ursprüngliche Struktur und Formatierung (Absätze, Listen) bei.
            
            Ursprünglicher Text:
            {input_text}
            
            Verbesserter Text (nur der Text, keine Erklärungen):
            """;

    public TextImprovementService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    public String getDefaultPrompt() {
        return DEFAULT_IMPROVEMENT_PROMPT;
    }

    public String improveText(String inputText) {
        return improveText(inputText, null, null);
    }

    public String improveText(String inputText, String customPrompt) {
        return improveText(inputText, customPrompt, null);
    }

    public String improveText(String inputText, String customPrompt, String selectedModel) {
        try {
            String prompt = (customPrompt != null && !customPrompt.trim().isEmpty()) 
                ? customPrompt 
                : DEFAULT_IMPROVEMENT_PROMPT;
            
            var promptBuilder = chatClient.prompt()
                .user(userSpec -> userSpec.text(prompt.replace("{input_text}", inputText)));
            
            // If a specific model is selected, use it
            if (selectedModel != null && !selectedModel.trim().isEmpty()) {
                OpenAiChatOptions options = OpenAiChatOptions.builder()
                    .model(selectedModel)
                    .build();
                promptBuilder = promptBuilder.options(options);
            }
            
            String result = promptBuilder.call().content();
            
            // Clean up thinking/reasoning traces from models that output them
            return cleanLLMResponse(result);
        } catch (Exception e) {
            return "Fehler beim Verarbeiten des Textes: " + e.getMessage();
        }
    }

    private String cleanLLMResponse(String response) {
        if (response == null || response.trim().isEmpty()) {
            return response;
        }

        // Handle thinking traces with channel tags (e.g., <|channel|>analysis<|message|>....<|channel|>final<|message|>)
        if (response.contains("<|channel|>final<|message|>")) {
            String[] parts = response.split("<\\|channel\\|>final<\\|message\\|>");
            if (parts.length > 1) {
                // Extract everything after the final message marker
                String finalPart = parts[parts.length - 1];
                // Remove any trailing end markers
                finalPart = finalPart.replaceAll("<\\|end\\|>.*$", "").trim();
                return finalPart;
            }
        }

        // Handle other common thinking patterns
        if (response.contains("<|start|>assistant")) {
            String[] parts = response.split("<\\|start\\|>assistant");
            if (parts.length > 1) {
                String finalPart = parts[parts.length - 1];
                // Clean up any remaining channel markers
                finalPart = finalPart.replaceAll("<\\|channel\\|>[^<]*<\\|message\\|>", "").trim();
                finalPart = finalPart.replaceAll("<\\|end\\|>.*$", "").trim();
                return finalPart;
            }
        }

        // Handle simple thinking patterns like "Let me think..." followed by actual response
        if (response.contains("Let me think") || response.contains("I need to") || response.contains("Let's")) {
            // Try to find the last substantial sentence that looks like the final answer
            String[] sentences = response.split("\\.");
            for (int i = sentences.length - 1; i >= 0; i--) {
                String sentence = sentences[i].trim();
                // Skip thinking indicators and metadata
                if (!sentence.toLowerCase().contains("let me") && 
                    !sentence.toLowerCase().contains("i need") &&
                    !sentence.toLowerCase().contains("let's") &&
                    !sentence.contains("<|") &&
                    sentence.length() > 10) {
                    return sentence + ".";
                }
            }
        }

        // If no special patterns found, return original response
        return response.trim();
    }
}