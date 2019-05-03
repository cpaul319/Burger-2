module.exports = function(sequelize, DataTypes){
    var user = sequelize.define ("user",{
        email:DataTypes.STRING,
        password:DataTypes.STRING
    });
    return user;
    
}