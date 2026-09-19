import fs from "fs";
import path from "path";
import { DEFAULT_LANGUAGE, isLanguage, Languages } from "../types";

const WORDS_DIR = path.join(__dirname, "../../words");
const CUSTOM_WORDS_WEIGHT = 3;

// Cache words in memory
const wordsCache: Partial<Record<Languages, string[]>> = {};

// Load words for a validated language code.
function loadWords(language: Languages): Promise<string[]> {
  return new Promise((resolve, reject) => {
    // Return cached words if already loaded
    if (wordsCache[language]) {
      return resolve(wordsCache[language]!);
    }

    const filePath = path.join(WORDS_DIR, `${language}.txt`);

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return reject(
          new Error(
            `Failed to load words for "${language}": ${err.message}\n` +
            `Expected file: ${filePath}`
          )
        );
      }

      const words = data
        .split(/\r?\n/)
        .map((word) => word.trim())
        .filter(Boolean);

      if (words.length === 0) {
        return reject(new Error(`No words found in ${filePath}`));
      }

      wordsCache[language] = words;

      resolve(words);
    });
  });
}

// Get random words
export async function getRandomWords(
  n: number = 1,
  language: Languages,
  onlyCustomWords: boolean = false,
  customWords: string[] = []
): Promise<string[]> {
  // Redis rooms created by an older client may contain null, "null", or an
  // invalid value. Never turn one of those values into a filename.
  const selectedLanguage = isLanguage(language) ? language : DEFAULT_LANGUAGE;

  if (n <= 0) {
    return [];
  }

  let words: string[] = [];

  // Only use custom words
  if (onlyCustomWords) {
    if (customWords.length < n) {
      throw new Error(
        `Not enough custom words provided. Required: ${n}, Available: ${customWords.length}`
      );
    }

    words = [...customWords];
  } else {
    // Load normal language words
    const loadedWords = await loadWords(selectedLanguage);

    // Add custom words with weight
    words = [
      ...loadedWords,
      ...Array(CUSTOM_WORDS_WEIGHT)
        .fill(null)
        .flatMap(() => customWords),
    ];

    if (words.length < n) {
      throw new Error(
        `Not enough words available for "${selectedLanguage}". Required: ${n}, Available: ${words.length}`
      );
    }
  }

  // Fisher-Yates shuffle
  for (let i = words.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [words[i], words[j]] = [words[j], words[i]];
  }

  // Return requested number of words
  return words.slice(0, n);
}

// Convert phrase to underscores/word lengths
export function convertToUnderscores(phrase: string): number[] {
  return phrase
    .split(" ")
    .map((word) => word.length);
}
