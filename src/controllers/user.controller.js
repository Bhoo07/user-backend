import { getPaginatedUsers } from "../services/userService.js";
import { ApiError } from "../utils/ApiError.js";

const getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await getPaginatedUsers(page, limit);

    if (result.totalUsers === 0) {
      throw new ApiError(404, "No users found");
    }

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllUsers,
};
