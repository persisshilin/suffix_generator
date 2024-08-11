function getSuffix(root) {
    // Define rules for different types of root words
    const rules = [
        // For words ending with certain patterns
        { pattern: /y$/, suffix: 'ful' }, // Example: "beauty" -> "beautiful"
        { pattern: /able$/, suffix: 'ability' }, // Example: "able" -> "ability"
        { pattern: /e$/, suffix: 'ed' }, // Example: "love" -> "loved"
        { pattern: /i$/, suffix: 'ness' }, // Example: "happy" -> "happiness"
        { pattern: /([aeiou])$/, suffix: 'ing' }, // Example: "play" -> "playing"
        { pattern: /([bcdfghjklmnpqrstvwxyz])$/, suffix: 'ing' }, // Example: "sing" -> "singing"
        { pattern: /([a-z])$/, suffix: 'ly' }, // Example: "quick" -> "quickly"
        { pattern: /$/, suffix: 'ness' } // Default suffix
    ];

    // Apply rules based on the root word
    for (const rule of rules) {
        if (rule.pattern.test(root)) {
            return root.replace(rule.pattern, rule.suffix);
        }
    }

    // Fallback if no rule matches
    return root + 'ing'; // Default suffix
}

module.exports = getSuffix;
