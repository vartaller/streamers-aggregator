-- CreateTable
CREATE TABLE "Stream" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startedAt" DATETIME NOT NULL,
    "endedAt" DATETIME NOT NULL,
    "averageViewers" INTEGER NOT NULL,
    "game" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,
    "streamerId" INTEGER NOT NULL,
    CONSTRAINT "Stream_streamerId_fkey" FOREIGN KEY ("streamerId") REFERENCES "Streamer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Stream_gameId_key" ON "Stream"("gameId");
