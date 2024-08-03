-- CreateTable
CREATE TABLE "Survey" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectId" INTEGER NOT NULL,
    "latLonOpt1" TEXT NOT NULL,
    "buildingPlotOpt1" TEXT NOT NULL,
    "gateOpt1" TEXT NOT NULL,
    "roadOpt1" TEXT NOT NULL,
    "blockOpt1" TEXT NOT NULL,
    "areaOpt1" TEXT NOT NULL,
    "latLonOpt2" TEXT NOT NULL,
    "buildingPlotOpt2" TEXT NOT NULL,
    "gateOpt2" TEXT NOT NULL,
    "roadOpt2" TEXT NOT NULL,
    "blockOpt2" TEXT NOT NULL,
    "areaOpt2" TEXT NOT NULL,
    "latLonOpt3" TEXT NOT NULL,
    "buildingPlotOpt3" TEXT NOT NULL,
    "gateOpt3" TEXT NOT NULL,
    "roadOpt3" TEXT NOT NULL,
    "blockOpt3" TEXT NOT NULL,
    "areaOpt3" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "contactTel" TEXT NOT NULL,
    "procurementComments" TEXT NOT NULL,
    CONSTRAINT "Survey_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Survey_projectId_key" ON "Survey"("projectId");
