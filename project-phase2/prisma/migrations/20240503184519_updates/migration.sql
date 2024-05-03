/*
  Warnings:

  - Made the column `customerId` on table `Purchase` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Purchase" (
    "purchaseNo" TEXT NOT NULL PRIMARY KEY,
    "quantity" INTEGER NOT NULL,
    "purchaseDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalPrice" DECIMAL NOT NULL,
    "artworkNo" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    CONSTRAINT "Purchase_artworkNo_fkey" FOREIGN KEY ("artworkNo") REFERENCES "Artwork" ("artworkNo") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Purchase_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Purchase" ("artworkNo", "customerId", "purchaseDate", "purchaseNo", "quantity", "totalPrice") SELECT "artworkNo", "customerId", "purchaseDate", "purchaseNo", "quantity", "totalPrice" FROM "Purchase";
DROP TABLE "Purchase";
ALTER TABLE "new_Purchase" RENAME TO "Purchase";
CREATE UNIQUE INDEX "Purchase_artworkNo_key" ON "Purchase"("artworkNo");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
