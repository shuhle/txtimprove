package txtimprove.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.RestClientException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.ArrayList;
import java.util.Collections;

@Service
public class ModelDiscoveryService {

    @Value("${spring.ai.openai.base-url}")
    private String baseUrl;

    @Value("${spring.ai.openai.api-key}")
    private String apiKey;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public ModelDiscoveryService() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }

    public List<String> getAvailableModels() {
        try {
            String modelsUrl = baseUrl.endsWith("/") ? baseUrl + "v1/models" : baseUrl + "/v1/models";
            
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + apiKey);
            headers.set("Content-Type", "application/json");
            
            HttpEntity<String> entity = new HttpEntity<>(headers);
            
            ResponseEntity<String> response = restTemplate.exchange(
                modelsUrl, 
                HttpMethod.GET, 
                entity, 
                String.class
            );
            
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                return parseModelsFromResponse(response.getBody());
            }
            
        } catch (RestClientException e) {
            // Log error without exposing sensitive information
            System.err.println("Failed to fetch models from API: " + (e.getMessage() != null ? e.getMessage().replaceAll("(?i)(key|token|password)=[^\\s]*", "$1=***") : "Unknown error"));
        } catch (Exception e) {
            System.err.println("Error parsing models response: " + (e.getMessage() != null ? e.getMessage() : "Unknown parsing error"));
        }
        
        // Fallback to default model if API call fails
        return Collections.singletonList("local-model");
    }

    private List<String> parseModelsFromResponse(String responseBody) throws Exception {
        List<String> models = new ArrayList<>();
        
        JsonNode rootNode = objectMapper.readTree(responseBody);
        JsonNode dataNode = rootNode.get("data");
        
        if (dataNode != null && dataNode.isArray()) {
            for (JsonNode modelNode : dataNode) {
                JsonNode idNode = modelNode.get("id");
                if (idNode != null && idNode.isTextual()) {
                    models.add(idNode.asText());
                }
            }
        }
        
        if (models.isEmpty()) {
            return Collections.singletonList("local-model");
        }
        
        // Sort models alphabetically for deterministic ordering
        Collections.sort(models);
        
        return models;
    }

    public String getPreferredModel(List<String> models) {
        if (models == null || models.isEmpty()) {
            return "local-model";
        }
        
        // Rule 1: Prefer models containing "mistral" (case-insensitive)
        for (String model : models) {
            if (model.toLowerCase().contains("mistral")) {
                return model;
            }
        }
        
        // Rule 2: Prefer models containing "gemma" (case-insensitive)
        for (String model : models) {
            if (model.toLowerCase().contains("gemma")) {
                return model;
            }
        }
        
        // Rule 3: Return first model from sorted list (deterministic)
        return models.get(0);
    }
}