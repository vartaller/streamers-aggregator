/*
  Warnings:

  - You are about to drop the column `gameId` on the `Stream` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Stream" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startedAt" DATETIME NOT NULL,
    "endedAt" DATETIME NOT NULL,
    "averageViewers" INTEGER NOT NULL,
    "game" TEXT NOT NULL,
    "streamerId" INTEGER NOT NULL,
    CONSTRAINT "Stream_streamerId_fkey" FOREIGN KEY ("streamerId") REFERENCES "Streamer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Stream" ("averageViewers", "description", "endedAt", "game", "id", "startedAt", "streamerId", "title") SELECT "averageViewers", "description", "endedAt", "game", "id", "startedAt", "streamerId", "title" FROM "Stream";
DROP TABLE "Stream";
ALTER TABLE "new_Stream" RENAME TO "Stream";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
