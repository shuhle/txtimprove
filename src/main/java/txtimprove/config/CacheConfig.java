package txtimprove.config;

import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.cache.support.SimpleCacheManager;
import org.springframework.cache.concurrent.ConcurrentMapCache;
import org.springframework.beans.factory.annotation.Value;

import java.util.Arrays;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.time.LocalDateTime;
import java.time.Duration;

@Configuration
@EnableCaching
public class CacheConfig {

    @Value("${cache.model-discovery.duration-minutes:5}")
    private int cacheDurationMinutes;

    @Bean
    public CacheManager cacheManager() {
        return new TTLCacheManager(cacheDurationMinutes);
    }
    
    private static class TTLCacheManager extends SimpleCacheManager {
        
        public TTLCacheManager(int durationMinutes) {
            setCaches(Arrays.asList(new TTLCache("modelCache", durationMinutes)));
        }
    }
    
    private static class TTLCache extends ConcurrentMapCache {
        private final Duration TTL;
        private final ConcurrentMap<Object, CacheEntry> store = new ConcurrentHashMap<>();
        
        public TTLCache(String name, int durationMinutes) {
            super(name);
            this.TTL = Duration.ofMinutes(durationMinutes);
        }
        
        @Override
        protected Object lookup(Object key) {
            CacheEntry entry = store.get(key);
            if (entry != null) {
                if (LocalDateTime.now().isAfter(entry.expiration)) {
                    store.remove(key);
                    return null;
                }
                return entry.value;
            }
            return null;
        }
        
        @Override
        public void put(Object key, Object value) {
            store.put(key, new CacheEntry(value, LocalDateTime.now().plus(TTL)));
        }
        
        @Override
        public void evict(Object key) {
            store.remove(key);
        }
        
        @Override
        public void clear() {
            store.clear();
        }
        
        private static class CacheEntry {
            final Object value;
            final LocalDateTime expiration;
            
            CacheEntry(Object value, LocalDateTime expiration) {
                this.value = value;
                this.expiration = expiration;
            }
        }
    }
}