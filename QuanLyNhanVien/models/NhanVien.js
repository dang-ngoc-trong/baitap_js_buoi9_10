// tạo kiểu dữ liệu NhanVien
function NhanVien() {
  this.taiKhoan = "";
  this.hoTen = "";
  this.email = "";
  this.matKhau = "";
  this.ngayLam = "";
  this.luongCoBan = "";
  this.chucVu = "";
  this.gioLamTrongThang = "";
  // this.tongLuong = 0;
  // this.loaiNhanVien = "";
  this.tinhTongLuong = function () {
    var tLuong = 0;
    if (this.chucVu == "Sếp") {
      tLuong = Number(this.luongCoBan) * 3;
    } else if (this.chucVu == "Trưởng phòng") {
      tLuong = Number(this.luongCoBan) * 2;
    } else if (this.chucVu == "Nhân viên") {
      tLuong = Number(this.luongCoBan);
    }
    return tLuong;
  };
  this.xepLoaiNV = function () {
    var gioLam = this.gioLamTrongThang;
    var xepLoai = "";
    if (gioLam >= 192 ) {
      xepLoai = "Nhân viên  xuất sắc ";
    } else if (gioLam >= 176 ) {
      xepLoai = "Nhân viên giỏi";
    } else if (gioLam >= 160 ) {
      xepLoai = "Nhân viên khá";
    } else if (gioLam < 160 ) {
      xepLoai = "Nhân viên trung bình";
    } else {
      xepLoai = "";
    }
    return xepLoai;
  };
}
function kiemTraDoDai(value, selectorError, name, minlength, maxlength) {
  var lengthValue = value.length;
  if (lengthValue > maxlength || lengthValue < minlength) {
    document.querySelector(selectorError).innerHTML =
      name + " từ " + minlength + " đến " + maxlength + " kí tự";
    document.querySelector(selectorError).style.display = "block";
    return false;
  }
  document.querySelector(selectorError).innerHTML = "";
  return true;
}
function kiemTraRong(value, selectorError, name) {
  // .trim(): loại bỏ khoảng trống đầu và cuối của chuỗi

  if (value.trim() !== "") {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
  document.querySelector(selectorError).innerHTML =
    name + " không được bỏ trống";
  document.querySelector(selectorError).style.display = "block";
  return false;
}
function kiemTraTatCaKyTu(value, selectorError, name) {
  var regexLetter = /^[A-Z a-z]+$/;
  if (regexLetter.test(value)) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
  document.querySelector(selectorError).innerHTML += name + " tất cả là chữ";
  return false;
}
function kiemTraEmail(value, selectorError, name) {
  var regexEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regexEmail.test(value)) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
  document.querySelector(selectorError).innerHTML =
    name + " không đúng định dạng";
  document.querySelector(selectorError).style.display = "block";
  return false;
}
function kiemTraMatKhau(value, selectorError, name) {
  var regexEmail =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
  if (regexEmail.test(value)) {
    document.querySelector(selectorError).innerHTML += "";
    return true;
  }
  document.querySelector(selectorError).innerHTML +=
    name + " không đúng định dạng";
  document.querySelector(selectorError).style.display = "block";
  return false;
}
function kiemTraNgay(value, selectorError, name) {
  var regexNgay =
    /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  if (regexNgay.test(value)) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
  document.querySelector(selectorError).innerHTML =
    name + " không đúng định dạng ngày";
  document.querySelector(selectorError).style.display = "block";
  return false;
}
function kiemTraGiaTri(value, selectorError, name, minValue, maxValue) {
  value = Number(value);
  if (value > maxValue || value < minValue) {
    document.querySelector(selectorError).innerHTML =
      name + "từ " + minValue + " đến " + maxValue;
    document.querySelector(selectorError).style.display = "block";
    return false;
  }
  document.querySelector(selectorError).innerHTML += "";
  return true;
}
