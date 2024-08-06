-- CreateTable
CREATE TABLE "SFAForm" (
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
    "siteSelectionApproval" TEXT NOT NULL,
    "remarks" TEXT NOT NULL,
    CONSTRAINT "SFAForm_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "SFAForm_projectId_key" ON "SFAForm"("projectId");
