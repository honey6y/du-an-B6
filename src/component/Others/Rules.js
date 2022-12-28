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
    oldPass: {
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
    newPass: {
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
    confirm_password: {
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
    username: {
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
    },
    phone: {
        required: {
            value: true,
            message: 'Vui lòng nhập số điện thoại'
        },
        maxLength: {
            value: 12,
            message: 'Độ dài không quá 12 ký tự'
        }
    },
    
    nationality: {
        required: {
            value: true,
            message: 'Vui lòng nhập địa chỉ của bạn'
        },
        maxLength: {
            value: 160,
            message: 'Độ dài không quá 160 ký tự'
        }
    },
    dateOfBirth: {
        required: {
            value: true,
            message: 'Hãy nhập dữ liệu'
        },
        maxLength: {
            value: new Date(),
            message: 'Dữ liệu không đúng định dạng'
        }
    },
    avatar: {
        required: {
            value: true,
            message: 'Hãy nhập dữ liệu'
        },
        maxLength: {
            value: 1000,
            message: 'Dữ liệu không đúng định dạng'
        }
    }
}
