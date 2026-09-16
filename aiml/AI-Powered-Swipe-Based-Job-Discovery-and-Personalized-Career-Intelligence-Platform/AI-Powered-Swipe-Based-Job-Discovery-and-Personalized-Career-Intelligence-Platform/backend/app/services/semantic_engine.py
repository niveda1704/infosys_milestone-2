import math
import re

STOP_WORDS = {
    "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are",
    "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but",
    "by", "can", "did", "do", "does", "doing", "down", "during", "each", "few", "for", "from",
    "further", "had", "has", "have", "having", "he", "her", "here", "hers", "herself", "him",
    "himself", "his", "how", "i", "if", "in", "into", "is", "it", "its", "itself", "just", "me",
    "more", "most", "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or",
    "other", "our", "ours", "ourselves", "out", "over", "own", "same", "she", "should", "so",
    "some", "such", "than", "that", "the", "their", "theirs", "them", "themselves", "then",
    "there", "these", "they", "this", "those", "through", "to", "too", "under", "until", "up",
    "very", "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom",
    "why", "with", "would", "you", "your", "yours", "yourself", "yourselves"
}


class SemanticMatchingEngine:
    def tokenize(self, text: str) -> list[str]:
        if not text:
            return []
        words = re.findall(r"\b[a-zA-Z0-9+#.-]+\b", text.lower())
        return [w for w in words if w not in STOP_WORDS and len(w) > 1]

    def compute_tf(self, tokens: list[str]) -> dict[str, float]:
        tf: dict[str, float] = {}
        if not tokens:
            return tf
        total = float(len(tokens))
        for token in tokens:
            tf[token] = tf.get(token, 0.0) + 1.0
        for token in tf:
            tf[token] = tf[token] / total
        return tf

    def calculate_similarity(self, text1: str, text2: str) -> float:
        tokens1 = self.tokenize(text1)
        tokens2 = self.tokenize(text2)

        if not tokens1 or not tokens2:
            return 0.0

        tf1 = self.compute_tf(tokens1)
        tf2 = self.compute_tf(tokens2)

        all_words: set[str] = set(tf1.keys()).union(set(tf2.keys()))

        dot_product = sum(tf1.get(w, 0.0) * tf2.get(w, 0.0) for w in all_words)
        norm1 = math.sqrt(sum(v * v for v in tf1.values()))
        norm2 = math.sqrt(sum(v * v for v in tf2.values()))

        if norm1 == 0.0 or norm2 == 0.0:
            return 0.0

        cosine_sim = dot_product / (norm1 * norm2)
        # Scaled non-linearly to range 0-100 for natural intuitive scores
        score = min(100.0, max(0.0, float(cosine_sim * 100.0 * 1.5)))
        return round(score, 1)


semantic_matching_engine = SemanticMatchingEngine()
