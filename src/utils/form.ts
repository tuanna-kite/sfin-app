import { date, number, object, string } from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const signUpSchema = object({
  phone: string()
    // .length(10, "Số điện thoại không đúng")
    .matches(phoneRegExp, "Số điện thoại không đúng")
    .required(),
  password: string().min(8, "Mật khẩu phải tối thiểu 8 ký tự").required(),
  passwordRetyped: string()
    .min(8, "Mật khẩu phải tối thiểu 8 ký tự")
    .required(),
});

export const fillProfileSchema = object({
  userName: string().required("Bạn phải điền đầy đủ tên"),
  school: string().required("Bạn phải nhập trường"),
  birthday: date().required("Ngày sinh không hợp lệ"),
  gender: number(),
});

export const changePasswordSchema = object({
  currentPassword: string().min(8, "Mật khẩu phải tối thiểu 8 ký tự").required(),
  newPassword: string().min(8, "Mật khẩu phải tối thiểu 8 ký tự").required(),
  retypedPassword: string().min(8, "Mật khẩu phải tối thiểu 8 ký tự").required(),
});

export const loanRequestSchema = object({
  purpose : string().required("Bạn phải điền mục đích vay"),
  fullName : string().required("Bạn phải điền đầy tên"),
  momoAccount: string().min(8, "Số điện thoại không hợp lệ").required("Bạn phải điền số điện thoại tài khoản Momo")
})

export function onInputChange<FieldType>(
  field: keyof FieldType,
  setDataForm: any,
  dataForm: FieldType
) {
  return function (value: any) {
    setDataForm({
      ...dataForm,
      [field]: value,
    });
  };
}
