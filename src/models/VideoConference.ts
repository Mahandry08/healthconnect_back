import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/Database";

interface IVideoConference {
    videocall_id: number;
    video_link: string;
    creation_date: Date;
    status: 'prévue' | 'en cours' | 'terminée';
}

interface IVideoConferenceCreationAttributes extends Optional<IVideoConference, 'videocall_id'> {}

class VideoConference extends Model<IVideoConference, IVideoConferenceCreationAttributes> implements IVideoConference {
    public videocall_id!: number;
    public video_link!: string;
    public creation_date!: Date;
    public status!: 'prévue' | 'en cours' | 'terminée';

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

VideoConference.init(
    {
        videocall_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        video_link: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        creation_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('prévue', 'en cours', 'terminée'),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'videoconferences',
        modelName: 'VideoConference',
    }
);

export default VideoConference;