-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema todolist
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema todolist
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `todolist` DEFAULT CHARACTER SET utf8 ;
USE `todolist` ;

-- -----------------------------------------------------
-- Table `todolist`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todolist`.`user` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `fullname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `registeredtime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `todolist`.`list`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todolist`.`list` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `userId` INT(11) UNSIGNED NOT NULL,
  `listname` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`, `userId`),
  INDEX `fk_list_userid_idx` (`userId` ASC),
  CONSTRAINT `fk_list_userid`
    FOREIGN KEY (`userId`)
    REFERENCES `todolist`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `todolist`.`task`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todolist`.`task` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `taskname` VARCHAR(1000) NOT NULL,
  `listId` INT(11) UNSIGNED NOT NULL,
  `userId` INT(11) UNSIGNED NOT NULL,
  `reminderDate` BIGINT(20) UNSIGNED NULL DEFAULT '0',
  `deadline` BIGINT(20) UNSIGNED NULL DEFAULT '0',
  `requirrence` TINYINT(1) UNSIGNED NULL DEFAULT '0',
  `priority` TINYINT(3) UNSIGNED NULL DEFAULT '0',
  `finished` TINYINT(1) UNSIGNED NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  INDEX `fk_task_userID_idx` (`userId` ASC),
  INDEX `fk_task_listID_idx` (`listId` ASC),
  CONSTRAINT `fk_task_listID`
    FOREIGN KEY (`listId`)
    REFERENCES `todolist`.`list` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_task_userID`
    FOREIGN KEY (`userId`)
    REFERENCES `todolist`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 24
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
