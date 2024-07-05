import sequelize from "sequelize";
import Post from "../../models/Post";
import User from "../../models/User";
import Image from "../../models/Image";
import { postsActivityUserImageLikeSchema } from "../../schemas/posts.schema";
import { iPostsActivityUserImageLike } from "../../interfaces/post.interface";

const getAllPostsActivityService = async (page: number, limit: number) =>
  // : Promise<iPostsActivityUserImageLike[]>
  {
    const offset = (page - 1) * limit;

    const retrivedPostsActivity = await Post.findAll({
      limit,
      offset,
      attributes: [
        "id",
        "message",
        [
          sequelize.literal(`(
          SELECT COUNT(*)
          FROM "LikesPosts" AS likes
          WHERE likes."ownerId" = "Post".id
        )`),
          "likes_count",
        ], // Contagem de likes
        [
          sequelize.literal(`(
          SELECT COUNT(*)
          FROM "Comments" AS comments
          WHERE comments."postId" = "Post".id
        )`),
          "comment_count",
        ], // Contagem de comentários
      ],
      include: [
        {
          model: User,
          where: { deletedAt: null },
        },
        { model: Image },
      ],

      order: [
        [
          sequelize.literal(`(
          SELECT COUNT(*)
          FROM "LikesPosts" AS likes
          WHERE likes."ownerId" = "Post".id
        ) + (
          SELECT COUNT(*)
          FROM "Comments" AS comments
          WHERE comments."postId" = "Post".id
        )`),
          "DESC",
        ],
      ],
    });

    return postsActivityUserImageLikeSchema
      .array()
      .parse(retrivedPostsActivity);
  };

export default getAllPostsActivityService;
