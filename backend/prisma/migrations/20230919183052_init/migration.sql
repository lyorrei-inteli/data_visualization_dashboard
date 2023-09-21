-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prediction" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "result" INTEGER NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Prediction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PredictionInfo" (
    "id" TEXT NOT NULL,
    "car" DOUBLE PRECISION NOT NULL,
    "bicycle" DOUBLE PRECISION NOT NULL,
    "trucks" DOUBLE PRECISION NOT NULL,
    "motorbike" DOUBLE PRECISION NOT NULL,
    "bus" DOUBLE PRECISION NOT NULL,
    "others" DOUBLE PRECISION NOT NULL,
    "animals" DOUBLE PRECISION NOT NULL,
    "special_cargos" DOUBLE PRECISION NOT NULL,
    "tractors" DOUBLE PRECISION NOT NULL,
    "utilities" DOUBLE PRECISION NOT NULL,
    "unharmed" DOUBLE PRECISION NOT NULL,
    "slight_injury" DOUBLE PRECISION NOT NULL,
    "moderate_injury" DOUBLE PRECISION NOT NULL,
    "serious_injury" DOUBLE PRECISION NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "dayofweek" INTEGER NOT NULL,
    "road_info_Descending_Curve" INTEGER NOT NULL,
    "road_info_East_Going" INTEGER NOT NULL,
    "road_info_North_Going" INTEGER NOT NULL,
    "road_info_Other" INTEGER NOT NULL,
    "road_info_South_Going" INTEGER NOT NULL,
    "road_info_Top_Curve" INTEGER NOT NULL,
    "road_info_West_Going" INTEGER NOT NULL,
    "accident_place_Autopista_Fernao_Dias" INTEGER NOT NULL,
    "accident_place_Autopista_Fluminense" INTEGER NOT NULL,
    "accident_place_Autopista_Litoral_Sul" INTEGER NOT NULL,
    "accident_place_Autopista_Planalto_Sul" INTEGER NOT NULL,
    "accident_place_Autopista_Regis_Bittencourt" INTEGER NOT NULL,
    "accident_place_Concebra" INTEGER NOT NULL,
    "accident_place_Concepa" INTEGER NOT NULL,
    "accident_place_Concer" INTEGER NOT NULL,
    "accident_place_Cro" INTEGER NOT NULL,
    "accident_place_Crt" INTEGER NOT NULL,
    "accident_place_ECO050" INTEGER NOT NULL,
    "accident_place_ECO101" INTEGER NOT NULL,
    "accident_place_Ecoponte" INTEGER NOT NULL,
    "accident_place_Ecoriominas" INTEGER NOT NULL,
    "accident_place_Ecosul" INTEGER NOT NULL,
    "accident_place_Ecovias_do_Araguaia" INTEGER NOT NULL,
    "accident_place_Ecovias_do_Cerrado" INTEGER NOT NULL,
    "accident_place_MSVIA" INTEGER NOT NULL,
    "accident_place_Novadutra" INTEGER NOT NULL,
    "accident_place_RIOSP" INTEGER NOT NULL,
    "accident_place_Rodovia_do_Aco" INTEGER NOT NULL,
    "accident_place_Transbrasiliana" INTEGER NOT NULL,
    "accident_place_VIA040" INTEGER NOT NULL,
    "accident_place_Via_Bahia" INTEGER NOT NULL,
    "accident_place_Via_Brasil" INTEGER NOT NULL,
    "accident_place_Via_Costeira" INTEGER NOT NULL,
    "accident_place_Via_Sul" INTEGER NOT NULL,
    "predictionId" TEXT NOT NULL,

    CONSTRAINT "PredictionInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Prediction" ADD CONSTRAINT "Prediction_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PredictionInfo" ADD CONSTRAINT "PredictionInfo_predictionId_fkey" FOREIGN KEY ("predictionId") REFERENCES "Prediction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
