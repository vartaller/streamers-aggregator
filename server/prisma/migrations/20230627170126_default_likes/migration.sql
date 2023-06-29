-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Streamer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullName" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "info" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "likes" INTEGER DEFAULT 0,
    "dislikes" INTEGER DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Streamer" ("createdAt", "dislikes", "fullName", "id", "img", "info", "likes", "platform", "updatedAt") SELECT "createdAt", "dislikes", "fullName", "id", "img", "info", "likes", "platform", "updatedAt" FROM "Streamer";
DROP TABLE "Streamer";
ALTER TABLE "new_Streamer" RENAME TO "Streamer";
CREATE UNIQUE INDEX "Streamer_fullName_key" ON "Streamer"("fullName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
