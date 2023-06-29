-- CreateTable
CREATE TABLE "Streamer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullName" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "info" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "likes" INTEGER,
    "dislikes" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Streamer_fullName_key" ON "Streamer"("fullName");
