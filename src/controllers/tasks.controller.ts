import { Request, Response } from 'express';
import { Task } from '../models/Task';

export const all = async (req: Request, res: Response) => {
    const list = await Task.findAll();

    res.json({ list });
}

export const add = async (req: Request, res: Response) => {
    if (req.body.title) {
        let newTask = await Task.create({
            title: req.body.title,
            done: req.body.done ? true : false,
        });

        res.status(201).json({ item: newTask });
    }

    res.json({ error: 'Dados não enviados' });
}

export const update = async (req: Request, res: Response) => {  
    const id: string = req.params.id;

    let task = await Task.findByPk(id);
    if (task) {

        if (req.body.title) {
            task.title = req.body.title;
        }

        if (req.body.done) {
            switch (req.body.done.toLowerCase()) {
                case 'true':
                case '1':
                    task.done = true;
                    break;
                case 'false':
                case '0':
                    task.done = false;
                    break;
            }
        }

        await task.save();
        res.json({ item: task });

    } else {
        res.json({ error: 'Task not found' });
    }
}

export const remove = async (req: Request, res: Response) => {
    let id: string = req.params.id;

    let task = await Task.findByPk(id);

    if (task) {
        await task.destroy();
    }

    res.json({});
}