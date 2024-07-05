
const express = require("express");
const { createTodo, updateTodo } = require("./types");
const todo = require("./db");
const app = express();
const port =3000;

app.use(express.json());

app.post("/todo",async (req, res) => {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    if (!parsedPayload.success) {
        return res.status(400).json({
            msg: "Inputs are not valid",
            errors: parsedPayload.error.errors
        });
    }
     await todo.create({
        title:createPayload.title,
        description:createPayload.description,
     })

    res.json({
        msg: "Todo created successfully",
        todo: parsedPayload.data
    });
});
app.get("/todos",async function(req, res){
        const todos = await todo.find({});
        res.json({
            todos
        })
})

app.put("/update", function(req, res){
    const updatePayload = req.body;
    const parsedPayload =updateTodo.safeParse(updatePayload);
    
    if (!parsedPayload.success) {
        return res.status(400).json({
            msg: "Inputs are not valid",
            errors: parsedPayload.error.errors
        });
    }
    
    res.json({
        msg: "Todo updated successfully",
        todo: parsedPayload.data
    });
})

app.listen(port);