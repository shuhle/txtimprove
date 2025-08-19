package txtimprove.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;
import java.util.List;
import java.util.Locale;

public class CustomLocaleResolver extends SessionLocaleResolver {

    private static final List<Locale> SUPPORTED_LOCALES = List.of(Locale.GERMAN, Locale.ENGLISH);

    public CustomLocaleResolver() {
        setDefaultLocale(Locale.GERMAN);
    }

    @Override
    public Locale resolveLocale(HttpServletRequest request) {
        // First check if there's a manual language selection in session
        Locale sessionLocale = (Locale) request.getSession().getAttribute(LOCALE_SESSION_ATTRIBUTE_NAME);
        if (sessionLocale != null) {
            return sessionLocale;
        }

        // If no manual selection, use browser's preferred language
        String acceptLanguage = request.getHeader("Accept-Language");
        if (acceptLanguage != null && !acceptLanguage.isEmpty()) {
            // Parse Accept-Language header and find best match
            Locale browserLocale = request.getLocale();
            
            // Check if browser's preferred language is supported
            for (Locale supportedLocale : SUPPORTED_LOCALES) {
                if (supportedLocale.getLanguage().equals(browserLocale.getLanguage())) {
                    return supportedLocale;
                }
            }
        }

        // Fall back to default locale
        return getDefaultLocale();
    }

    @Override
    public void setLocale(HttpServletRequest request, HttpServletResponse response, Locale locale) {
        // Store the manually selected locale in session
        super.setLocale(request, response, locale);
    }
}