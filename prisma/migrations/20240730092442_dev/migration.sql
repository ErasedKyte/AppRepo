/*
  Warnings:

  - You are about to drop the `Department` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `departmentId` on the `SarfForm` table. All the data in the column will be lost.
  - You are about to drop the column `submittedBy` on the `SarfForm` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Department_name_key";

-- DropIndex
DROP INDEX "User_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Department";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SarfForm" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "submittedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "ProjectName" TEXT NOT NULL,
    "NominalSiteId" TEXT NOT NULL,
    "NominalSiteName" TEXT NOT NULL,
    "RoadName" TEXT NOT NULL,
    "BlockNumber" INTEGER NOT NULL,
    "Longitude" REAL NOT NULL,
    "Latitude" REAL NOT NULL,
    "SearchRadius" INTEGER NOT NULL,
    "CellType" TEXT NOT NULL,
    "NoOfAntenna1" INTEGER NOT NULL,
    "AntennaSize1" TEXT NOT NULL,
    "RequiredAntennaHeight1" INTEGER NOT NULL,
    "AntennaAzimuth1" REAL NOT NULL,
    "NoOfAntenna2" INTEGER NOT NULL,
    "AntennaSize2" TEXT NOT NULL,
    "RequiredAntennaHeight2" INTEGER NOT NULL,
    "AntennaAzimuth2" REAL NOT NULL,
    "NoOfAntenna3" INTEGER NOT NULL,
    "AntennaSize3" TEXT NOT NULL,
    "RequiredAntennaHeight3" INTEGER NOT NULL,
    "AntennaAzimuth3" REAL NOT NULL
);
INSERT INTO "new_SarfForm" ("AntennaAzimuth1", "AntennaAzimuth2", "AntennaAzimuth3", "AntennaSize1", "AntennaSize2", "AntennaSize3", "BlockNumber", "CellType", "Latitude", "Longitude", "NoOfAntenna1", "NoOfAntenna2", "NoOfAntenna3", "NominalSiteId", "NominalSiteName", "ProjectName", "RequiredAntennaHeight1", "RequiredAntennaHeight2", "RequiredAntennaHeight3", "RoadName", "SearchRadius", "id", "status", "submittedAt") SELECT "AntennaAzimuth1", "AntennaAzimuth2", "AntennaAzimuth3", "AntennaSize1", "AntennaSize2", "AntennaSize3", "BlockNumber", "CellType", "Latitude", "Longitude", "NoOfAntenna1", "NoOfAntenna2", "NoOfAntenna3", "NominalSiteId", "NominalSiteName", "ProjectName", "RequiredAntennaHeight1", "RequiredAntennaHeight2", "RequiredAntennaHeight3", "RoadName", "SearchRadius", "id", "status", "submittedAt" FROM "SarfForm";
DROP TABLE "SarfForm";
ALTER TABLE "new_SarfForm" RENAME TO "SarfForm";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
