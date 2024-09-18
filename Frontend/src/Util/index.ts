// A utility function to concatenate CSS class names with proper spacing
const classNames = (...classNames: (string | undefined | null)[]): string => {
  // Filter out any empty class names and join them with a space
  return classNames.filter(Boolean).join(" ");
};

export default classNames;
