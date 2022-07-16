window.onload = function () {
  // browser vùa load lên
  layLocalStorage();
};

var mangNhanVien = [];
document.querySelector("#btnThem").onclick = function () {
  reset();
  resetValidation();
};

document.querySelector("#btnThemNV").onclick = function () {
  var nVien = new NhanVien();
  console.log("nhan viên ", nVien);
  nVien.taiKhoan = document.querySelector("#tknv").value;

  nVien.hoTen = document.querySelector("#name").value;

  nVien.email = document.querySelector("#email").value;

  nVien.matKhau = document.querySelector("#password").value;
  // xử lý ngày sinh Năm- tháng - ngày = ngày tháng năm
  nVien.ngayLam = document.querySelector("#datepicker").value;

  // nVien.ngayLam = moment(ngayLam).format("DD-MM-YYYY");

  nVien.luongCoBan = document.querySelector("#luongCB").value;
  nVien.chucVu = document.querySelector("#chucvu").value;
  nVien.gioLamTrongThang = document.querySelector("#gioLam").value;
  nVien.loaiNhanVien = document.querySelector("#searchName").value;
  // tao Validation: trước khi thêm người dùng
  // tài khoản nhân viên
  var valid = true;
  valid &= kiemTraDoDai(nVien.taiKhoan, "#tbTKNV", "Tài khoản", 4, 6);

  // tên nhân viên
  valid &= kiemTraRong(nVien.hoTen, "#tbTen", "Họ Tên");

  valid &= kiemTraTatCaKyTu(nVien.hoTen, "#tbTen", " Họ Tên");
  // // email
  valid &= kiemTraEmail(nVien.email, "#tbEmail", " Email");
  valid &= kiemTraDoDai(nVien.matKhau, "#tbMatKhau", "Mật khẩu ", 6, 10);
  valid &= kiemTraMatKhau(nVien.matKhau, "#tbMatKhau", "Mật khẩu ");
  valid &= kiemTraNgay(nVien.ngayLam, "#tbNgay", "Ngày tháng ");
  valid &= kiemTraRong(nVien.luongCoBan, "#tbLuongCB", "Lương ");
  valid &= kiemTraGiaTri(
    nVien.luongCoBan,
    "#tbLuongCB",
    "Lương cơ bản ",
    10000000,
    20000000
  );

  valid &= kiemTraGiaTri(
    nVien.gioLamTrongThang,
    "#tbGiolam",
    "giờ làm ",
    80,
    200
  );

  valid &= kiemTraRong(nVien.chucVu, "#tbChucVu", "Chức vụ ");

  if (!valid) {
    return;
  }
  //mỗi lẫn bấn cập nhật nhân viên đua object vào mangNhanVien
  mangNhanVien.push(nVien);
  console.log("mangNhanVien", mangNhanVien); // kiểm tra xem
  //giọi hàm từ mảng nhân viên tạo ra html cho table
  renderTableNhanVien(mangNhanVien);
  //gọi hàm lưu mảng sinh viên vào localStorage
  luuLocalStorage();
};
function renderTableNhanVien(arrNhanVien) {
  var html = "";
  for (var index = 0; index < arrNhanVien.length; index++) {
    //duyệt qua mảng lấy ra nhân viên
    var Nv = arrNhanVien[index];
    // bổ sung tính toán lương nhân viên
    Nv.tinhLuongNhanVien = function () {
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
    Nv.xepLoaiNV = function () {
      var gioLam = this.gioLamTrongThang;
      var xepLoai = "";
      if (gioLam >= 192) {
        xepLoai = "Nhân viên xuất sắc";
      } else if (gioLam >= 176) {
        xepLoai = "Nhân viên giỏi";
      } else if (gioLam >= 160) {
        xepLoai = "Nhân viên khá";
      } else if (gioLam < 160) {
        xepLoai = "Nhân viên trung bình";
      } else {
        xepLoai = "";
      }
      return xepLoai;
    };
    //tạo ta 1 chuỗi html tr và đưa vào output
    html += `
      <tr>
          <td>${Nv.taiKhoan}</td>
          <td>${Nv.hoTen}</td>
          <td>${Nv.email}</td>
          <td>${Nv.ngayLam}</td>
          <td>${Nv.chucVu}</td>
          <td>${Nv.tinhLuongNhanVien()}</td>
          <td>${Nv.xepLoaiNV()}</td>
          <td>
              <button class="btn btn-danger" onclick="xoaNhanVien('${
                Nv.taiKhoan
              }')">Xoá</button>
              <button class="btn btn-primary" 
              id="btnEdit"
              data-toggle="modal"
              data-target="#myModal" onclick="chinhSua('${
                Nv.taiKhoan
              }')">Chỉnh sửa</button>
          </td>
      </tr>
    `;
  }
  console.log("nhân viên xuât", html);
  document.querySelector("#tableDanhSach").innerHTML = html;
  return html;
}
function chinhSua(taiKhoanClick) {
  // tim ra vị trí của nhan viên được click trong mảng
  var indexEdit = mangNhanVien.findIndex(
    (nhanVien) => nhanVien.taiKhoan === taiKhoanClick
  );
  //lấy ra vị trí đó
  var NvEdit = mangNhanVien[indexEdit];
  console.log("NvEdit", NvEdit);
  // khóa lại tk nhân viên
  document.querySelector("#tknv").disabled = true;
  //gán lại giá các gí trị lên giao diện
  document.querySelector("#tknv").value = NvEdit.taiKhoan;
  document.querySelector("#name").value = NvEdit.hoTen;
  document.querySelector("#email").value = NvEdit.email;
  document.querySelector("#password").value = NvEdit.matKhau;
  document.querySelector("#datepicker").value = NvEdit.ngayLam;
  document.querySelector("#luongCB").value = NvEdit.luongCoBan;
  document.querySelector("#chucvu").value = NvEdit.chucVu;
  document.querySelector("#gioLam").value = NvEdit.gioLamTrongThang;
  document.querySelector("#searchName").value = NvEdit.loaiNhanVien;
}
document.querySelector("#btnCapNhat").onclick = function () {
  // lấy dữ liệu người dùng thay đổi giao diện
  var nVien = new NhanVien();
  console.log(nVien);
  // lấy thông tin input từ người dùng
  nVien.taiKhoan = document.querySelector("#tknv").value;
  nVien.hoTen = document.querySelector("#name").value;

  nVien.email = document.querySelector("#email").value;

  nVien.matKhau = document.querySelector("#password").value;
  // xử lý ngày sinh Năm- tháng - ngày = ngày tháng năm
  nVien.ngayLam = document.querySelector("#datepicker").value;

  // nVien.ngayLam = moment(ngayLam).format("DD-MM-YYYY");

  nVien.luongCoBan = document.querySelector("#luongCB").value;
  nVien.chucVu = document.querySelector("#chucvu").value;
  nVien.gioLamTrongThang = document.querySelector("#gioLam").value;
  nVien.loaiNhanVien = document.querySelector("#searchName").value;

  //tìm ra thằng trong mảng cẩn chỉnh
  var indexEdit = mangNhanVien.findIndex(
    (nhanVien) => nhanVien.taiKhoan === nVien.taiKhoan
  );
  // lấy ra nhan viên trong mảng thay đổi thanh thông tin trên giao diện mà người edit
  mangNhanVien[indexEdit].hoTen = nVien.hoTen;
  mangNhanVien[indexEdit].email = nVien.email;
  mangNhanVien[indexEdit].matKhau = nVien.matKhau;
  mangNhanVien[indexEdit].luongCoBan = nVien.luongCoBan;
  mangNhanVien[indexEdit].chucVu = nVien.chucVu;
  mangNhanVien[indexEdit].gioLamTrongThang = nVien.gioLamTrongThang;
  mangNhanVien[indexEdit].loaiNhanVien = nVien.loaiNhanVien;

  //validation trước khi cập nhật
  var valid = true;
  valid &= kiemTraDoDai(nVien.taiKhoan, "#tbTKNV", "Tài khoản", 4, 6);

  // tên nhân viên
  valid &= kiemTraRong(nVien.hoTen, "#tbTen", "Họ Tên");

  valid &= kiemTraTatCaKyTu(nVien.hoTen, "#tbTen", " Họ Tên");
  // email
  valid &= kiemTraEmail(nVien.email, "#tbEmail", " Email");
  valid &= kiemTraDoDai(nVien.matKhau, "#tbMatKhau", "Mật khẩu ", 6, 10);
  valid &= kiemTraMatKhau(nVien.matKhau, "#tbMatKhau", "Mật khẩu ");
  valid &= kiemTraNgay(nVien.ngayLam, "#tbNgay", "Ngày tháng ");
  valid &= kiemTraRong(nVien.luongCoBan, "#tbLuongCB", "Lương ");
  valid &= kiemTraGiaTri(
    nVien.luongCoBan,
    "#tbLuongCB",
    "Lương cơ bản ",
    10000000,
    20000000
  );

  valid &= kiemTraGiaTri(
    nVien.gioLamTrongThang,
    "#tbGiolam",
    "giờ làm ",
    80,
    200
  );

  valid &= kiemTraRong(nVien.chucVu, "#tbChucVu", "Chức vụ ");

  if (!valid) {
    return;
  }

  // tạo lại bảng sinh viên mới sau khi thay đổi
  renderTableNhanVien(mangNhanVien);
  // mở lại nút tk nhân viên
  document.querySelector("#tknv").disabled = false;
  //lưu localstorage sau khi sửa
  luuLocalStorage();
};
function xoaNhanVien(taiKhoanClick) {
  // hàm trong .findIndex sẽ tự động chạy đến khi nào tìm thấy hoặc hết mảng( k thấy trả vê -1)
  var indexDel = mangNhanVien.findIndex(
    (nhanVien) => nhanVien.taiKhoan === taiKhoanClick
  );
  if (indexDel !== -1) {
    mangNhanVien.splice(indexDel, 1);
  }
  renderTableNhanVien(mangNhanVien);
  luuLocalStorage();
}

function reset() {
  document.querySelector("#tknv").disabled = false;
  //gán lại giá các gí trị lên giao diện
  document.querySelector("#tknv").value = null;
  document.querySelector("#name").value = null;
  document.querySelector("#email").value = null;
  document.querySelector("#password").value = null;
  document.querySelector("#datepicker").value = null;
  document.querySelector("#luongCB").value = null;
  document.querySelector("#chucvu").value = "Chọn chức vụ";
  document.querySelector("#gioLam").value = null;
  document.querySelector("#searchName").value = null;
}
function resetValidation() {
  //gán lại giá các gí trị lên giao diện
  document.querySelector("#tbTKNV").innerHTML = null;
  document.querySelector("#tbTen").innerHTML = null;
  document.querySelector("#tbEmail").innerHTML = null;
  document.querySelector("#tbMatKhau").innerHTML = null;
  document.querySelector("#tbNgay").innerHTML = null;
  document.querySelector("#tbLuongCB").innerHTML = null;
  document.querySelector("#tbChucVu").innerHTML = null;
  document.querySelector("#tbGiolam").innerHTML = null;
}
function luuLocalStorage() {
  // biến đổi mảng thành string
  var sMangNhanVien = JSON.stringify(mangNhanVien);
  //sau đó dùng string luu vào lucolstorge
  localStorage.setItem("mangNhanVien", sMangNhanVien);
}
function layLocalStorage() {
  // check xem storage có dữ liệu đó hya không
  if (localStorage.getItem("mangNhanVien")) {
    // lấy ra
    var sMangNhanVien = localStorage.getItem("mangNhanVien");
    // lấy mangnhaVien gán = chuối được lấy từ localstoragge ra( dùng hàm JON.parse chuyển về mảng)
    mangNhanVien = JSON.parse(sMangNhanVien);
    // tọa ta table sinh viên tuef mảng
    renderTableNhanVien(mangNhanVien);
  }
}
// tim loại nhân viên
document.querySelector("#btnTimNV").onclick = function () {
  var timNhanVien = document.querySelector("#searchName").value;
  var mangSapXep = [];
  for (index = 0; index < mangNhanVien.length; index++) {
    // console.log(mangNhanVien[index].loaiNhanVien);

    if (timNhanVien == mangNhanVien[index].xepLoaiNV()) {
      var nhanVIEN = mangNhanVien[index];

      mangSapXep.push(nhanVIEN);
    }
  }
  if(mangSapXep.length == 0){
    if(timNhanVien == 'Loại nhân viên'){
      renderTableNhanVien(mangNhanVien);
    }else{
      document.querySelector('#tableDanhSach').innerHTML = 'Không có '
    }
  }else{
     renderTableNhanVien(mangSapXep);
  }
 
  

};
// mangNhanVien.push(nVien);
