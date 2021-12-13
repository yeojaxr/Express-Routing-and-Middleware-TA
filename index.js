const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(logger);

const hewan = [
    { id:1, nama: "Snowy", spesies: "kucing"},
    { id:2, nama: "Blacki", spesies: "anjing"},
    { id:3, nama: "Molly", spesies: "kucing"},
    { id:4, nama: "Milo", spesies: "kelinci"},
    { id:5, nama: "Rere", spesies: "kucing"},
];

app.get("/", (req, res) => {
    res.json({
        message: "hello world",
    });
});

// untuk ngambil hewan secara menyeluruh
app.get("/hewan", (req, res) => {
    res.json({
        message: "Data hewa keseluruhan",
        hewan,
    });
});

//input data hewan
app.post("/hewan", postChecker, (req,res) => {
    let lengthHewan = hewan.length;
    const payload = {
        id: lengthHewan + 1,
        nama: req.body.namaHewan,
        spesies: req.body.namaSpesies,
    };

    hewan.push(payload);

    res.json({
        message: "data hewan berhasil diinputkan",
        hewan,
        lengthHewan,
    });
});

//mengambil data hewan berdasarkan id
app.get("/hewan/:id", (req, res) => {
    console.log(req.params.nama);
    res.json({
        message: "Berikut data hewan",
        data: hewan[req.params.id-1],
    });
});

//edit data hewan berdasarkan id
app.put("/hewan/:id", (req, res) => {
    const payload = {
        nama: req.body.namaHewan,
        spesies: req.body.namaSpesies,
    };

    //find untuk ngembaliin objek 
    let cari = hewan.find((item) => item.id == req.params.id);
    
    cari.nama = payload.nama;
    cari.spesies = payload.spesies;

    res.json({
        message: "Data anda berhasil diupdate",
        hewan,
    })
    console.log(hewan[req.params.id].spesies);
});

// menghapus hewan berdasarkan id
app.delete("/hewan/:id", (req, res) => {
    let hapus = hewan.splice(req.params.id -1, 1);

    res.json({
        message: "data anda berhasil dihapus",
        data : hewan,
    });
});

function logger(req, res, next){
    console.log("middleware logger berjalan");
    next();
};

function postChecker(req, res, next){
    const payload = {
        nama: req.body.namaHewan,
        spesies: req.body.namaSpesies
    }
    if(
        payload.spesies === "Kucing" || 
        payload.spesies === "anjing" || 
        payload.spesies === "kelinci"
    ){
        next();
    } else{
        res.sendStatus(400);
    }
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});