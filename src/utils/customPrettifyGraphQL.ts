export const customPrettifyGraphQL = (gqlQuery: string): string => {
  let indentLevel = 0;
  const indentSize = 2;

  return gqlQuery
    .split('\n')
    .map((line) => line.trim())
    .map((line) => {
      if (line.startsWith('}')) {
        indentLevel -= 1;
      }

      const formattedLine = ' '.repeat(indentLevel * indentSize) + line;

      if (line.endsWith('{')) {
        indentLevel += 1;
      }

      return formattedLine;
    })
    .join('\n');
};
