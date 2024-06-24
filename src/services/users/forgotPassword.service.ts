import User from "../../models/User";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { AppError } from "../../errors";

const forgotPasswordService = async (email: string) => {
	const user = await User.findOne({ where: { email } });
	if (!user) {
		throw new AppError("Email não encontrado", 404);
	}

	//Gerando do token para o usuário poder alterar a senha
	const token = crypto.randomBytes(32).toString("hex");

	const tokenExpiry = new Date();
	tokenExpiry.setHours(tokenExpiry.getHours() + 1);

	const payload = {
		resetPasswordToken: token,
		resetPasswordExpires: tokenExpiry,
	};

	await User.update(payload, { where: { id: user.id } });

	const resetLink = `http://localhost:3000/users/reset-password/${token}`;

	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 587,
		secure: false, // Use `true` for port 465, `false` for all other ports
		auth: {
			user: process.env.EMAIL,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	const mailOptions = {
		to: email,
		from: process.env.EMAIL,
		subject: "Recuperação de Senha",
		text:
			`Você está recebendo este email porque você (ou alguém) solicitou a redefinição de senha da sua conta no Mungango.\n\n` +
			`Por favor, clique no seguinte link ou cole no seu navegador para concluir o processo:\n\n` +
			`${resetLink}\n\n` +
			`Se você não solicitou isso, por favor ignore este email e sua senha permanecerá inalterada.\n`,
	};

	await transporter.sendMail(mailOptions);
};

export default forgotPasswordService;
