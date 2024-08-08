/*
  Warnings:

  - You are about to drop the column `siteSelectionApproval` on the `SFAForm` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "SiteSelectionApproval" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "team" TEXT NOT NULL,
    "responsibility" TEXT NOT NULL,
    "acceptance" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "sign" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "comments" TEXT NOT NULL,
    "sfaFormId" INTEGER NOT NULL,
    CONSTRAINT "SiteSelectionApproval_sfaFormId_fkey" FOREIGN KEY ("sfaFormId") REFERENCES "SFAForm" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SFAForm" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectId" INTEGER NOT NULL,
    "siteOwnerContact" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "siteName" TEXT NOT NULL,
    "optionNo" TEXT NOT NULL,
    "siteLocation" TEXT NOT NULL,
    "siteType" TEXT NOT NULL,
    "traZone" TEXT NOT NULL,
    "siteCoordinates" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "surveyDate" DATETIME NOT NULL,
    "remarks" TEXT NOT NULL,
    CONSTRAINT "SFAForm_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SFAForm" ("address", "id", "optionNo", "projectId", "remarks", "siteCoordinates", "siteId", "siteLocation", "siteName", "siteOwnerContact", "siteType", "surveyDate", "traZone") SELECT "address", "id", "optionNo", "projectId", "remarks", "siteCoordinates", "siteId", "siteLocation", "siteName", "siteOwnerContact", "siteType", "surveyDate", "traZone" FROM "SFAForm";
DROP TABLE "SFAForm";
ALTER TABLE "new_SFAForm" RENAME TO "SFAForm";
CREATE UNIQUE INDEX "SFAForm_projectId_key" ON "SFAForm"("projectId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
