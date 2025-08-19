package txtimprove.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.stereotype.Service;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

@Service
public class TextImprovementService {

    private final ChatClient chatClient;
    private final MessageService messageService;

    public TextImprovementService(ChatClient.Builder chatClientBuilder, MessageService messageService) {
        this.chatClient = chatClientBuilder.build();
        this.messageService = messageService;
    }

    private static final Pattern[] THINKING_PATTERNS = {
        // XML-style thinking tags (case insensitive, multiline)
        Pattern.compile("<think[^>]*>.*?</think[^>]*>", Pattern.CASE_INSENSITIVE | Pattern.DOTALL),
        Pattern.compile("<thinking[^>]*>.*?</thinking[^>]*>", Pattern.CASE_INSENSITIVE | Pattern.DOTALL),
        Pattern.compile("<reasoning[^>]*>.*?</reasoning[^>]*>", Pattern.CASE_INSENSITIVE | Pattern.DOTALL),
        Pattern.compile("<thought[^>]*>.*?</thought[^>]*>", Pattern.CASE_INSENSITIVE | Pattern.DOTALL),
        Pattern.compile("<analysis[^>]*>.*?</analysis[^>]*>", Pattern.CASE_INSENSITIVE | Pattern.DOTALL),
        Pattern.compile("<planning[^>]*>.*?</planning[^>]*>", Pattern.CASE_INSENSITIVE | Pattern.DOTALL),
        Pattern.compile("<reflection[^>]*>.*?</reflection[^>]*>", Pattern.CASE_INSENSITIVE | Pattern.DOTALL),
        Pattern.compile("<internal[^>]*>.*?</internal[^>]*>", Pattern.CASE_INSENSITIVE | Pattern.DOTALL),
        
        // Markdown-style thinking headers (English and Chinese)
        Pattern.compile("\\*\\*\\s*(Thinking|思考|Thought|Analysis|Reasoning|Planning)\\s*[:：]\\*\\*.*?(?=\\n\\n|\\n\\*\\*|$)", Pattern.CASE_INSENSITIVE | Pattern.DOTALL),
        
        // Bracket-style thinking markers
        Pattern.compile("\\[\\s*(Thinking|思考|Thought|Analysis|Reasoning|Planning)\\s*[:：]?\\s*\\].*?(?=\\n\\n|\\n\\[|$)", Pattern.CASE_INSENSITIVE | Pattern.DOTALL),
        
        // Common thinking phrases at the start of responses
        Pattern.compile("^\\s*(Let me think about this|I need to think|思考一下|让我想想|分析一下).*?(?=\\n\\n|$)", Pattern.CASE_INSENSITIVE | Pattern.DOTALL | Pattern.MULTILINE),
        
        // Step-by-step thinking patterns
        Pattern.compile("^\\s*(Step \\d+:|步骤\\d+：|第\\d+步：)\\s*(Think|思考|分析).*?(?=\\n\\n|Step \\d+:|步骤\\d+：|第\\d+步：|$)", Pattern.CASE_INSENSITIVE | Pattern.DOTALL | Pattern.MULTILINE),
        
        // Channel-based structured output patterns (like <|channel|>analysis<|message|>...)
        Pattern.compile("<\\|channel\\|>[^<]*<\\|message\\|>.*?<\\|end\\|>", Pattern.CASE_INSENSITIVE | Pattern.DOTALL),
        Pattern.compile("<\\|start\\|>[^<]*<\\|channel\\|>(?!final)[^<]*<\\|message\\|>.*?(?=<\\|start\\||$)", Pattern.CASE_INSENSITIVE | Pattern.DOTALL)
    };

    private String removeThinkingContent(String text) {
        if (text == null || text.trim().isEmpty()) {
            return text;
        }
        
        String cleanedText = text;
        
        // Special handling for channel-based structured outputs
        // Extract only the final message from channel-based responses
        Pattern finalChannelPattern = Pattern.compile("<\\|start\\|>assistant<\\|channel\\|>final<\\|message\\|>(.*?)(?:<\\|end\\||$)", Pattern.CASE_INSENSITIVE | Pattern.DOTALL);
        Matcher finalMatcher = finalChannelPattern.matcher(cleanedText);
        if (finalMatcher.find()) {
            cleanedText = finalMatcher.group(1).trim();
        } else {
            // If no final channel found, try to extract any final content after channel markers
            Pattern anyFinalPattern = Pattern.compile("<\\|channel\\|>final<\\|message\\|>(.*?)(?:<\\|end\\||$)", Pattern.CASE_INSENSITIVE | Pattern.DOTALL);
            Matcher anyFinalMatcher = anyFinalPattern.matcher(cleanedText);
            if (anyFinalMatcher.find()) {
                cleanedText = anyFinalMatcher.group(1).trim();
            } else {
                // Apply all thinking patterns if no channel structure found
                for (Pattern pattern : THINKING_PATTERNS) {
                    cleanedText = pattern.matcher(cleanedText).replaceAll("");
                }
            }
        }
        
        // Remove excessive whitespace and empty lines
        cleanedText = cleanedText.replaceAll("\\n\\s*\\n\\s*\\n", "\n\n"); // Multiple empty lines to double
        cleanedText = cleanedText.replaceAll("^\\s+", ""); // Leading whitespace
        cleanedText = cleanedText.replaceAll("\\s+$", ""); // Trailing whitespace
        
        return cleanedText;
    }

    public String getDefaultPrompt() {
        return messageService.getMessage("prompt.default");
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
                : getDefaultPrompt();
            
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
            
            // Remove thinking content from the AI response
            String cleanedResult = removeThinkingContent(result);
            
            return cleanedResult;
        } catch (Exception e) {
            return messageService.getMessage("error.processing", new Object[]{e.getMessage()});
        }
    }
}