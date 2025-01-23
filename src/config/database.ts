import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME as string, process.env.DB_USER as string, process.env.DB_PASS as string, {
    host: 'localhost',
    dialect: "postgres",
  });


  const checkConnection =async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync();
        console.log("Database sync done");
        
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  }

  export {checkConnection}
  export default sequelize;