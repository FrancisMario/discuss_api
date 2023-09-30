module.exports = (sequelize, DataTypes) => {
	const Domain = sequelize.define(
		'domain',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			link: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			created_date_time: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
				allowNull: false,
			},
			modified_date_time: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
				allowNull: false,
			},
		},
		{
			tableName: 'domains',
		}
	);

	Domain.associate = (models) => {
		// Define associations here
		Domain.hasMany(models.comment); // Define a one-to-many relationship with comments
	};

	return Domain;
};
