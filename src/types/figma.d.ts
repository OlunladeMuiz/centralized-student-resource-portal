declare module 'figma:asset/*' {
  const value: string;
  export default value;
}

// also allow plain image imports if not already declared elsewhere
declare module '*.png' {
  const value: string;
  export default value;
}
