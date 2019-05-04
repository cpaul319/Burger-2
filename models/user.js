module.exports = (sequelize, DataTypes) => {
	var User = sequelize.define(
		"User",
		{
			user_name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [1, 140]
				}
			}
		},
		{
			// only keep timestamp for creation
			timestamps: true,
			createdAt: "date_created",
			updatedAt: false,
			deletedAt: false
		}
	);

	// establish association
	User.associate = models => {
		User.hasMany(models.Burger);
	};

	return User;
};