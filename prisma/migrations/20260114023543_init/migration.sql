-- CreateTable
CREATE TABLE "ProductPrice" (
    "id" TEXT NOT NULL,
    "storeName" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "keyword" TEXT,
    "url" TEXT,
    "scrapedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductPrice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProductPrice_storeName_scrapedAt_idx" ON "ProductPrice"("storeName", "scrapedAt");

-- CreateIndex
CREATE INDEX "ProductPrice_keyword_idx" ON "ProductPrice"("keyword");
