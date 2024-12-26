import Todo_Model from "../models/Todo.Model.js";

export const create_List = async function (req, res) {
    try {
        const { Todo } = req.body;

        if (!Todo) {
            res.status(400).json({ error: "List is Empty" })
        }

        const list = new Todo_Model({
            Todo
        })

        await list.save();
        res.status(200).json(list);

    } catch (error) {
        console.log(`Error in Todo List Controller, ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const fetch_lists = async function (req, res) {
    try {
        const datas = await Todo_Model.find({});

        if (!datas) {
            res.status(400).json({ error: "Error in Fetching Lists" })
        }

        res.status(200).json(datas);

    } catch (error) {
        console.log(`Error in Fetching Lists, ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const delete_list = async function (req, res) {
    try {
        const { id } = req.params;
        const list = await Todo_Model.findByIdAndDelete({ _id: id });
        if (!list) {
            return res.status(400).json({ error: "Error in Deleting particluar Item" });
        }
        res.status(200).json({ message: "Successfully Deleted" });
    } catch (error) {
        console.log(`Error in Deleting List, ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


export const edit_list = async function (req, res) {
    try {
        const { id } = req.params;
        const list = await Todo_Model.findByIdAndUpdate({ _id: id }, req.body);

        if (!list) {
            return res.status(400).json({ error: "Error in Editing List" })
        }

        res.status(200).json(list);
    } catch (error) {
        console.log(`Error in Editing List, ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
}