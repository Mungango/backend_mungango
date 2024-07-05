import sequelize from "sequelize";
import Post from "../../models/Post";
import User from "../../models/User";
import Image from "../../models/Image";
import Comment from "../../models/Comment";
import { postUserImageLikeSchema } from "../../schemas/posts.schema";
import {
  iPostUserImageLike,
  iPostsActivityUserImageLike,
} from "../../interfaces/post.interface";
import LikesPost from "../../models/likesPost";
import { raw } from "express";

const getAllPostsActivityService = async (
  page: number,
  limit: number
): Promise<iPostUserImageLike> => {
  const offset = (page - 1) * limit;

  const retrivedPostsActivity = await Post.findAndCountAll({
    limit,
    offset,
    attributes: [
      "id",
      "message",
      "createdAt",
      "updatedAt",
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

  // Para cada post, obtemos as contagens de likes e dislikes e comentários
  const postsWithLikesDislikesAndComments = await Promise.all(
    retrivedPostsActivity.rows.map(async (post) => {
      const like = await LikesPost.count({
        where: { ownerId: post.dataValues.id, type: "like" },
      });

      const dislike = await LikesPost.count({
        where: { ownerId: post.dataValues.id, type: "dislike" },
      });

      const comment = await Comment.count({
        where: {
          postId: post.dataValues.id,
        },
      });

      return {
        ...post.dataValues,
        like,
        dislike,
        comment,
      };
    })
  );
  const postLikesCommentUserImage = {
    count: retrivedPostsActivity.count,
    raw: postsWithLikesDislikesAndComments,
  };

  return postUserImageLikeSchema.parse(postLikesCommentUserImage);
};

export default getAllPostsActivityService;
