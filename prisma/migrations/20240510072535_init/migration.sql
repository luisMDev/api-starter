-- CreateEnum
CREATE TYPE "CONFIG_TYPE" AS ENUM ('URL', 'FILE', 'STRING', 'COLOR', 'BOOLEAN');

-- CreateEnum
CREATE TYPE "CONFIG_KEY" AS ENUM ('COLOR_PRIMARY', 'COLOR_SECONDARY', 'COLOR_ACCENT', 'IMAGE_LOGO', 'IMAGE_BACKGROUND', 'LINK_GITHUB', 'LINK_DOCS', 'PROJECT_NAME', 'ALLOW_SIGNUP', 'PROVIDER_PASSWORD', 'PROVIDER_GITHUB', 'PROVIDER_GOOGLE', 'PROVIDER_FACEBOOK', 'PROVIDER_TWITTER', 'PROVIDER_DISCORD', 'PROVIDER_APPLE');

-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "um_Config" (
    "value" TEXT NOT NULL,
    "id" "CONFIG_KEY" NOT NULL,
    "type" "CONFIG_TYPE" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "um_Config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "um_User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT,
    "role" "ROLE" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "metadata" JSONB,

    CONSTRAINT "um_User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "um_Config_id_key" ON "um_Config"("id");

-- CreateIndex
CREATE UNIQUE INDEX "um_User_id_key" ON "um_User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "um_User_email_key" ON "um_User"("email");
