import { AnalysisResult } from "../types";

export const analyzeMeetingNotes = async (notes: string): Promise<AnalysisResult> => {
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ notes }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to analyze meeting notes.");
  }

  return response.json();
};
