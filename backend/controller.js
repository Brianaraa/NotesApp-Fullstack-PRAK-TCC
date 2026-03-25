const Note = require('./model');
exports.findAll = (req, res) => {
  Note.findAll((err, data) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(data);
  });
};
exports.create = (req, res) => {
  if (!req.body.judul || !req.body.isi)
    return res.status(400).json({ message: 'Judul dan isi wajib!' });
  const noteData = { judul: req.body.judul, isi: req.body.isi };
  Note.create(noteData, (err, data) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: 'Catatan ditambahkan!', data: data });
  });
};
exports.update = (req, res) => {
  const noteData = { judul: req.body.judul, isi: req.body.isi };
  Note.update(req.params.id, noteData, (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: 'Catatan berhasil diperbarui!' });
  });
};
exports.delete = (req, res) => {
  Note.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: 'Catatan berhasil dihapus!' });
  });
};
// Tambahkan fungsi ini di bagian bawah controller.js
exports.findById = (req, res) => {
  Note.findById(req.params.id, (err, data) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!data) return res.status(404).json({ message: "Catatan tidak ditemukan!" });
    res.json(data);
  });
};
