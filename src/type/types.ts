/**
 * @file types.ts
 * @description Represents a note with title, body, tags, and timestamps.
 */

/**
 * Represents the structure of a single note object.
 */
export type NoteType = {
  id: string;
  title: string;
  tags: string[];
  body: string;
  createdAt: string;
  updatedAt: string;
}