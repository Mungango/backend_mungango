import Follower from "../../../models/Follower";

const unfollowUsersService = async (followerId: number) => {
	await Follower.destroy({ where: { followerId } });
};

export default unfollowUsersService;
