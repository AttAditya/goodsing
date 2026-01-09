import { callApi } from "@api/base";
import { VerseData } from "@interfaces/verse";

export async function fetchVerses() {
  return await callApi<VerseData[]>('/verses', 'GET');
}

