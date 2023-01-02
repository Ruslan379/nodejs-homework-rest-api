//? +++++++++++++++++++  mongoose +++++++++++++++++++
const { number } = require("joi");
const { Contact } = require("../../models");
const { User } = require("../../models");

const { lineBreak } = require("../../services");


//-----------------------------------------------------------------------------
const getAllContacts = async (req, res, next) => {
    // const contacts = await Contact.find({});


    const { id: userId } = req.user //?
    //* =============================console===================================
    console.log("");
    console.log("getAllContacts-->req.user:".bgYellow.red);
    // console.table(req.user); 
    // console.table([req.user]);
    console.log(req.user);

    console.log("getAllContacts-->userId:".bgYellow.blue, userId.bgGreen.blue);
    console.log("");
    //* =======================================================================


    //? ============================ Пагинация ================================
    let {
        skip = 0,
        page = 1,
        limit = 5
    } = req.query;

    // const skip = (page - 1)*limit //! формула расчета skip

    // skip = parseInt(skip); //! работает и без этого
    // limit = parseInt(limit); //! работает и без этого
    // limit = limit > 2 ? 2 : limit //! будет показано только: 2 контакта (поста)
    //? =======================================================================


    // const contacts = await Contact.find({ owner: userId }); //*
    //? Пагинация
    const contacts = await Contact.find({ owner: userId, skip, limit: Number(limit) })
        .select({ createdAt: 0 })   //! не показывать поле "createdAt"
        .skip(skip)   //! с какого элемента массива (объекта) начать показ
        .limit(limit)   //! сколько элементов массива (объекта) показать
        .sort("name") //! сортировка по полю "name"
        .populate("owner", "_id email subscription updatedAt")


    //? ========================== Aggregation ================================
    const users = await User.aggregate([
        {
            '$lookup': {
                'from': 'contacts',
                'localField': '_id',
                'foreignField': 'owner',
                'as': 'userContacts'
            }
        }
    ])
    //? =======================================================================



    //! ===========================console============================
    console.log("START-->GET/All".green); //!
    lineBreak();
    console.log("СОРТИРОВАННЫЙ СПИСОК ВСЕХ КОНТАКТОВ USER с id:".bgGreen.black, userId.bgGreen.blue)
    console.log(contacts); //!!!!!

    //? Aggregation
    console.log("\n------------------------- СПИСОК ВСЕХ USERS и их КОНТАКТОВ: --------------------------".bgCyan.black);
    console.log("");
    for (let i = 0; i < users.length; i++) {
        const id = String(users[i]._id)
        // console.log("id:", id); //!
        console.log("");
        console.log("СПИСОК ВСЕХ КОНТАКТОВ USER с id:".bgGreen.black, id.bgRed.black)
        console.log(users[i]); //!!!!!
        // if (users[i].userContacts.length) {
        //     console.log("СПИСОК ВСЕХ КОНТАКТОВ:".bgMagenta.black)
        //     console.log(users[i].userContacts); //!!!!!
        // }
    }

    lineBreak();
    console.log("END-->GET/All".green); //!
    lineBreak();
    //! ==============================================================


    res.status(200).json({
        status: "success",
        code: 200,
        //? Пагинация
        skip,
        limit,
        contacts,
        //? Aggregation
        users
    });
};

module.exports = getAllContacts;