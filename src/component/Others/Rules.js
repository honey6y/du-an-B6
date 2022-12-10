export const rules = {
    email: {
        required:{
          value: true,
          message: 'Vui lòng nhập email'
        },
        pattern: {
          value: /^\S+@\S+\.\S+$/,
          message: 'Email không đúng định dạng'
        },
        maxLength: {
            value: 160,
            message: 'Độ dài từ 5 - 160 ký tự'
        },
        minLength: {
            value: 5,
            message: 'Độ dài từ 5 - 160 ký tự'
        },
        thongbao: {
            message: 'aaaaaa'
        }
    },
    password: {
        required:{
            value: true,
            message: 'Password không được để trống'
        },
        maxLength: {
            value: 160,
            message: 'Độ dài từ 5 - 160 ký tự'
        },
        minLength: {
            value: 5,
            message: 'Độ dài từ 5 - 160 ký tự'
        }
    },
    name: {
        required:{
            value: true,
            message: 'Tên không được để trống'
        },
        minLength: {
            value: 2,
            message: 'Độ dài từ 2 ký tự trở lên'
        }
    },
    lastname: {
        required:{
            value: true,
            message: 'Họ không được để trống'
        },
    }
}
