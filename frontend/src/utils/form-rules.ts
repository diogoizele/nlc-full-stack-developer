export const required = (field: string) => {
  return {
    required: `* ${field} is required`,
  };
};
