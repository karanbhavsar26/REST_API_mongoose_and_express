const authController = require("../controller/auth/authController");
const { Joi, celebrate } = require("celebrate");
const registerSchema = require("../schema/registerSchema");
const loginSchema = require("../schema/loginSchema");
const loginController =require("../controller/auth/loginController");
const userController =require("../controller/user/userController");
const productController =require("../controller/product/productController");
const AuthMiddleware =require ("../middlewares/authMiddleware")
const productSchema = require("../schema/productSchema");
const router = require("express").Router();
const userDetailSchema= require("../schema/userDetailSchema")
const FormDataMiddleware =require("../middlewares/formDataMiddleware")
const RbacMiddleware =require("../middlewares/rbacMiddleware")

router.post(
  "/register",
  celebrate(registerSchema.register),
  authController.register
);

router.post(
  "/login",
  loginController.login
);

router.get(
  "/userDetail",
  celebrate(userDetailSchema.userDetail),
  AuthMiddleware,
  userController.userDetails
);

router.post(
  "/products",
  [AuthMiddleware,RbacMiddleware],
  productController.create
);

router.put(
  "/products",
  [AuthMiddleware,RbacMiddleware],
  productController.update
);
router.delete(
  "/products",
  [AuthMiddleware,RbacMiddleware],
  productController.delete
);

module.exports = router;
