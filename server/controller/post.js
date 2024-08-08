const Post = require("../schema/post");

const getPost = async (req, res) => {
    try {
        const data = await Post.find({});
        if (res) {
            res.status(200).json({ data: data })
            return;
        }
        res.status(200).json({ error: "Something went wrong" })
        return;

    } catch (error) {
        console.log(error)
        res.json({ error: "server error" })
    }
}


const savePost = async (req, res) => {
    try {

        const { name, description, startDate, endDate, status, frequency, Completed , tasks} = req.body;

        if (!name || !description || !startDate || !endDate || !status || !frequency) {
            return res.status(400).json({ message: "All fields are required" });
        }


        const d1 = new Date(startDate);
        const d2 = new Date(endDate);

        const differenceInTime = d2.getTime() - d1.getTime();

        const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));




        const newPost = new Post({
            name,
            description,
            tasks,
            from: startDate,
            to: endDate,
            completed: Completed,
            duration: differenceInDays,
            status,
            frequency
        })

        console.log(newPost)

        await newPost.save()
            .then(() => res.status(200).json({ message: "Saved" }))
            .catch(() => res.status(500).json({ message: "Failed" }))


    } catch (error) {

    }
}


const updatePost = async (req, res) => {
    try {
        const {_id , updatedValue , duration} = req.body;
        let post = await Post.findByIdAndUpdate(_id , {completed : updatedValue} , {new : true});
       
        if(post.completed === post.duration){
             post =  await Post.findByIdAndUpdate(_id , {status : "Completed"} , {new : true});
        }

        if (post) {
            res.status(200).json({ data: post })
            return;
        }
        
        res.status(200).json({ error: "Something went wrong" })
        return;

    } catch (error) {
        console.log(error)
        res.json({ error: "server error" })
    }
}


module.exports = { getPost, savePost, updatePost}