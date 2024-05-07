export const capitalizeFirstLetter = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const columnName: string[] = ["id", "type", "setup", "punchline"];
