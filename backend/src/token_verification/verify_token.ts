import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const VerifyToken = (req: any, res: any, next: any) => {
  const JWT_TOKEN = process.env.JWT_TOKEN ?? "";
  // Remove Bearer from string
  const tk = req.headers["x-access-token"];
  console.log(tk);
  const token = tk.replace(/^Bearer\s+/, "");
  console.log(token);

  if (token) {
    jwt.verify(token, JWT_TOKEN, (err: any, decoded: any) => {
      if (err) {
        return res.json({
          status: "error",
          message: "Token is not valid",
        });
      }
      req.decoded = decoded;
      return next();
    });
  } else {
    return res.json({
      status: "error",
      message: "Token not provided",
    });
  }
};

export default VerifyToken;
