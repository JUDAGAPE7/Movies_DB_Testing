require('../models')


const sequelize = require('../utils/connection');



const tesMigrate = async () => {
    try {
       await  sequelize.sync({force:true});
        console.log("DB connected 👌💪😊🚀");
        process.exit()
    } catch (e) {
        console.log(e)
    }
}

tesMigrate();
