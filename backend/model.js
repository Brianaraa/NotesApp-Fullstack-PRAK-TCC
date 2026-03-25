const db = require('./db');
const Note = function(note) {
  this.judul = note.judul;
  this.isi   = note.isi;
};
Note.findAll = (result) => {
  db.query('SELECT * FROM notes ORDER BY tanggal_dibuat DESC',
    (err, res) => { err ? result(err,null) : result(null,res); });
};
Note.findById = (id, result) => {
  db.query('SELECT * FROM notes WHERE id=?', [id],
    (err, res) => { err ? result(err,null) : result(null,res[0]); });
};
Note.create = (data, result) => {
  db.query('INSERT INTO notes (judul, isi) VALUES (?, ?)',
    [data.judul, data.isi],
    (err, res) => { err ? result(err,null) : result(null,{id:res.insertId,...data}); });
};
Note.update = (id, note, result) => {
  db.query('UPDATE notes SET judul=?, isi=? WHERE id=?',
    [note.judul, note.isi, id],
    (err, res) => { err ? result(err,null) : result(null,res); });
};
Note.delete = (id, result) => {
  db.query('DELETE FROM notes WHERE id=?', [id],
    (err, res) => { err ? result(err,null) : result(null,res); });
};

// Tambahkan di dalam file model.js
Note.updateStatus = (id, field, value, result) => {
  db.query(`UPDATE notes SET ${field} = ? WHERE id = ?`, [value, id], (err, res) => {
    err ? result(err, null) : result(null, res);
  });
};

module.exports = Note;

