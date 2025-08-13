-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StrategyPick" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "strategyId" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "selection" TEXT NOT NULL,
    "oddsAtPick" REAL,
    "stake" REAL,
    "result" TEXT,
    "settledAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "StrategyPick_strategyId_fkey" FOREIGN KEY ("strategyId") REFERENCES "Strategy" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "StrategyPick_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_StrategyPick" ("id", "matchId", "oddsAtPick", "result", "selection", "settledAt", "stake", "strategyId") SELECT "id", "matchId", "oddsAtPick", "result", "selection", "settledAt", "stake", "strategyId" FROM "StrategyPick";
DROP TABLE "StrategyPick";
ALTER TABLE "new_StrategyPick" RENAME TO "StrategyPick";
CREATE INDEX "StrategyPick_strategyId_idx" ON "StrategyPick"("strategyId");
CREATE INDEX "StrategyPick_matchId_idx" ON "StrategyPick"("matchId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
