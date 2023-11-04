const router = require("express").Router();

router.get("/", (_req: any, res: any) => {
	res.render("index", { title: "Главная" });
});

export default router;