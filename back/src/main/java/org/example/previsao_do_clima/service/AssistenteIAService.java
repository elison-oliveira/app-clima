package org.example.previsao_do_clima.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.List;
import java.util.Map;

@Service
public class AssistenteIAService {

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    @SuppressWarnings("unchecked")
    public String gerarRecomendacaoSeguranca(Double temp, Double umidade, String condicao) {
        String prompt = String.format("Atue como técnico de segurança do trabalho. Com base nos dados atuais (Temperatura: %s, Umidade: %s, Condição: %s), gere 3 recomendações curtas em português: 1. Melhor horário para trabalho externo; 2. Proteção/EPI necessário; 3. Vestimenta ideal.",
                temp, umidade, condicao);

        String geminiUrl = "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent";

        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(
                                Map.of("text", prompt)
                        ))
                )
        );

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // 2. A SOLUÇÃO: Passar a chave de API pelo Header oficial do Google
            headers.set("x-goog-api-key", geminiApiKey.trim());

            HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

            // 3. URI.create() garante que o Spring não transforme o ":" da URL em "%3A"
            ResponseEntity<Map> responseEntity = restTemplate.exchange(
                    URI.create(geminiUrl),
                    HttpMethod.POST,
                    requestEntity,
                    Map.class
            );

            Map<String, Object> response = responseEntity.getBody();

            if (response != null && response.containsKey("candidates")) {
                List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.get("candidates");
                if (candidates != null && !candidates.isEmpty()) {
                    Map<String, Object> content = (Map<String, Object>) candidates.get(0).get("content");
                    List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
                    if (parts != null && !parts.isEmpty()) {
                        return parts.get(0).get("text").toString().trim();
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("Erro na comunicação com a API do Gemini: " + e.getMessage());
        }

        return "1. Horário: Evite picos de sol. 2. EPI: Protetor solar e óculos. 3. Vestimenta: Roupas leves e claras.";
    }
}