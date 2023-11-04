const error = (req: any, res: any): void => {
    res.status(404)
    res.json('404 | страница не найдена')
}

export default error;