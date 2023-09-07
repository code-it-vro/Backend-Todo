import ErrorHandler from "../middlewares/error.js";
import {
    Task
} from "../models/task.js";



//         creating new task 

export const newTask = async (req, res, next) => {

    try {
        const {
            title,
            description
        } = req.body;
        await Task.create({
            title,
            description,
            user: req.user,
        });
    
        res.status(201).json({
            success: true,
            message: "Task Added Successfully",
        });
    
    } catch (error) {
        next(error);
    }
};


//        to get the task

export const getMyTask = async (req, res, next) => {

    try {
        const userid = req.user._id;
    const tasks = await Task.find({
        user: userid
    });

    res.status(201).json({
        success: true,
        tasks,
    });
    } catch (error) {
        next(error);
    }
};


//             to Update the current task

export const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

    if (!task)
        return next(new ErrorHandler("Task Not Found", 404));

    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(201).json({
        success: true,
        message: "Task Updated Successfully",
    });
    } catch (error) {
        next(error);
    }
};

//           to delete current task

export const deleteTask = async (req, res, next) => {
   try {
    const task = await Task.findById(req.params.id);

    if (!task)
        return next(new ErrorHandler("Task Not Found", 404));

    task.isCompleted = !task.isCompleted;
    await task.deleteOne();

    res.status(200).json({
        success: true,
        message: "Task Deleted Successfully",
    });
   } catch (error) {
    next(error);
   }
};