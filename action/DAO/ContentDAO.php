<?php
    require_once("action/DAO/connection.php");

    class StatsAction  {



        public static function getCardCount() {
            $connection = Connection::getConnection();
            $statement = $connection->prepare("SELECT DISTINCT cardID FROM cardstats");

            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();

            return $statement->fetchAll();
        }

        public static function addCard($id) {
            $connection = Connection::getConnection();

            $statement = $connection->prepare("INSERT INTO cardstats(cardID) VALUES(?)");
            $statement->bindParam(1, $id);
            $statement->execute();


        }

        public static function countRow() {

            $connection = Connection::getConnection();
            $statement = $connection->prepare("SELECT COUNT(*) FROM cardstats");

            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();

            return $statement->fetchAll();


        }

        public static function countCard() {

            $connection = Connection::getConnection();
            $statement = $connection->prepare("SELECT cardid, COUNT(*) FROM cardstats GROUP BY cardid");

            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();

            return $statement->fetchAll();

        }


        public static function clearCard() {

            $connection = Connection::getConnection();
            $statement = $connection->prepare("TRUNCATE TABLE cardstats");

            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();

            return $statement->fetchAll();

        }
  
        
    }