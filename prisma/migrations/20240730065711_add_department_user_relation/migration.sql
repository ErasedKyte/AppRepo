-- CreateTable
CREATE TABLE "SarfForm" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "submittedBy" INTEGER NOT NULL,
    "submittedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "departmentId" INTEGER NOT NULL,
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
    CONSTRAINT "SarfForm_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SarfForm_submittedBy_fkey" FOREIGN KEY ("submittedBy") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Department" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "departmentId" INTEGER,
    CONSTRAINT "User_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Department_name_key" ON "Department"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
