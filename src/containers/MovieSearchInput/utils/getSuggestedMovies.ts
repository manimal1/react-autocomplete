export const getSuggestedMovies = (suggestions: string[], userInput: string) =>
  suggestions.filter((suggestion: string) => suggestion.toLowerCase().includes(userInput.toLowerCase().trim()));
