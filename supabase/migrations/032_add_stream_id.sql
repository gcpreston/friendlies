-- Add stream_id for tracking a stream on SpectatorMode.

ALTER TABLE presence_log ADD COLUMN stream_id BIGINT;
