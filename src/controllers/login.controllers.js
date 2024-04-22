import loginService from "../services/login.service.js";

const loginController = async (req, res) => {
  const token = await loginService(req.body);

  return res.status(200).json({ token });
};

export { loginController };
