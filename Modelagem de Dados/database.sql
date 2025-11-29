CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Cliente` (
  `idClientes` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NOT NULL,
  `cnpj` VARCHAR(14) NOT NULL,
  `status` boolean NOT NULL,
  PRIMARY KEY (`idClientes`),
  UNIQUE INDEX `idClientes_UNIQUE` (`idClientes` ASC) VISIBLE,
  UNIQUE INDEX `cnpj_UNIQUE` (`cnpj` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Transacao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Transacao` (
  `idTransacao` INT NOT NULL AUTO_INCREMENT,
  `Cliente_idClientes` INT NOT NULL,
  `valor` DECIMAL(10,4) NOT NULL,
  INDEX `fk_Pedido_Cliente1_idx` (`Cliente_idClientes` ASC) VISIBLE,
  PRIMARY KEY (`idTransacao`),
  UNIQUE INDEX `idTransacao_UNIQUE` (`idTransacao` ASC) VISIBLE,
  CONSTRAINT `fk_Pedido_Cliente1`
    FOREIGN KEY (`Cliente_idClientes`)
    REFERENCES `mydb`.`Cliente` (`idClientes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;