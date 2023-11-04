import { Router } from 'express';

const router: Router = Router();

router.post('/login', (req: any, res: any): void => {
    res.status(200);
    res.json({
        id: 1,
        mail: 'test@mail.ru'
    })
    res.end();
});

export default router;