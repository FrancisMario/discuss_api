module.exports = (sequelize, DataTypes) => {
	const Comment = sequelize.define(
		'comment',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			text: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			user: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'user',
					key: 'id',
				},
			},
			upvote: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
			downvote: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
			is_reply: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			parent_id: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
			domain_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'domain',
					key: 'id',
				},
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
			tableName: 'comments',
		}
	);

	Comment.associate = (models) => {
		Comment.belongsTo(models.domain);
	};

	return Comment;
};
