import { Router} from "express";

const router: Router = Router();

router.get("/", (_req: any, res: any): void => {
	res.render("index", { title: "Главная" });
});

export default router;