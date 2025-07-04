-- Rename tables
ALTER TABLE "Group" RENAME TO "group";
ALTER TABLE "Coordinate" RENAME TO "coordinate";
ALTER TABLE "Error" RENAME TO "error";

-- Rename columns in "group"
ALTER TABLE "group" RENAME COLUMN "chatId" TO "chat_id";

-- Rename columns in "coordinate"
ALTER TABLE "coordinate" RENAME COLUMN "imagePath" TO "image_path";
ALTER TABLE "coordinate" RENAME COLUMN "groupId" TO "group_id";
ALTER TABLE "coordinate" RENAME COLUMN "urlId" TO "url_id";

-- Rename foreign key constraint (drop and re-add)
ALTER TABLE "coordinate" DROP CONSTRAINT IF EXISTS "Coordinate_groupId_fkey";

ALTER TABLE "coordinate" ADD CONSTRAINT "coordinate_group_id_fkey"
    FOREIGN KEY ("group_id") REFERENCES "group"("id")
        ON DELETE SET NULL ON UPDATE CASCADE;

-- Rename index
ALTER INDEX IF EXISTS "Group_chatId_key" RENAME TO "group_chat_id_key";
