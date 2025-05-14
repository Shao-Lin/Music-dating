import dayjs from "dayjs";
import * as Yup from "yup";
export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Обязательное поле"),
  birthDate: Yup.date()
    .nullable()
    .required("Обязательное поле")
    .max(new Date(), "Дата рождения не может быть в будущем")
    .test("is-allowed-age", "Возраст должен быть от 18 до 100 лет", (value) => {
      if (!value) return false;
      const age = dayjs().diff(dayjs(value), "year");
      return age >= 18 && age <= 100;
    })
    .typeError("Введите корректную дату"),
  city: Yup.object({
    label: Yup.string().required("Обязательное поле"),
  })
    .nullable()
    .required("Обязательное поле"),
  gender: Yup.string().required("Обязательное поле"),
  about: Yup.string()
    .required("Обязательное поле")
    .min(5, "Минимум 5 символов"),
  image: Yup.mixed<File>()
    .required("Фото обязательно")
    .test("fileSize", "Размер файла не должен превышать 10 МБ", (file) =>
      file ? file.size <= 10 * 1024 * 1024 : false
    )
    .test("fileType", "Неподдерживаемый формат изображения", (file) =>
      file
        ? ["image/jpeg", "image/png", "image/webp"].includes(file.type)
        : false
    ),
});
