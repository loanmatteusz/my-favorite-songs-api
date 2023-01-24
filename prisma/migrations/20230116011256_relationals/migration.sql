/*
  Warnings:

  - You are about to drop the column `playlistId` on the `Music` table. All the data in the column will be lost.
  - Made the column `userId` on table `Playlist` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_musicId_fkey";

-- DropForeignKey
ALTER TABLE "Music" DROP CONSTRAINT "Music_playlistId_fkey";

-- DropForeignKey
ALTER TABLE "Playlist" DROP CONSTRAINT "Playlist_userId_fkey";

-- AlterTable
ALTER TABLE "Music" DROP COLUMN "playlistId";

-- AlterTable
ALTER TABLE "Playlist" ALTER COLUMN "userId" SET NOT NULL;

-- CreateTable
CREATE TABLE "PlaylistHasMusic" (
    "playlistId" TEXT NOT NULL,
    "musicId" TEXT NOT NULL,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assigned_by" TEXT NOT NULL,

    CONSTRAINT "PlaylistHasMusic_pkey" PRIMARY KEY ("playlistId","musicId")
);

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistHasMusic" ADD CONSTRAINT "PlaylistHasMusic_musicId_fkey" FOREIGN KEY ("musicId") REFERENCES "Music"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistHasMusic" ADD CONSTRAINT "PlaylistHasMusic_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_musicId_fkey" FOREIGN KEY ("musicId") REFERENCES "Music"("id") ON DELETE SET NULL ON UPDATE CASCADE;
