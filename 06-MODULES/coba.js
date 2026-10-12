function cetakNama(nama) {
    return `Halo, nama saya ${nama}`;
}

const PI = 3.141592;

const mahasiswa = {
    nama: 'Sofi',
    umur: 17,
    cetakMhs() {
        return `Halo, nama saya ${this.nama} dan saya ${this.umur} tahun`;
    }
}

module.exports = { cetakNama, PI, mahasiswa };