import dayjs from "dayjs";
import * as Yup from "yup";
import { TFunction } from "i18next";

// Возвращаем схему как функцию, в которую передаём t
export const getValidationSchema = (t: TFunction) =>
  Yup.object().shape({
    name: Yup.string().required(t("questionnairePage.errors.required")),
    birthDate: Yup.date()
      .nullable()
      .required(t("questionnairePage.errors.required"))
      .max(new Date(), t("questionnairePage.errors.futureDate"))
      .test(
        "is-allowed-age",
        t("questionnairePage.errors.ageLimit"),
        (value) => {
          if (!value) return false;
          const age = dayjs().diff(dayjs(value), "year");
          return age >= 18 && age <= 100;
        }
      )
      .typeError(t("questionnairePage.errors.invalidDate")),
    city: Yup.object({
      label: Yup.string().required(t("questionnairePage.errors.required")),
    })
      .nullable()
      .required(t("questionnairePage.errors.required")),
    gender: Yup.string().required(t("questionnairePage.errors.required")),
    about: Yup.string()
      .required(t("questionnairePage.errors.required"))
      .min(5, t("questionnairePage.errors.minAbout")),
    image: Yup.mixed<File>()
      .required(t("questionnairePage.errors.imageRequired"))
      .test("fileSize", t("questionnairePage.errors.fileSize"), (file) =>
        file ? file.size <= 10 * 1024 * 1024 : false
      )
      .test("fileType", t("questionnairePage.errors.fileType"), (file) =>
        file
          ? ["image/jpeg", "image/png", "image/webp"].includes(file.type)
          : false
      ),
  });
