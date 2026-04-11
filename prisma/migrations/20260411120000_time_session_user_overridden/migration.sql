-- Web-edited phone rows are kept on the next phone widget sync (see phone-sessions/sync).
ALTER TABLE "TimeSession" ADD COLUMN "userOverridden" BOOLEAN NOT NULL DEFAULT false;
