-- CreateTable
CREATE TABLE "liked_replies" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "reply_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "liked_replies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "liked_replies" ADD CONSTRAINT "liked_replies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "liked_replies" ADD CONSTRAINT "liked_replies_reply_id_fkey" FOREIGN KEY ("reply_id") REFERENCES "replies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
