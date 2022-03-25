"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.add = exports.all = void 0;
const Task_1 = require("../models/Task");
const all = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield Task_1.Task.findAll();
    res.json({ list });
});
exports.all = all;
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.title) {
        let newTask = yield Task_1.Task.create({
            title: req.body.title,
            done: req.body.done ? true : false,
        });
        res.status(201).json({ item: newTask });
    }
    res.json({ error: 'Dados não enviados' });
});
exports.add = add;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    let task = yield Task_1.Task.findByPk(id);
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
        yield task.save();
        res.json({ item: task });
    }
    else {
        res.json({ error: 'Task not found' });
    }
});
exports.update = update;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    let task = yield Task_1.Task.findByPk(id);
    if (task) {
        yield task.destroy();
    }
    res.json({});
});
exports.remove = remove;
