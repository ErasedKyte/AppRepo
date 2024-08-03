-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SarfForm" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectId" INTEGER NOT NULL,
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
    "AntennaAzimuth3" REAL NOT NULL,
    "NoOfAntenna4" INTEGER,
    "AntennaSize4" TEXT,
    "RequiredAntennaHeight4" INTEGER,
    "AntennaAzimuth4" REAL,
    CONSTRAINT "SarfForm_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "SarfForm_projectId_key" ON "SarfForm"("projectId");
