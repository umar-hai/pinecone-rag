CREATE TABLE `pcr_document` (
	`id` varchar(191) NOT NULL DEFAULT (uuid()),
	`name` varchar(256) NOT NULL,
	CONSTRAINT `pcr_document_id` PRIMARY KEY(`id`)
);
